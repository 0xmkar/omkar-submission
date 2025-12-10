# TokenFactory Smart Contract API Integration

## Overview

This project implements a RESTful API that integrates with the `TokenFactory.sol` smart contract deployed on Ethereum Sepolia testnet. The API provides endpoints to fetch various information from the smart contract, with all results displayed in the console for verification.

## Task Requirements

- ✅ Create a new API endpoint named `[Your Name]apitest` (implemented as `/api/omkar`)
- ✅ Fetch information from `TokenFactory.sol` smart contract
- ✅ Display results in console (no frontend required)
- ✅ Deploy contract on Ethereum Sepolia testnet

---

## 1. Smart Contract Deployment

### Contract Details

- **Contract Name**: `TokenFactory.sol`
- **Network**: Ethereum Sepolia Testnet
- **Chain ID**: 11155111
- **Contract Address**: `0x3585FFdcFa248c89322Ba347e4f3e85aD3aB8Fe9`
- **Deployment Tool**: Foundry (Forge)

### Deployment Command

```bash
forge script script/Deploy.s.sol:DeployScript \
  --rpc-url sepolia \
  --broadcast \
  --verify \
  -vvvv
```

### Deployment Results

```
[⠊] Compiling...
[⠘] Compiling 2 files with Solc 0.8.30
[⠃] Solc 0.8.30 finished in 737.24ms
Compiler run successful!

Traces:
  [4002370] DeployScript::run()
    ├─ [0] VM::envUint("PRIVATE_KEY") [staticcall]
    │   └─ ← [Return] <env var value>
    ├─ [0] VM::startBroadcast(<pk>)
    │   └─ ← [Return]
    ├─ [3956902] → new TokenFactory@0x3585FFdcFa248c89322Ba347e4f3e85aD3aB8Fe9
    │   └─ ← [Return] 19762 bytes of code
    ├─ [0] console::log("TokenFactory deployed at:", TokenFactory: [0x3585FFdcFa248c89322Ba347e4f3e85aD3aB8Fe9]) [staticcall]
    │   └─ ← [Stop]
    ├─ [0] VM::stopBroadcast()
    │   └─ ← [Return]
    └─ ← [Stop]

Script ran successfully.

== Logs ==
  TokenFactory deployed at: 0x3585FFdcFa248c89322Ba347e4f3e85aD3aB8Fe9
```

### Deployment Transaction

- **Transaction Hash**: `0xdb8c1b6dc213dacc192cc185a9631f317604813b7670217078566463c2e72537`
- **Block Number**: 9809761
- **Gas Used**: 4,309,420
- **Gas Price**: 0.001026315 gwei
- **Total Cost**: 0.0000044228223873 ETH

---

## 2. API Implementation

### API Endpoint Structure

The API is implemented at `/api/omkar` with the following endpoints:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/omkar/contract-info` | GET | Get basic contract information (address, network, RPC URL) |
| `/api/omkar/decimal` | GET | Get the current decimal value from the contract |
| `/api/omkar/token-list` | GET | Get list of all tokens created by the factory |
| `/api/omkar/all-info` | GET | Get all contract information in a single call |

### Technology Stack

- **Backend Framework**: Express.js
- **Blockchain Library**: ethers.js v6
- **Network**: Ethereum Sepolia (Chain ID: 11155111)
- **RPC Provider**: `https://ethereum-sepolia.publicnode.com`

### API Implementation Details

The API implementation (`server/routes/api/omkar.js`) includes:

1. **Contract Connection**: Uses ethers.js to connect to the deployed TokenFactory contract
2. **ABI Integration**: Loads contract ABI from `server/config/TokenFactory.json`
3. **Console Logging**: All API calls log detailed information to the console
4. **Error Handling**: Comprehensive error handling with proper HTTP status codes

### Key Features

- ✅ Reads contract state variables (`decimal`, `TokenList`)
- ✅ Fetches network information dynamically
- ✅ Provides structured JSON responses
- ✅ Console output for all operations (as required)
- ✅ Error handling and validation

---

## 3. API Testing

### Test Script

A bash script (`test_api.sh`) is provided to test all API endpoints:

```bash
#!/bin/bash

# Base URL
BASE_URL="http://localhost:5025/api/omkar"

echo "Testing TokenFactory API..."
echo "=========================="

echo -e "\n1. Testing /contract-info..."
curl -s "$BASE_URL/contract-info" | jq

echo -e "\n\n2. Testing /decimal..."
curl -s "$BASE_URL/decimal" | jq

echo -e "\n\n3. Testing /token-list..."
curl -s "$BASE_URL/token-list" | jq

echo -e "\n\n4. Testing /all-info..."
curl -s "$BASE_URL/all-info" | jq

echo -e "\n\nDone!"
```

### Test Results

#### 1. Contract Info Endpoint

**Request**: `GET /api/omkar/contract-info`

