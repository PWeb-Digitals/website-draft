# AGENTS.md — pwebdigitals.com

Read this whole file before touching code. It is the single source of truth for any AI agent (Claude Code, Antigravity, others) working on this site. Update it when a decision changes.

## 1. What this is
The website for **P-Web Digitals** (pwebdigitals.com), the studio of **Peace Azubuike**, based in Akure, Nigeria, selling to clients worldwide.
P-Web builds websites first, plus CRM/workflow automation, AI automation and voice agents, MVPs and AI video.
The site has one job: **turn visitors into booked calls and paid projects.**

## 2. Ground rules for agents
- **Never push to GitHub or deploy** unless Peace explicitly says so in that session.
- Local dev runs on **port 3007** (`npm run dev`). Port 3000 is reserved for other work.
- Secrets live only in `.env.local` (gitignored). Never write a key into code or chat. Never print `.env.local` values.
- Don't invent anything: no fake testimonials, fake stats, fake client names, fake dashboards with made-up people, or rewritten social captions. If real content is missing, leave a clearly marked TODO.
- **Testimonials are removed from the site** until real ones exist.
- Copy check: after writing any copy, reread it and cut anything that sounds AI-written (e.g. "architect", "autonomous engine", "sub-second", "seamless", "leverage", "unlock", "elevate", stacked adjectives, em-dash drama). Plain, specific, human.
- No tech-stack talk on the site (no Next.js, Tailwind, React). Only show tools Peace actually uses with clients.
- Never name GoHighLevel/GHL in client-facing copy; say "CRM" or "your pipeline".
- Ask before deleting files.

## 3. Brand and design
- Name: **P-Web Digitals** (hyphen kept). The "P" is Peace.
- Logo: `public/images/brand/pweb-logo-{blue,white,cyan}.png`. Accent colour = logo blue `#006ef5` (CSS variable `--red`, kept under that name from the reference build).
- Design (decided 31 Oct 2026): a close rebuild of the veloxthemes.com layout and motion, with P-Web content. Light grey `#f1f1f1` page, black/white cards, Geist, 48/40/32px headings with tight letter spacing, thin "+" corner markers, rolling button labels, header that hides on scroll down.
- Styles: `src/app/globals.css` (tokens, type, buttons), `sections.css` + `sections2.css` (homepage sections), `pages.css` (forms, popup, inner pages). No Tailwind.
- Homepage sections: `src/components/` (Hero, Struggle, How, Integration, Social, Showcase, Pricing, Bottom). Inner pages reuse `PageHero`, `FeatureGrid`, `ServicePage`, `LegalPage`.
- Videos are made with Remotion in `remotion/` (`node render.mjs [hero|how|cta]` renders into `public/videos`).
- Avoid: robot imagery, emoji, stock "AI brain" art, fake dashboards with invented numbers, cheap-freelancer vibe.
- Service pages are data-driven: edit `src/lib/serviceData.ts` (copy, platforms, features, FAQs).
- Contact details and socials: `src/lib/site.ts`.

## 4. Stack (current)
- Next.js 16 (App Router) + TypeScript + plain CSS, Lenis for smooth scroll. Port **3007**.
- Hosting: Netlify (free plan = 300 credits/month, 15 per production deploy). **Content changes must not need a deploy.**
- Booking: Cal.com embed, link `pweb-digitals/consultation`.
- Forms: every form posts to `/api/contact` with a `pathway` (contact, website-audit, template-brief, newsletter). It forwards to the n8n webhook (`LEAD_WEBHOOK_URL`) and emails a copy (Gmail app password). n8n does Kit tagging, the PageSpeed audit and Telegram alerts.
- CMS: Sanity project `n553kwl5` (Studio in `studio/`). Blog posts, portfolio projects and templates. Publishing calls `/api/revalidate-blog?secret=...`.
- Instagram: official API via `INSTAGRAM_ACCESS_TOKEN`; the homepage wall hides itself without it.
- Automations: Peace's self-hosted n8n; Telegram for approvals.
- Repo: github.com/pwebsdigitals-svg/website (main). Don't push without Peace's go-ahead.

