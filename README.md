# 🚀 Sumryze – AI-Powered SEO Reporting Dashboard


Sumryze is a full-stack SaaS dashboard for **automated SEO reporting and AI-generated insights**.  
It’s designed for agencies, freelancers, and e-commerce brands who need **beautiful, client-ready SEO reports** without spending hours in GA4, Search Console, and spreadsheets.

> Built with Next.js App Router, TypeScript, Tailwind CSS, shadcn-style components, and OpenAI.

---

## ✨ Key Features

- **Marketing site + SaaS dashboard**
  - Public marketing pages (Home, Pricing, Features, Demo, Blog, Support, Legal)
  - Auth-protected `/dashboard` area for internal users

- **SEO & traffic analytics (via API routes)**
  - Modular API endpoints for:
    - KPIs: `/api/kpis`, `/api/seo`, `/api/web-vitals`
    - Traffic & channels: `/api/traffic`, `/api/traffic-channel`
    - Content performance: `/api/content-performance`, `/api/top-pages`, `/api/keyword-growth`
    - Weekly summaries & status: `/api/weekly-summary`, `/api/status`
  - Designed to be wired into GA4, Google Search Console, and other data sources

- **AI summaries & recommendations**
  - `/api/ai-summary` and `/api/ai-predictions` endpoints
  - Uses the **OpenAI API** to generate:
    - Natural-language summaries of SEO performance
    - High-level recommendations and opportunities

- **Client-ready UX**
  - Clean 2-column dashboard layout with navigation (Dashboard, Reports, Clients, Quick Setup, Integrations)
  - Responsive design with dark-mode support
  - Multiple status & legal pages (`/status`, `/legal/*`, `/privacy`, `/terms`, `/ccpa`) suitable for white-label SaaS

- **Authentication & security**
  - **NextAuth** with **Google OAuth** for login
  - Serverless API routes deployed on **Vercel**

---

## 🧱 Tech Stack

**Frontend & App Framework**

- [Next.js 15 (App Router)](https://nextjs.org/)
- React 19
- TypeScript
- Tailwind CSS + utility helpers (`tailwind-merge`, `class-variance-authority`)
- shadcn-style components built on **Radix UI** primitives

**Charts & UI Libraries**

- Recharts
- Chart.js + `react-chartjs-2`
- ApexCharts + `react-apexcharts`
- `@mui/material` and `@mui/icons-material`
- Headless UI, Radix UI
- `react-hot-toast`, `sonner` for notifications

**Backend & Integrations**

- Next.js API routes (serverless functions on Vercel)
- [OpenAI Node SDK](https://github.com/openai/openai-node)
- Google APIs (GA4 / GSC / PageSpeed / CrUX ready)
- NextAuth (Google OAuth provider)
- Nodemailer for email support flows

**Tooling**

- pnpm
- TypeScript
- ESLint / Next lint
- Deployed on **Vercel**


**Tooling**

- pnpm
- TypeScript
- ESLint / Next lint
- Deployed on **Vercel**

---

## 🚀 Getting Started (Local Development)

1. **Clone the repo**

```bash
git clone https://github.com/rihua-tech/sumryze-saas-website.git
cd sumryze-saas-website
```
2. **Install dependencies**

```pnpm install

```

You can also use npm or yarn, but the project is configured and tested with pnpm.

3. **Configure environment variables**
   Create a .env.local file in the project root:

 ``` touch .env.local
Add the required keys (example placeholders):

```# OpenAI
OPENAI_API_KEY=your_openai_api_key

# Google OAuth (for NextAuth)
GOOGLE_OAUTH_CLIENT_ID=your_google_oauth_client_id
GOOGLE_OAUTH_CLIENT_SECRET=your_google_oauth_client_secret

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_random_long_secret

# Google APIs (GA4 / GSC / PageSpeed / CrUX)
PAGE_SPEED_API_KEY=your_pagespeed_api_key
CRUX_API_KEY=your_crux_api_key
GSC_SCOPES=https://www.googleapis.com/auth/webmasters.readonly
GA4_SCOPES=https://www.googleapis.com/auth/analytics.readonly

# Public base URL for API calls (used on the frontend)
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
```

In production (Vercel), set the same variables under
Project → Settings → Environment Variables.

4. **Run the dev server**

   ``` pnpm dev
   ```
Then open:

Marketing site: http://localhost:3000

Dashboard: http://localhost:3000/dashboard

(You’ll be redirected through the NextAuth sign-in flow.)

5. **Production build**
   
```
pnpm build
pnpm start
```

🧭 **Project Structure (High Level)**

app/
  (marketing)/         # Landing pages, pricing, blog, support, etc.
  dashboard/           # Auth-protected SaaS dashboard (App Router)
    components/        # Header, sidebar, charts, dashboard widgets
    layout.tsx         # Dashboard shell layout
    page.tsx           # Main dashboard entry
  api/                 # Serverless API routes
    ai-summary/        # AI SEO summary endpoint (OpenAI)
    ai-predictions/    # AI prediction endpoint (OpenAI)
    kpis/              # SEO KPIs
    traffic/           # Traffic overview
    traffic-channel/   # Channel breakdown
    ...                # Other SEO and support endpoints
components/            # Shared UI components
lib/                   # Utilities (analytics helpers, API clients, config)
styles/                # Global styles & Tailwind setup
public/                # Static assets

🧪** What This Project Demonstrates**





