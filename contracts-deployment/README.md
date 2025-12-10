# Smart Contracts Deployment

This is a Foundry setup for deploying the smart contracts.

## Contracts

- **TokenFactory.sol**: Factory contract for creating new tokens
- **Token.sol**: ERC20 token with permit functionality
- **BrigeToken.sol**: Bridge token implementation
- **EstokkTokenYam.sol**: Upgradeable marketplace contract with offer management
- **IToken.sol**: Token interface

## Setup

1. Install dependencies (Foundry should be installed):
```bash
forge install
```

2. Build the contracts:
```bash
forge build
```

3. Run tests:
```bash
forge test
```

## Deployment

1. Create a `.env` file with your private key:
```
PRIVATE_KEY=your_private_key_here
RPC_URL=your_rpc_url_here
```

2. Deploy to a network:
```bash
source .env
forge script script/Deploy.s.sol:DeployScript --rpc-url $RPC_URL --broadcast --verify
```

## Testing

Run all tests:
```bash
forge test
```

Run tests with verbose output:
```bash
forge test -vvv
```

## Dependencies

- OpenZeppelin Contracts v4.9.6
- OpenZeppelin Contracts Upgradeable v4.9.6
- Forge Standard Library

## Project Structure

```
contracts-deployment/
├── src/               # Smart contract source files
│   ├── interface/     # Interface definitions
│   └── *.sol         # Contract files
├── script/           # Deployment scripts
├── test/             # Test files
├── lib/              # Dependencies
└── foundry.toml      # Foundry configuration
```
