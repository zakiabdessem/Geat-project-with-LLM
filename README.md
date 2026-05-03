# GEAT Official Website — Corporate Portal & AI Assistant (Géni)

> **Internship Project** — University of Batna 2, Faculty of Mathematics and Informatics  
> **Host Company:** GEAT — General Electric Algeria Turbines, Aïn Yagout, Batna, Algeria  
> **Period:** March 22, 2026 – April 4, 2026  
> **Authors:** Selma Makhloufi · Zakaria Abdessemed  
> **Supervisor:** Chaima Meradi

---

## Project Overview

This repository contains the full source code for GEAT's official corporate website and AI-powered recruitment assistant **Géni**. The project was designed and developed as part of a university internship engagement to address the complete absence of a modern digital presence for GEAT.

The platform covers five key modules:
- **Corporate Website** — institutional pages, news, services, and engineering showcase
- **Géni AI Chatbot** — locally-hosted LLM assistant for recruitment queries
- **HR CMS / Back-Office** — secure, code-free job posting management for HR managers
- **Newsletter System** — automated candidate outreach on new job publications
- **Online Application Module** — end-to-end candidate application with CV upload

---

## System Architecture

The system is organized into four interdependent layers:

```
┌─────────────────────────────────────────────────────────────────┐
│              PRESENTATION LAYER — FRONTEND                      │
│   Next.js 14 (React) · Tailwind CSS · shadcn/ui                 │
│   Pages: Home / About / Services / Careers / News / Contact     │
└──────────────────────────┬──────────────────────────────────────┘
                           │ REST API
┌──────────────────────────▼──────────────────────────────────────┐
│              BUSINESS LOGIC LAYER — BACKEND                     │
│   Node.js / FastAPI · JWT Auth · SendGrid/Nodemailer            │
│   Géni Chatbot Engine ← Ollama Runtime ← LLaMA 3 (local)        │
└──────────────────────────┬──────────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────────┐
│                       DATA LAYER                                │
│   PostgreSQL · Tables: job_listings / applications /            │
│   newsletter_subscribers / hr_users / chat_sessions            │
└──────────────────────────┬──────────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────────┐
│              DEPLOYMENT & INFRASTRUCTURE                        │
│   Docker · Ubuntu Server 22.04 LTS · Nginx · HTTPS/TLS · CI/CD │
└─────────────────────────────────────────────────────────────────┘
```

---

## Technology Stack

| Layer | Technology | Role |
|---|---|---|
| Frontend | Next.js 14 (React) | SSR + CSR, routing, SEO |
| Styling | Tailwind CSS + shadcn/ui | Responsive, mobile-first UI |
| Backend | Node.js / FastAPI | REST API, business logic |
| Database | PostgreSQL | Structured relational storage |
| Authentication | JWT | Secure HR CMS access |
| LLM Runtime | **Ollama** | Local open-source LLM serving |
| AI Model | **LLaMA 3 (8B)** | Self-hosted, no external API calls |
| Email | SendGrid / Nodemailer | Newsletters, confirmations |
| Containers | Docker + Docker Compose | Service isolation and deployment |
| Web Server | Nginx | Reverse proxy, HTTPS termination |
| Server OS | Ubuntu Server 22.04 LTS | Stable, long-term support |

---

## Géni — AI Chatbot Architecture

Géni is powered by a locally-hosted **LLaMA 3** model served via **Ollama**, an open-source LLM runtime. The entire inference pipeline runs on-premise inside a Docker container — no data leaves the GEAT server at any point.

```
User Message
     │
     ▼
Frontend Chat Widget (React)
     │  HTTP POST /api/chat
     ▼
FastAPI Chat Endpoint
     │  Prompt + Context
     ▼
Ollama Runtime  ──────────── LLaMA 3 (8B quantized, GGUF)
     │
     ▼
Streamed Response
     │
     ▼
User Interface
```

**Why Ollama + LLaMA 3:**
- Zero dependency on external APIs (OpenAI, Anthropic, etc.)
- Full HR data confidentiality — conversation data never leaves the server
- LLaMA 3 8B runs efficiently on standard server hardware
- Ollama provides an OpenAI-compatible REST interface, simplifying integration
- Model can be swapped (Mistral, Phi-3, Gemma) without changing application code

