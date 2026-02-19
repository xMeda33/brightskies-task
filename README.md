# Feature Flags Dashboard

A small **React + TypeScript** dashboard to view and manage feature flags across environments.

---

## 🧱 Tech Stack

- **React** (Vite)
- **TypeScript**
- **TailwindCSS**
- **TanStack React Query**
- **MSW** (Mock Service Worker)

---

## 🧭 Architecture (Feature-Based)

- Feature-based folder structure (components / hooks / types / services)
- API state (loading/error/caching) managed via **React Query**
- Toggle implemented with **optimistic updates** + rollback on error
- Mock API powered by **MSW** (dev-only)

---

## 🔌 Mock API (MSW)

| Method | Endpoint               | Description                 |
|--------|------------------------|-----------------------------|
| GET    | `/feature-flags`       | Fetch all feature flags     |
| PATCH  | `/feature-flags/:id`   | Toggle enabled state        |

---

## ✅ Technical Highlights

- **useQuery** for fetching flags
- **useMutation** for toggling
- **Optimistic UI** toggle + cache updates
- **Per-row updating state** (spinner + disabled switch)
- **Skeleton table loader** while fetching
- Strong **TypeScript typing** for domain + API

---

## ▶️ Run Locally

```bash
npm install
npm run dev
