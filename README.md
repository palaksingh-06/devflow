# DevFlow

### SaaS Online Development Platform

DevFlow is a full-stack SaaS platform that provides a browser-based development environment where developers can **write, run, save, and share code** from a single workspace.

Built with **Next.js, TypeScript, Monaco Editor, Clerk, Convex, Docker, and a self-hosted Piston execution engine**, DevFlow combines code editing, multi-language execution, authentication, and cloud-backed snippet management into one developer-focused platform.

**Write. Run. Save. Share.**

---

## Features

### Code Editor

* VS Code-style editing experience powered by **Monaco Editor**
* Syntax highlighting
* Multi-language support
* Language selection
* Responsive developer-focused interface
* Real-time code execution results

### Multi-Language Code Execution

DevFlow integrates a **self-hosted Piston execution engine** to execute code across multiple programming language runtimes.

Supported languages currently include:

* JavaScript
* TypeScript
* Python
* C++
* Java
* C#
* Go
* Rust
* Ruby
* Swift

The execution infrastructure runs through Docker, providing isolated runtime environments for different languages.

### Authentication

DevFlow uses **Clerk** for user authentication and identity management.

Authenticated users can access features that require persistent user data, including snippet storage and sharing.

### Code Snippets

Users can save and share reusable code snippets through the Convex backend.

Each snippet contains:

* Title
* Programming language
* Source code
* User information
* Persistent cloud storage

Backend authentication checks ensure that protected snippet operations require an authenticated user.

### SaaS & Subscription Model

DevFlow is being developed as a **subscription-based SaaS platform**.

**Lemon Squeezy integration is used** for:

* Subscription management
* Payment processing
* Premium feature access
* Customer subscription status
* SaaS-based feature restrictions

This will allow DevFlow to evolve from a free coding workspace into a platform with optional premium developer features.


# Tech Stack

| Technology        | Purpose                                 |
| ----------------- | --------------------------------------- |
| **Next.js**       | Full-stack web application              |
| **React**         | Frontend UI                             |
| **TypeScript**    | Type-safe development                   |
| **Monaco Editor** | Browser-based code editor               |
| **Tailwind CSS**  | UI styling                              |
| **Clerk**         | Authentication                          |
| **Convex**        | Backend and database                    |
| **Piston**        | Code execution engine                   |
| **Docker**        | Isolated execution environments         |
| **Framer Motion** | UI animations                           |
| **Lucide React**  | Interface icons                         |
| **Lemon Squeezy** | Subscription and payment infrastructure |

# Getting Started

## Prerequisites

Make sure you have the following installed:

* Node.js
* npm
* Docker
* Git

You will also need accounts/configuration for:

* Clerk
* Convex

---

## Installation

Clone the repository:

```bash
git clone https://github.com/palaksingh-06/devflow_code_editor.git
```

Navigate to the project:

```bash
cd devflow_code_editor
```

Install dependencies:

```bash
npm install
```

---

# Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key

NEXT_PUBLIC_CONVEX_URL=your_convex_url
NEXT_PUBLIC_CONVEX_SITE_URL=your_convex_site_url

PISTON_URL=http://localhost:2000
```

Do not commit `.env.local` or any secret credentials to the repository.

---

# Running Convex

Start the Convex development environment:

```bash
npx convex dev
```

---

# Running Piston

DevFlow uses a self-hosted Piston instance for code execution.

The local Piston API is expected to run at:

```text
http://localhost:2000
```

Make sure Docker is running and the required Piston runtimes are available before executing code through DevFlow.

---

# Running the Application

Start the Next.js development server:

```bash
npm run dev
```

Open the application at:

```text
http://localhost:3000
```

# Security Considerations

DevFlow is designed with separate frontend and backend responsibilities.

* Authentication is handled through Clerk.
* Protected snippet operations verify authentication on the backend.
* Code execution is handled through the Piston service rather than directly on the application server.
* Piston runtimes are containerized using Docker.
* Sensitive environment variables are kept outside the source code.



