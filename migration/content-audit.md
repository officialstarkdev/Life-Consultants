# Life Consultants content audit

## Scope inspected

Public pages inspected from the current WordPress site:

- `/`
- `/services/`
- `/destinations/`
- `/about/`
- `/ceos-message/`
- `/gallery/`
- `/success-stories/`
- `/certifications/`
- `/institutions-represented-by-life/`
- `/contact/`
- `/australia/`
- attempted `/usa/`, `/united-kingdom/`, `/canada/` (source timed out during crawl)
- four home-page blog/video entries

## Important inconsistencies / editorial review

1. The current 2026 page title describes **26 Years of Excellence**, while several on-page sections still say **25 Years of Excellence** / `25+ Years of Experience`.
2. Home page metrics show **10,415+ Successful Visas** and **12,500+ Happy Clients**, while the About page shows **10 K+ Visa Delivery** and **12,000+ Trusted Clients**.
3. The About page states **99% Visa Approvals** / **99% Success Rate**; these claims should be substantiated before using them in high-prominence marketing.
4. The Contact page contains placeholder text `info@example.com` in addition to the real `info@lifeconsultants.net`; the placeholder is excluded from the new website.
5. The homepage and service copy contain grammar/spelling inconsistencies such as “Your Must Trusted Partner”, mixed `counselling/counseling`, and occasional sentence fragments. Source wording is preserved in migration data where material; UI copy receives light grammar cleanup without altering claims.
6. The institution area lists universities but does not consistently explain the nature or current status of each institutional relationship. The React site therefore says “publicly listed” and does not invent partnership status.

## Media migration status

- Gallery page: 12 visible image entries.
- Certifications page: 18 visible image entries.
- Success stories page: more than 60 visible image entries.
- Team/CEO page: public photographs exist.

This environment could inspect the source URLs but could not reliably download the WordPress media binaries. To avoid hotlinking, the build uses neutral/stock presentation imagery and explicit local-media placeholders for gallery/certification/success collections. Before production, replace those placeholders with rights-cleared local copies of Life Consultants media.

## Redirects

See `migration/url-map.json`. Configure these as HTTP 301 redirects at the hosting/CDN layer before switching DNS.

## Crawl limitations

The WordPress server intermittently timed out on several individual institution-country pages. Those pages are included in the redirect plan, but their complete historical institution lists require one additional successful source crawl before declaring the migration fully exhaustive.
