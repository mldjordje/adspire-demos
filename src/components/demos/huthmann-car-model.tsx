"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Material, Mesh, Object3D } from "three";
import type { MediaAsset } from "@/lib/lead-schema";

type HuthmannCarModelProps = {
  modelPath: string;
  fallback?: MediaAsset;
  variant?: "hero" | "showcase";
  lazy?: boolean;
};

export function HuthmannCarModel({ modelPath, fallback, variant = "hero", lazy = false }: HuthmannCarModelProps) {
  const frameRef = useRef<HTMLElement | null>(null);
  const mountRef = useRef<HTMLDivElement>(null);
  const [modelStatus, setModelStatus] = useState<"checking" | "missing" | "loading" | "ready">(lazy ? "checking" : "loading");
  const [loadProgress, setLoadProgress] = useState(0);
  const [shouldLoad, setShouldLoad] = useState(!lazy);
  const canRenderModel = modelStatus === "loading" || modelStatus === "ready";

  useEffect(() => {
    if (!lazy || shouldLoad) return;
    if (typeof IntersectionObserver === "undefined") {
      setShouldLoad(true);
      return;
    }
    if (!frameRef.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      setShouldLoad(true);
      observer.disconnect();
    }, { rootMargin: "700px 0px" });
    observer.observe(frameRef.current);
    return () => {
      observer.disconnect();
    };
  }, [lazy, shouldLoad]);

  useEffect(() => {
    if (shouldLoad && modelStatus === "checking") setModelStatus("loading");
  }, [modelStatus, shouldLoad]);

  useEffect(() => {
    if (modelStatus !== "loading" || !mountRef.current) return;

    let frame = 0;
    let disposed = false;
    let pointerX = 0;
    let pointerY = 0;
    let isDragging = false;
    let dragStartX = 0;
    let dragVelocity = 0;
    let userRotation = 0;
    let autoRotation = 0;
    let hasInteracted = false;
    const host = mountRef.current;

    async function boot() {
      const THREE = await import("three");
      const { GLTFLoader } = await import("three/examples/jsm/loaders/GLTFLoader.js");
      if (disposed || !host) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(variant === "showcase" ? 31 : 30, host.clientWidth / host.clientHeight, 0.1, 100);
      const baseCamera = variant === "showcase"
        ? { x: 4.45, y: 1.3, z: 4.75 }
        : { x: 4.15, y: 1.28, z: 4.35 };
      const introCamera = variant === "hero"
        ? { x: baseCamera.x + 1.7, y: baseCamera.y + 0.55, z: baseCamera.z + 1.05 }
        : baseCamera;
      camera.position.set(introCamera.x, introCamera.y, introCamera.z);

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      renderer.setSize(host.clientWidth, host.clientHeight);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.25;
      host.appendChild(renderer.domElement);

      const ambient = new THREE.HemisphereLight(0xf3fbff, 0x050708, 2.15);
      scene.add(ambient);
      const key = new THREE.DirectionalLight(0x00a2e7, 4.2);
      key.position.set(4, 5, 3);
      scene.add(key);
      const white = new THREE.DirectionalLight(0xffffff, 2.4);
      white.position.set(-2.5, 3.2, 5);
      scene.add(white);
      const rim = new THREE.PointLight(0x005492, 5.8, 11);
      rim.position.set(-3.8, 1.8, -2.4);
      scene.add(rim);
      const scanLight = new THREE.PointLight(0x00a2e7, 0, 8);
      scanLight.position.set(0, 1.3, 2);
      scene.add(scanLight);

      const platform = new THREE.Mesh(
        new THREE.CylinderGeometry(2.5, 2.8, 0.06, 96),
        new THREE.MeshStandardMaterial({
          color: 0x101414,
          metalness: 0.7,
          roughness: 0.34,
          emissive: 0x001522,
          emissiveIntensity: 0.34,
        }),
      );
      platform.position.y = -0.58;
      scene.add(platform);

      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(2.66, 0.012, 8, 160),
        new THREE.MeshBasicMaterial({ color: 0x00a2e7, transparent: true, opacity: 0.38 }),
      );
      ring.position.y = -0.52;
      ring.rotation.x = Math.PI / 2;
      scene.add(ring);

      const grid = new THREE.GridHelper(7, 32, 0x0477b5, 0x0b1b24);
      grid.position.y = -0.61;
      scene.add(grid);

      const loader = new GLTFLoader();
      const gltf = await loader.loadAsync(modelPath, (event) => {
        if (!event.total) return;
        setLoadProgress(Math.min(98, Math.round((event.loaded / event.total) * 100)));
      });
      if (disposed) return;

      const car = gltf.scene;
      const wheels: Object3D[] = [];
      const box = new THREE.Box3().setFromObject(car);
      const size = new THREE.Vector3();
      const center = new THREE.Vector3();
      box.getSize(size);
      box.getCenter(center);
      car.position.sub(center);
      const maxAxis = Math.max(size.x, size.y, size.z);
      const finalScale = (variant === "showcase" ? 5.25 : 5.18) / maxAxis;
      car.scale.setScalar(finalScale);
      car.rotation.y = -0.58;
      car.position.x = variant === "hero" ? 0.7 : 0;
      car.position.y = -0.5;
      car.traverse((object) => {
        if ("isMesh" in object) {
          const mesh = object as Mesh;
          mesh.castShadow = false;
          mesh.receiveShadow = true;
          const material = mesh.material as Material | Material[];
          const materials = Array.isArray(material) ? material : [material];
          materials.forEach((entry) => {
            const named = entry as Material & {
              metalness?: number;
              roughness?: number;
              envMapIntensity?: number;
              emissiveIntensity?: number;
            };
            if (named.name?.includes("PAINT")) {
              named.metalness = 0.68;
              named.roughness = 0.24;
              named.envMapIntensity = 1.6;
            }
            if (named.name?.includes("CHROME") || named.name?.includes("RIM")) {
              named.metalness = 0.9;
              named.roughness = 0.18;
              named.envMapIntensity = 1.9;
            }
            if (named.name?.includes("WINDOWS")) {
              named.roughness = 0.08;
              named.envMapIntensity = 1.5;
            }
          });
          if (/RIM|TIRE|Brake_disc/i.test(object.name)) wheels.push(object.parent ?? object);
        }
      });
      scene.add(car);
      setLoadProgress(100);
      setModelStatus("ready");

      const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
      const onPointerMove = (event: PointerEvent) => {
        const rect = host.getBoundingClientRect();
        pointerX = ((event.clientX - rect.left) / rect.width - 0.5) * 0.5;
        pointerY = ((event.clientY - rect.top) / rect.height - 0.5) * 0.35;
        if (isDragging) {
          const delta = event.clientX - dragStartX;
          dragStartX = event.clientX;
          dragVelocity = delta * 0.01;
          userRotation += dragVelocity;
          hasInteracted = true;
        }
      };
      const onPointerDown = (event: PointerEvent) => {
        isDragging = true;
        dragStartX = event.clientX;
        host.setPointerCapture?.(event.pointerId);
        host.classList.add("is-dragging");
      };
      const onPointerUp = (event: PointerEvent) => {
        isDragging = false;
        host.releasePointerCapture?.(event.pointerId);
        host.classList.remove("is-dragging");
      };
      const onResize = () => {
        if (!host.clientWidth || !host.clientHeight) return;
        camera.aspect = host.clientWidth / host.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(host.clientWidth, host.clientHeight);
      };
      host.addEventListener("pointerdown", onPointerDown);
      host.addEventListener("pointermove", onPointerMove);
      host.addEventListener("pointerup", onPointerUp);
      host.addEventListener("pointercancel", onPointerUp);
      window.addEventListener("resize", onResize);

      const startedAt = performance.now();
      const render = () => {
        const elapsed = (performance.now() - startedAt) / 1000;
        const introRaw = variant === "hero" && !reduceMotion ? Math.min(1, elapsed / 2.6) : 1;
        const intro = 1 - Math.pow(1 - introRaw, 3);
        if (!reduceMotion) {
          if (!isDragging) {
            userRotation += dragVelocity;
            dragVelocity *= 0.9;
          }
          if (!hasInteracted && introRaw >= 1) autoRotation += 0.0012;
          wheels.forEach((wheel) => {
            wheel.rotation.x -= 0.04;
          });
          ring.rotation.z = elapsed * 0.42;
          platform.rotation.y = elapsed * 0.15;
          scanLight.intensity = 2.5 + Math.sin(elapsed * 2.4) * 2;
          scanLight.position.x = Math.sin(elapsed * 1.1) * 2.2;
        }
        const introRotation = variant === "hero" ? (1 - intro) * 1.05 : 0;
        const targetX = variant === "hero" ? (1 - intro) * 0.7 : 0;
        car.rotation.y = -0.58 + introRotation + userRotation + autoRotation;
        car.rotation.x += (pointerY - car.rotation.x) * 0.035;
        car.position.x += (targetX - car.position.x) * 0.07;
        camera.position.x += (introCamera.x + (baseCamera.x - introCamera.x) * intro + pointerX - camera.position.x) * 0.04;
        camera.position.y += (introCamera.y + (baseCamera.y - introCamera.y) * intro - pointerY * 0.55 - camera.position.y) * 0.035;
        camera.position.z += (introCamera.z + (baseCamera.z - introCamera.z) * intro - camera.position.z) * 0.04;
        camera.lookAt(0, 0.08, 0);
        renderer.render(scene, camera);
        frame = requestAnimationFrame(render);
      };
      render();

      return () => {
        host.removeEventListener("pointerdown", onPointerDown);
        host.removeEventListener("pointermove", onPointerMove);
        host.removeEventListener("pointerup", onPointerUp);
        host.removeEventListener("pointercancel", onPointerUp);
        window.removeEventListener("resize", onResize);
        cancelAnimationFrame(frame);
        renderer.dispose();
        renderer.domElement.remove();
        scene.traverse((object) => {
          if ("geometry" in object) (object as Mesh).geometry?.dispose?.();
          if ("material" in object) {
            const material = (object as Mesh).material as Material | Material[];
            if (Array.isArray(material)) material.forEach((entry) => entry.dispose?.());
            else material?.dispose?.();
          }
        });
      };
    }

    let cleanup: void | (() => void);
    boot().then((result) => {
      cleanup = result;
    }).catch(() => {
      if (!disposed) setModelStatus("missing");
    });

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, [canRenderModel, modelPath, variant]);

  return (
    <figure ref={(node) => { frameRef.current = node; }} className={`huth-hero-car huth-model-frame huth-model-${variant} ${canRenderModel ? "has-model" : "has-fallback"} ${modelStatus === "ready" ? "is-ready" : ""}`} data-parallax="0.05">
      <div ref={mountRef} className="huth-model-canvas" aria-hidden={!canRenderModel} />
      {!canRenderModel && fallback && (
        <Image src={fallback.src} alt={fallback.alt} fill sizes="(max-width: 900px) 94vw, 58vw" loading="eager" fetchPriority="high" unoptimized />
      )}
      {modelStatus === "loading" && (
        <div className="huth-model-loader" role="status" aria-live="polite">
          <span>3D model load</span>
          <strong>{loadProgress}%</strong>
          <i><b style={{ width: `${loadProgress}%` }} /></i>
        </div>
      )}
      {(canRenderModel || fallback) && (
        <a
          className="huth-source huth-model-credit"
          href="https://sketchfab.com/3d-models/free-bmw-m3-e30-ac3c7013434e403e8faff87948caf422"
          target="_blank"
          rel="noreferrer"
        >
          BMW M3 E30 by Martin Trafas - CC BY 4.0
        </a>
      )}
    </figure>
  );
}