## 5. Decisions (Oct 2026)
1. **Full front-end redesign.** Keep all functionality, rebuild the look.
2. **CMS = Sanity** (replaces Notion). Publishing in Sanity calls a revalidation webhook so only the changed pages refresh, with no Netlify deploy. Weekly automatic export of the dataset as a backup.
3. Sanity holds **all editable content**: blog posts, portfolio projects, templates, (later) testimonials, FAQs. Peace adds a project in Sanity and the site updates. No Supabase, no custom admin.
4. **Templates** = niche demo sites (e.g. `/templates/restaurant`). Visitor views the live demo, fills a brief about their business, then pays through **Paystack** for P-Web to build it for them. It's a done-for-you service, not a file download.
5. **Lead capture: free website audit** (spec in section 8).
6. Blog drafts: n8n writes a draft, sends it to Telegram, and approval publishes to Sanity.
7. Instagram grid: switch to the official Instagram API (Business/Creator account) with automatic token refresh. Remove the embed-page scraper and the hard-coded fallback captions.
8. Leads must not be saved into the blog database (current bug).
9. On hold: voice agent and website chatbot (Peace will spec these later; plan for a site-wide slot where they can mount), GitHub pushes.

## 6. Pages to keep (SEO, don't lose these URLs)
Keep every URL below. If one must move, add a 301 in `netlify.toml` AND `next.config.mjs`. Keep or improve each title/description; never ship a page without them.
`/` `/about` `/web-design` `/ai-automation` `/crm-automation` `/lead-generation` `/seo` `/mvp-development` `/ai-video` `/build` `/grow` `/partner` `/ventures` `/services` `/work` `/work/[slug]` `/pricing` `/blog` `/blog/[slug]` `/contact` `/book` `/media`
Legal: `/privacy` `/terms` `/cookies` `/refund-policy` `/security` `/accessibility` `/disclaimer`
New: `/templates` `/templates/[slug]` `/audit` (optional standalone page for the audit form).
Existing 301s (`/capabilities/*`, `/showcase`) must stay. Keep the sitemap, robots, JSON-LD and Open Graph.
`/media` now 301-redirects to `/ai-video` (28 Oct 2026).

## 7. Portfolio (real work only)
- Sidney Sanni (sidneysanni.com)
- Jennifer Vassel (jennifervassel.com)
- Bostan Abula Spot (restaurant: ordering, booking, tracking)
- The n8n/voice automation projects currently listed: keep only if they are real builds; reword without jargon.

## 8. Lead capture: free website audit
- Popup appears after ~25s on page, or at 50% scroll, or on exit intent (desktop). **Not on page load**, and on mobile it must be a small bottom sheet, not a full-screen block (Google penalises intrusive mobile popups). Show once per visitor per 7 days; never on `/book`, `/contact` or `/audit`.
- Fields: name, email, **website URL (required)**, WhatsApp (optional).
- Checkbox/link "I don't have a website yet" hides the URL field and routes to `/book` with the message "No website yet? Book a call and we'll plan one with you."
- On submit: add the contact to Kit with tag `website-audit`, fire the n8n webhook (n8n can run Google PageSpeed Insights on the URL and email the results), and notify Peace (email + Telegram). Then show "Thanks, your audit is on its way" plus an optional "Book a call to go through it" button.
- Same form also lives inline on the homepage and at `/audit`.

## 9. Performance and responsiveness
- Target: pages visible in under 1s on a mid-range phone, near-instant page-to-page navigation, Lighthouse 90+ on mobile.
- Images through `next/image`, AVIF/WebP, sized; fonts self-hosted with `display: swap`; no heavy libraries for small effects; lazy-load anything below the fold; respect `prefers-reduced-motion`.
- Test at 360, 390, 430, 768, 1024 and 1440 widths.

## 10. Open items (31 Oct 2026)
- Pricing is copied from the old live site and not final.
- Legal pages are the old drafts (`src/lib/legal.ts`); get them reviewed. Privacy doesn't yet mention the audit form, newsletter or analytics.
- No client testimonials yet: the homepage "How we work" section sits in that slot. Put real reviews there when they exist.
- `/work/[slug]` holds three older in-house case studies (`src/lib/caseStudies.ts`), labelled as in progress or prototype. Replace with real client case studies.
- Restaurant template: demo URL and Paystack payment page URL still needed (add in Sanity or the env vars).
- Instagram token refresh: long-lived tokens expire after about 60 days. Refresh with n8n and update Netlify.
- Voice agent / chatbot: on hold; mount them site-wide in `src/app/layout.tsx`.
