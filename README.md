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

---

## 🚀 Getting Started (Local Development)

### 1. Clone the repo

```bash
git clone https://github.com/rihua-tech/sumryze-saas-website.git
cd sumryze-saas-website


