# Hebron & Noel Wedding Website

A customizable Next.js wedding homepage for May 29, 2027 in Addis Ababa, Ethiopia. Styled with a classic luxury cream, burgundy, and gold palette.

## What's included

- Single-page homepage: Save the Date, event details, RSVP, travel guide, photo gallery, FAQ.
- Responsive layouts for phones, tablets, and desktop.
- Next.js static export for the site itself.
- Cloudflare Pages Function at `/api/rsvp` for RSVP submissions.
- Cloudflare D1 schema for private RSVP storage.
- Basic validation and a honeypot field for bot filtering.

## Run locally

Requires Node.js 20+.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

The static homepage will render locally, but RSVP submissions will not persist until the Cloudflare Pages Function is deployed with a D1 binding. You can use `npx wrangler pages dev out` after building to test the Pages Function locally with Wrangler.

## Customize the wedding

Most starter content is in `app/wedding-site.tsx`. Update:
- Names, date, venue and event time.
- Travel guidance, accommodation recommendations and FAQs.
- RSVP questions and guest-count policy.
- Gallery image URLs; for your real photos, place optimized images in `public/images/` and update the CSS backgrounds or gallery component.
- Page title and description in `app/layout.tsx`.

Search for `coming soon` and `placeholder` to find remaining draft content. Confirm the venue's exact map pin and event time before sharing the site publicly.

## Deploy to Cloudflare Pages

This starter uses **Next.js static export + Cloudflare Pages Functions + D1**. That lets Pages serve the exported homepage while a Pages Function handles the RSVP API.

1. Create a GitHub repository (or use the existing `hebronmekuria/Wedding-Website`) and push this project.
2. In Cloudflare, create a D1 database named `hebron-noel-rsvps`.
3. Copy its database ID into `wrangler.toml`, replacing `REPLACE_WITH_YOUR_CLOUDFLARE_D1_DATABASE_ID`.
4. Apply the migration:

   ```bash
   npx wrangler d1 migrations apply hebron-noel-rsvps --remote
   ```

5. In Cloudflare Pages, connect the GitHub repository.
6. Build command: `npm run build`
7. Build output directory: `out`
8. Ensure `functions/api/rsvp.ts` and `wrangler.toml` are present in the project root. The Pages project must have the D1 binding named `DB` configured; verify it in Pages > Settings > Functions > D1 database bindings if it is not picked up from the Wrangler configuration.
9. Deploy and test a submission with a test name, then verify the row in D1.

Cloudflare's Pages project setup and Wrangler configuration can evolve; confirm the current dashboard flow during deployment. Do not commit credentials or guest data.

## RSVP data and privacy

The RSVP endpoint stores names, optional email addresses, attendance, guest count, dietary notes and optional messages in D1. The public homepage does not expose an endpoint for reading the guest list. Restrict database access to trusted administrators. If you want to export or manage responses, use the Cloudflare dashboard or add an authenticated admin workflow later.

Before inviting guests, consider adding rate limiting or Turnstile, a clear RSVP deadline, duplicate-response handling, and a policy for changing an earlier response. This starter provides basic input validation but is not a full anti-abuse system.

## Repository note

The supplied SSH repository URL could not be cloned in this execution environment because GitHub network/SSH access is unavailable. This folder is a ready-to-review starter; it has not been pushed to GitHub or deployed to Cloudflare yet.
