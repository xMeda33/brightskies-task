Feature Flags Dashboard

A React + TypeScript application for viewing and managing feature flags across environments.

Tech Stack

React (Vite)

TypeScript

TailwindCSS

TanStack React Query

MSW (Mock Service Worker)

Architecture

Feature-based folder structure

Separation of:

Components

Hooks

Types

Services

Server state handled via React Query

Optimistic updates with rollback on error

API (Mocked with MSW)
Method	Endpoint	Description
GET	/feature-flags	Fetch all feature flags
PATCH	/feature-flags/:id	Toggle enabled state
Key Technical Features

React Query for fetching and mutations

Optimistic UI updates

Per-row mutation loading state

Error handling with rollback

Skeleton table loading state

Type-safe API and domain models

Run Locally
npm install
npm run dev
