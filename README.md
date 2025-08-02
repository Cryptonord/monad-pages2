# 🌐 Monad Pages

A decentralized web platform built on the Monad blockchain that allows users to deploy and host static websites entirely on-chain. Create, share, and monetize your web content with integrated tip functionality.

## ✨ Features

- **📝 On-Chain Website Deployment**: Store complete websites directly on the blockchain
- **💰 Integrated Tip Jar**: Monetize your content with built-in tipping functionality
- **🔗 Permanent Hosting**: Your content is permanently stored and accessible
- **🎨 Easy Creation**: Simple interface for creating and managing your pages
- **🌟 Discovery**: Browse and discover pages created by the community
- **🔒 Ownership**: True ownership of your content through smart contracts

## 🏗️ Architecture

This project is built using **Scaffold-ETH 2**, a modern Ethereum development stack:

- **Frontend**: Next.js 14 with TypeScript
- **Smart Contracts**: Solidity with Hardhat
- **Blockchain**: Optimized for Monad Network
- **Styling**: Tailwind CSS
- **Web3 Integration**: Wagmi & Viem
- **Development**: Full TypeScript support with hot reloading

## 🚀 Quick Start

### Prerequisites

- Node.js >= 18.17.0
- Yarn or npm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Cryptonord/monad-pages.git
   cd monad-pages/monad-pages
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **Start local blockchain**
   ```bash
   yarn chain
   ```

4. **Deploy contracts** (in a new terminal)
   ```bash
   yarn deploy
   ```

5. **Start the frontend** (in a new terminal)
   ```bash
   yarn start
   ```

Visit `http://localhost:3000` to see your app running locally!

## 📁 Project Structure

```
monad-pages/
├── packages/
│   ├── hardhat/          # Smart contracts and deployment
│   │   ├── contracts/    # Solidity contracts
│   │   ├── deploy/       # Deployment scripts
│   │   └── test/         # Contract tests
│   └── nextjs/           # Frontend application
│       ├── app/          # Next.js app directory
│       ├── components/   # React components
│       ├── hooks/        # Custom hooks
│       └── utils/        # Utility functions
├── Ethereum-tip-jar/     # Legacy tip jar implementation
└── README.md
```

## 🛠️ Development Commands

### Core Commands
- `yarn start` - Start the frontend development server
- `yarn chain` - Start local Hardhat network
- `yarn deploy` - Deploy contracts to the current network
- `yarn compile` - Compile smart contracts

### Testing & Quality
- `yarn test` - Run contract tests
- `yarn lint` - Run linting on all packages
- `yarn format` - Format code using Prettier

### Account Management
- `yarn generate` - Generate a new account
- `yarn account` - Show account information
- `yarn account:import` - Import an existing account

### Deployment
- `yarn verify` - Verify contracts on block explorer
- `yarn next:build` - Build frontend for production

## 📱 How to Use

### Creating a Page

1. **Connect Your Wallet**: Connect your Ethereum-compatible wallet
2. **Create Page**: Navigate to the "Create" section
3. **Add Content**: Write your HTML, CSS, or markdown content
4. **Deploy**: Submit the transaction to deploy your page on-chain
5. **Share**: Your page gets a unique URL for sharing

### Viewing Pages

- **Browse All Pages**: Visit the "Pages" section to see all deployed pages
- **View Individual Pages**: Each page has a unique URL based on its ID
- **Send Tips**: Support content creators by sending tips to their pages

### Managing Your Pages

- **My Pages**: View all pages you've created
- **Edit Content**: Update your page content (creates a new version)
- **View Analytics**: See how many tips your pages have received

## 🔧 Configuration

### Network Configuration

Edit `packages/nextjs/scaffold.config.ts` to configure target networks:

```typescript
const scaffoldConfig = {
  targetNetworks: [chains.monad], // Change to your preferred network
  pollingInterval: 30000,
  // ... other config
};
```

### Environment Variables

Create `.env.local` in the `packages/nextjs` directory:

```
NEXT_PUBLIC_ALCHEMY_API_KEY=your_alchemy_key
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and add tests
4. Run linting and tests: `yarn lint && yarn test`
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Scaffold-ETH 2](https://scaffoldeth.io/)
- Inspired by the vision of a decentralized web
- Thanks to the Monad blockchain team for their innovative platform

## 📞 Support

- **Documentation**: [Coming Soon]
- **Issues**: [GitHub Issues](https://github.com/Cryptonord/monad-pages/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Cryptonord/monad-pages/discussions)

---

**⚡ Built for the Monad ecosystem - Where speed meets decentralization**
