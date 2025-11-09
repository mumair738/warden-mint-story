
---

# AI Crypto Story 🎙️✨

**Transform your crypto transaction history into an epic, AI-narrated saga. Mint your favorite on-chain moments as unique NFTs, share your story, and compete with the community.**

AI Crypto Story converts the cold, technical data of blockchain transactions into engaging, personalized, and shareable narrative experiences. Instead of deciphering Etherscan logs, you hear a story.

> **"You just swapped 0.5 ETH for 20,000 PEPE on Uniswap — a bold move! Let’s hope those frogs can swim."**

## Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Project Structure](#-project-structure)
- [Available Scripts](#-available-scripts)
- [Environment Variables](#-environment-variables)
- [Contributing](#-contributing)
- [Deployment](#-deployment)

## ✨ Features

- **Personalized Story Feed:** Connect your wallet to see a chronological, infinitely-scrolling feed of your on-chain activities, narrated by AI.
- **AI Narration & Voice Synthesis:** Each transaction is analyzed, summarized with personality, and converted to audio using advanced AI models.
- **Customizable Narrators:** Visit the **Narrator Studio** to choose your AI's voice and narrative theme—from a sarcastic degen to a wise zen master.
- **Mint "Moments" as NFTs:** Immortalize your most memorable transactions by minting them as collectible "Story NFTs" with unique, generative artwork.
- **Community Hub:** Compete on leaderboards for "Top Trader" or "Top Collector," and vote for the community's "Story of the Week."
- **Responsive & Mobile-First:** A seamless experience whether you're on a desktop or on the go.

## 🛠️ Tech Stack

This project is built with a modern, scalable, and robust technology stack:

- **Framework:** [React](https://reactjs.org/) with [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) with a custom design system using CSS variables.
- **Component Library:** [shadcn/ui](https://ui.shadcn.com/) for accessible and composable components.
- **Blockchain Integration:**
  - [Wagmi](https://wagmi.sh/): Powerful React Hooks for Ethereum.
  - [Reown AppKit](https://reown.com/): For a seamless wallet connection experience.
- **Routing:** [React Router DOM](https://reactrouter.com/)
- **Animation:** [Framer Motion](https://www.framer.com/motion/)
- **State Management:** React Hooks & [TanStack Query](https://tanstack.com/query/latest) for async state.

## 🚀 Getting Started

Follow these instructions to set up the project locally for development and testing.

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18.x or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/pradise2-story-mint-hub.git
    cd pradise2-story-mint-hub
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project by copying the example file:
    ```sh
    cp .env.example .env
    ```
    Now, open the `.env` file and add your WalletConnect Project ID. (See [Environment Variables](#-environment-variables) for more details).

4.  **Run the development server:**
    ```sh
    npm run dev
    ```

The application should now be running at `http://localhost:8080`.

## 📂 Project Structure

The codebase is organized logically to promote scalability and maintainability.

```
└── src/
    ├── pages/          # Top-level page components (routes)
    ├── components/     # Reusable UI components, organized by feature
    │   ├── layout/     # Main app layout (Header, Sidebar, etc.)
    │   ├── story/      # Components for the Story Feed
    │   ├── moments/    # Components for the NFT Moments gallery
    │   ├── community/  # Components for the Community Hub
    │   └── ui/         # Base shadcn/ui components
    ├── types/          # TypeScript interfaces and mock data
    ├── config/         # Application configuration (e.g., wallet setup)
    ├── hooks/          # Custom React hooks
    ├── lib/            # Utility functions
    ├── App.tsx         # Main application component with routing
    └── main.tsx        # Application entry point
```

## ▶️ Available Scripts

-   `npm run dev`: Starts the development server with Hot Module Replacement.
-   `npm run build`: Bundles the app for production.
-   `npm run lint`: Lints the code using ESLint.
-   `npm run preview`: Serves the production build locally for previewing.

## 🔑 Environment Variables

To run the application, you need to provide a WalletConnect Project ID. You can obtain one for free from [WalletConnect Cloud](https://cloud.walletconnect.com/).

-   `VITE_REOWN_PROJECT_ID`: Your unique project ID from WalletConnect Cloud.

```
VITE_REOWN_PROJECT_ID=your-project-id-goes-here
```

## 🤝 Contributing

Contributions are welcome! If you have ideas for new features, bug fixes, or improvements, please feel free to:

1.  **Fork the repository.**
2.  **Create a new branch** (`git checkout -b feature/your-amazing-feature`).
3.  **Make your changes** and commit them (`git commit -m 'Add some amazing feature'`).
4.  **Push to the branch** (`git push origin feature/your-amazing-feature`).
5.  **Open a Pull Request.**

## ☁️ Deployment


