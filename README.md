# ERP Readiness Assessment

A free, self-contained self-assessment for organizations preparing an ERP (Enterprise Resource
Planning) implementation — written with small and mid-sized manufacturers in mind. Fifteen statements
across five domains produce a score per domain, an overall readiness band, and a first action for
each domain.

It is Template 01 of the openly licensed **DRM Success Framework v1.0**
(https://drmsolutions.us/resources), packaged here as a small web page you can host or adapt.

## Run it

- **Online:** https://drmsolutions.us/readiness
- **Locally:** download this repository, then in its folder run `python -m http.server 8000` and open
  http://localhost:8000. (Opening `index.html` directly from disk will not load `assessment.json`.)
- **Your own copy:** fork the repository and enable GitHub Pages on the `main` branch.

No build step, no dependencies, no tracking. Answers stay in the browser and are never sent anywhere.

## The five domains

| Domain | What it checks |
|---|---|
| Governance and sponsorship | Decision rights, scope, ownership, executive support |
| Process ownership | Current-state knowledge and ownership of future-state decisions |
| Data readiness | Data ownership, quality, migration scope, validation |
| Testing and controls | Acceptance criteria, end-to-end scenarios, compliance evidence |
| People and change readiness | User participation, training, communications, support transition |

Each statement is scored 0 (not in place) to 3 (consistently in place). Domain score =
sum ÷ 9 × 100; overall = average of the five domains. Bands: 85+ advanced readiness · 70–84
prepared with gaps · 40–69 developing readiness · below 40 foundation needed.

## Adapting it

All wording, domains, scoring scale, bands and recommendations are in `assessment.json`. Edit that
file to translate the assessment or add domains; `assessment.js` needs no change.

## Limitations

A structured discussion tool, not an audit, certification, legal opinion or compliance
determination. The bands are not benchmarked against a population of companies.

## Licence and credit

Code: MIT (see `LICENSE`). Assessment content: part of the DRM Success Framework v1.0 by Deni Ruben
Moreira, CC BY 4.0 — credit "DRM Success Framework v1.0, Deni Ruben Moreira" when you reuse it.

Issues and pull requests are welcome.
