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
