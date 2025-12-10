const express = require('express');
const router = express.Router();
const { ethers } = require('ethers');
require('dotenv').config();

// Load TokenFactory ABI
const TokenFactoryABI = require('../../config/TokenFactory.json');

// Contract address and RPC URL from environment variables
const TOKEN_FACTORY_ADDRESS = process.env.TOKEN_FACTORY_ADDRESS || '0x3585FFdcFa248c89322Ba347e4f3e85aD3aB8Fe9';
const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL || 'https://rpc.sepolia.org';

// Initialize provider and contract
const provider = new ethers.JsonRpcProvider(SEPOLIA_RPC_URL);
const tokenFactoryContract = new ethers.Contract(
  TOKEN_FACTORY_ADDRESS,
  TokenFactoryABI,
  provider
);

// @route    GET api/omkar/contract-info
// @desc     Get basic contract information
// @access   Public
router.get('/contract-info', async (req, res) => {
  try {
    const network = await provider.getNetwork();

    const contractInfo = {
      contractAddress: TOKEN_FACTORY_ADDRESS,
      network: {
        name: network.name,
        chainId: network.chainId.toString()
      },
      rpcUrl: SEPOLIA_RPC_URL
    };

    console.log('=== CONTRACT INFO ===');
    console.log('Contract Address:', contractInfo.contractAddress);
    console.log('Network Name:', contractInfo.network.name);
    console.log('Chain ID:', contractInfo.network.chainId);
    console.log('RPC URL:', contractInfo.rpcUrl);
    console.log('====================\n');

    res.json({
      success: true,
      data: contractInfo
    });
  } catch (error) {
    console.error('Error fetching contract info:', error.message);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// @route    GET api/omkar/decimal
// @desc     Get the current decimal value from the contract
// @access   Public
router.get('/decimal', async (req, res) => {
  try {
    const decimal = await tokenFactoryContract.decimal();

    console.log('=== DECIMAL VALUE ===');
    console.log('Decimal:', decimal.toString());
    console.log('=====================\n');

    res.json({
      success: true,
      data: {
        decimal: decimal.toString()
      }
    });
  } catch (error) {
    console.error('Error fetching decimal:', error.message);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// @route    GET api/omkar/token-list
// @desc     Get list of all tokens created by the factory
// @access   Public
router.get('/token-list', async (req, res) => {
  try {
    const tokenList = await tokenFactoryContract.getTokenList();

    console.log('=== TOKEN LIST ===');
    console.log('Number of Tokens:', tokenList.length);
    tokenList.forEach((tokenAddress, index) => {
      console.log(`Token ${index + 1}:`, tokenAddress);
    });
    console.log('==================\n');

    res.json({
      success: true,
      data: {
        count: tokenList.length,
        tokens: tokenList
      }
    });
  } catch (error) {
    console.error('Error fetching token list:', error.message);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// @route    GET api/omkar/all-info
// @desc     Get all information in one call
// @access   Public
router.get('/all-info', async (req, res) => {
  try {
    const network = await provider.getNetwork();
    const decimal = await tokenFactoryContract.decimal();
    const tokenList = await tokenFactoryContract.getTokenList();

    const allInfo = {
      contractInfo: {
        contractAddress: TOKEN_FACTORY_ADDRESS,
        network: {
          name: network.name,
          chainId: network.chainId.toString()
        },
        rpcUrl: SEPOLIA_RPC_URL
      },
      decimal: decimal.toString(),
      tokenList: {
        count: tokenList.length,
        tokens: tokenList
      }
    };

    console.log('=== ALL CONTRACT INFORMATION ===');
    console.log('Contract Address:', allInfo.contractInfo.contractAddress);
    console.log('Network:', allInfo.contractInfo.network.name);
    console.log('Chain ID:', allInfo.contractInfo.network.chainId);
    console.log('Decimal:', allInfo.decimal);
    console.log('Total Tokens:', allInfo.tokenList.count);
    allInfo.tokenList.tokens.forEach((tokenAddress, index) => {
      console.log(`  Token ${index + 1}:`, tokenAddress);
    });
    console.log('================================\n');

    res.json({
      success: true,
      data: allInfo
    });
  } catch (error) {
    console.error('Error fetching all info:', error.message);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;