The model is pre-loaded with a system prompt describing GEAT's structure, available job categories, application procedures and company values. Conversation context is maintained in-session via a rolling message window.

---

## Repository Structure

```
├── src/
│   ├── pages/
│   │   ├── Index.tsx              # Homepage
│   │   ├── About.tsx              # Company overview
│   │   ├── Careers.tsx            # Job listings + Géni chatbot
│   │   └── NotFound.tsx
│   ├── components/
│   │   ├── HeroSlider.tsx         # Rotating hero banner
│   │   ├── Navbar.tsx             # Main navigation
│   │   ├── Footer.tsx             # Footer with portal links
│   │   ├── AnnouncementsSection.tsx
│   │   ├── CareersSection.tsx
│   │   ├── EngineersSection.tsx   # Meet Our Engineers
│   │   ├── WhatWeDo.tsx
│   │   ├── WhoWeAre.tsx
│   │   ├── OurValues.tsx
│   │   ├── StatsSection.tsx       # Numbers Tell Our Story
│   │   ├── PortalSection.tsx      # DMS portal links
│   │   ├── SubscribeSection.tsx   # Newsletter subscription
│   │   └── ui/                    # shadcn/ui component library
│   ├── lib/
│   │   ├── localLlama.ts          # Ollama API client (Géni integration)
│   │   └── utils.ts
│   ├── hooks/
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   └── assets/                    # Static images and brand assets
├── public/
├── playwright-fixture.ts          # E2E test setup
├── playwright.config.ts
├── vitest.config.ts
├── tailwind.config.ts
├── vite.config.ts
└── docker-compose.yml             # Multi-service orchestration
```

---

## Key Pages & Routes

| Page | URL | Description |
|---|---|---|
| Home | `/` | Hero slider, news, who we are, values, stats, engineers, newsletter |
| About | `/about` | Company history, mission, joint-venture overview |
| Products | `/products` | Gas & steam turbines, electrification, services |
| Careers | `/careers` | Live job listings, Géni chatbot, online application |
| News | `/news` | Announcements and institutional communications |
| Contact | `/contact` | Map, contact form, legal information |
| HR CMS | `/admin` | Private — JWT-authenticated back-office for HR team |

---

## HR CMS — Back-Office Features

The HR CMS is a secure admin panel accessible only to authenticated HR managers. It requires no technical knowledge and provides:

- JWT-secured login
- Rich-text job offer creation (title, department, location, contract type)
- Immediate or scheduled publishing to the Careers page
- Application dashboard with per-offer statistics
- CSV/Excel export of received applications
- Newsletter subscriber management and campaign dispatch

---

## Local Development Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run unit tests (Vitest)
npm run test

# Run E2E tests (Playwright)
npx playwright test

# Start Ollama and pull LLaMA 3 model (required for Géni)
ollama pull llama3
ollama serve

# Start all services (frontend + backend + DB + Ollama)
docker compose up --build
```

Environment variables are configured via `.env.local`. Copy `.env.example` and fill in your PostgreSQL credentials, SendGrid API key, and Ollama host URL.

---

## Non-Functional Requirements

**Security:** HTTPS/TLS enforced via Nginx, JWT authentication for admin routes, input sanitization on all forms, PDF-only file uploads (5 MB limit), rate limiting on the chat API endpoint.

**Performance:** Next.js SSR for fast initial page load, image optimization via `next/image`, Nginx gzip compression, Ollama response streaming for perceived chatbot latency reduction.

**Privacy:** The Géni chatbot runs entirely on-premise. No user conversation data is persisted after the session ends. No third-party LLM APIs are called.

**Accessibility:** WCAG 2.1 AA compliance target, semantic HTML, keyboard navigability, screen-reader-compatible ARIA labels.

---

## Authors

| Name | Group | Specialization |
|---|---|---|
| Selma Makhloufi | Group 2 | Security |
| Zakaria Abdessemed | Group 1 | Network |

**Academic Institution:** University of Batna 2 – Mostefa Ben Boulaïd, Faculty of Mathematics and Informatics, Department of Computer Science  
**Academic Year:** 2025 – 2026