**Response**:
```json
{
  "success": true,
  "data": {
    "contractAddress": "0x3585FFdcFa248c89322Ba347e4f3e85aD3aB8Fe9",
    "network": {
      "name": "sepolia",
      "chainId": "11155111"
    },
    "rpcUrl": "https://ethereum-sepolia.publicnode.com"
  }
}
```

**Console Output**:
```
=== CONTRACT INFO ===
Contract Address: 0x3585FFdcFa248c89322Ba347e4f3e85aD3aB8Fe9
Network Name: sepolia
Chain ID: 11155111
RPC URL: https://ethereum-sepolia.publicnode.com
====================
```

#### 2. Decimal Endpoint

**Request**: `GET /api/omkar/decimal`

**Response**:
```json
{
  "success": true,
  "data": {
    "decimal": "0"
  }
}
```

**Console Output**:
```
=== DECIMAL VALUE ===
Decimal: 0
=====================
```

#### 3. Token List Endpoint

**Request**: `GET /api/omkar/token-list`

**Response**:
```json
{
  "success": true,
  "data": {
    "count": 0,
    "tokens": []
  }
}
```

**Console Output**:
```
=== TOKEN LIST ===
Number of Tokens: 0
==================
```

#### 4. All Info Endpoint

**Request**: `GET /api/omkar/all-info`

**Response**:
```json
{
  "success": true,
  "data": {
    "contractInfo": {
      "contractAddress": "0x3585FFdcFa248c89322Ba347e4f3e85aD3aB8Fe9",
      "network": {
        "name": "sepolia",
        "chainId": "11155111"
      },
      "rpcUrl": "https://ethereum-sepolia.publicnode.com"
    },
    "decimal": "0",
    "tokenList": {
      "count": 0,
      "tokens": []
    }
  }
}
```

**Console Output**:
```
=== ALL CONTRACT INFORMATION ===
Contract Address: 0x3585FFdcFa248c89322Ba347e4f3e85aD3aB8Fe9
Network: sepolia
Chain ID: 11155111
Decimal: 0
Total Tokens: 0
================================
```

---

## 4. Smart Contract Functions Accessed

The API interacts with the following `TokenFactory.sol` functions:

1. **`decimal()`** - Public state variable that returns the current decimal value
2. **`getTokenList()`** - View function that returns an array of all token addresses created by the factory

### Contract State Variables

- `address[] public TokenList` - Array storing all created token addresses
- `uint8 public decimal` - Current decimal value used by the factory

---

## 5. Setup Instructions

### Prerequisites

- Node.js and npm installed
- Access to Ethereum Sepolia testnet (RPC endpoint)
- Contract ABI file (`TokenFactory.json`)

### Environment Variables

Create a `.env` file in the server directory with:

```env
TOKEN_FACTORY_ADDRESS=0x3585FFdcFa248c89322Ba347e4f3e85aD3aB8Fe9
SEPOLIA_RPC_URL=https://ethereum-sepolia.publicnode.com
```

### Running the Server

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the server:
   ```bash
   node server.js
   ```

3. The server will start on a random port (1000-5000). Check the console for the port number.

4. Test the API:
   ```bash
   ./test_api.sh
   ```

---

## 6. Summary

### Completed Tasks

✅ **Smart Contract Deployment**
- Successfully deployed `TokenFactory.sol` on Ethereum Sepolia testnet
- Contract verified and accessible at `0x3585FFdcFa248c89322Ba347e4f3e85aD3aB8Fe9`

✅ **API Implementation**
- Created RESTful API endpoints at `/api/omkar`
- Integrated ethers.js for blockchain interaction
- Implemented 4 endpoints to fetch contract information

✅ **Console Output**
- All API calls log detailed information to console
- Results are displayed in a structured, readable format

✅ **Testing**
- Created comprehensive test script
- All endpoints tested and verified working
- JSON responses validated

### API Endpoints Summary

| Endpoint | Purpose | Status |
|----------|---------|--------|
| `/api/omkar/contract-info` | Get contract address and network info | ✅ Working |
| `/api/omkar/decimal` | Get decimal value from contract | ✅ Working |
| `/api/omkar/token-list` | Get list of created tokens | ✅ Working |
| `/api/omkar/all-info` | Get all information in one call | ✅ Working |

### Contract Information

- **Network**: Ethereum Sepolia Testnet
- **Contract Address**: `0x3585FFdcFa248c89322Ba347e4f3e85aD3aB8Fe9`
- **Chain ID**: 11155111
- **Deployment Block**: 9809761
- **Transaction Hash**: `0xdb8c1b6dc213dacc192cc185a9631f317604813b7670217078566463c2e72537`

---

## Conclusion

The API successfully integrates with the `TokenFactory.sol` smart contract deployed on Ethereum Sepolia testnet. All required functionality has been implemented, tested, and verified. The API provides easy access to contract information through RESTful endpoints, with all operations logged to the console as specified in the requirements.
