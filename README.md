# core

`core` is the central repository under the AngryOSS organization. It contains the code for our main website (built with Next.js) and our main API (powered by tRPC). At the heart of the ecosystem is AngryCoin **($ANGRY)**—learn more or trade it on PumpFun: [https://pump.fun/coin/7PYvmonM3c9M3oKceKrQVGqG6opu4H5GefiwnwErpump]

---

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Tech stack](#tech-stack)
4. [Prerequisites](#prerequisites)
5. [Getting started](#getting-started)
   - [Installation](#installation)
   - [Development](#development)
   - [Production build](#production-build)
6. [Configuration](#configuration)
7. [Project structure](#project-structure)
8. [API reference](#api-reference)
9. [Contributing](#contributing)
10. [License](#license)
11. [Contact](#contact)

---

## Introduction

`core` or `@angryoss/core` powers the AngryOSS ecosystem’s web presence. It serves two roles:

1. **Website** – a Next.js frontend where users can learn about AngryOSS, explore documentation, and find links to community tools.
2. **API** – a tRPC backend that exposes all services and data models consumed by our frontend and third-party integrations.

---

## Features

- ⚡ **Fast, SSR-enabled website** with Next.js
- 🔌 **Type-safe RPC endpoints** via tRPC
- 📦 Modular architecture supporting easy expansions
- 🔒 Built-in input validation and error handling
- 📈 Ready for analytics and monitoring hooks

---

## Tech stack

- **Next.js** – React framework for server-side rendering and static exports
- **tRPC** – end-to-end typesafe remote procedure calls
- **TypeScript** – static typing for front- and back-end
- **Node.js** – runtime environment
- **Vercel** – deployment targets

---

## Prerequisites

- **Node.js** v24.0.1 or later
- **npm**, **yarn**, or **pnpm** we recommend using `pnpm@10.10.0`

---

## Getting started

### Installation

```bash
# clone the repo
git clone https://github.com/angryoss/core.git
cd core

# install dependencies
npm install
# or
yarn install
# or (recommended)
pnpm install
```

### Development

```bash
# start dev server (frontend + API)
pnpm dev
```

- Website: http://localhost:3000
- tRPC endpoint: http://localhost:3000/api/trpc

### Production build

```bash
pnpm run build
pnpm start
```

---

## Configuration

Create a `.env.local` or `.env` file in the root with at least:

```env
# (If you connect to a database or external services)
DATABASE_URL=postgresql://user:pass@localhost:5432/angryoss
```

Adjust as needed for staging or production environments.

---

## Project structure

```
core/
├── public/                # static assets (favicon, robots.txt)
├── src/
│   ├── pages/             # Next.js pages & API routes
│   │   ├── index.tsx      # homepage
│   │   └── api/
│   │       └── trpc/[trpc].ts  # tRPC handler
│   ├── server/
│   │   ├── trpc.ts        # tRPC init & middlewares
│   │   └── routers/       # tRPC routers (grouped by feature)
│   ├── components/        # shared React components
│   └── styles/            # global CSS / Tailwind config
├── package.json
└── README.md
```

---

## API reference

All backend routines are exposed via tRPC. By default you’ll find:

- **GET** `/api/trpc/hello` – example “hello” procedure
- **POST** `/api/trpc/<router>.<procedure>` – call any procedure with JSON payload

Use the built-in tRPC playground in dev mode at `/api/trpc` (Not yet integrated)

---

## Contributing

1. Fork the repo and create your branch:
   ```bash
   git checkout -b feature/your-feature
   ```
2. Make your changes, ensuring all new code is covered by tests.
3. Run the linter and formatter:
   ```bash
   pnpm run lint && pnpm run format
   ```
4. Commit and push to your fork.
5. Open a pull request describing your changes.

Please follow our [Code of Conduct](CODE_OF_CONDUCT.md) when interacting in this repo.

---

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

## Contact

Have questions? Reach out to **Ruzolut** at ruzolut@gmail.com or open an issue here on GitHub.
