# Agent prompts

## Extract a reusable template

```text
Inspect the current project and convert it into a reusable [TEMPLATE_FAMILY]
template for a shared Vercel demo hub.

Preserve its strongest layout, responsive behavior, animations and reusable
UI patterns. Remove every trace of the original client: identity, copy,
metadata, structured data, contact details, prices, reviews, tracking IDs,
customer images and brand-specific assets.

Move all business content into one typed data structure. Replace media with
neutral slots for logo, hero, services, gallery, projects and team. Optional
sections must disappear cleanly when data is missing.

Remove production databases, authentication, analytics, email, payments,
booking and writable forms. Telephone and map links may use lead data. Forms
must remain non-submitting demo elements.

Support noindex metadata and a visible German unofficial-concept notice.
Never invent services, prices, reviews, certifications, awards or statistics.

Run repository checks, scan for remnants of the original client and report
the resulting fields, media slots, optional sections and verification results.
Do not populate a real lead.
```

## Add a lead

```text
Create a new demo route using the [TEMPLATE_FAMILY] template and the lead
brief below.

Use the brief as the only factual source. Write concise natural German copy,
but do not browse, infer or invent facts. Hide sections whose required data is
missing. Never publish fake reviews, prices, statistics, certifications or
placeholder TODO text.

Populate only the centralized lead data file; do not duplicate template
components. Keep neutral media slots when approved images are unavailable.
Enable only verified telephone and map links. Forms remain non-submitting.

Add noindex, an unpredictable slug and the visible unofficial-concept notice.
Verify mobile/desktop rendering, German copy, links, overflow, missing-data
behavior and absence of another client's identity.

Return the URL, missing-information list, sources and QA summary.

LEAD BRIEF:
[PASTE COMPLETED LEAD FORM]
```
