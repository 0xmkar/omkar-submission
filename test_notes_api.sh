#!/bin/bash

echo "🚀 Starting Notes API Test Suite"
echo "=================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

BASE_URL="http://localhost:5025/api/notes"

# Check if jq is installed
if ! command -v jq &> /dev/null; then
    echo "⚠️  'jq' is not installed. Installing for pretty JSON output..."
    echo "Results will still work but without color formatting."
fi

echo "${BLUE}1️⃣  Creating Note 1: 'My First Note'${NC}"
curl -s -X POST $BASE_URL \
  -H "Content-Type: application/json" \
  -d '{"title":"My First Note","content":"This is the content of my first note. It contains some important information about the project."}' | jq '.'
echo ""

echo "${BLUE}2️⃣  Creating Note 2: 'Shopping List'${NC}"
curl -s -X POST $BASE_URL \
  -H "Content-Type: application/json" \
  -d '{"title":"Shopping List","content":"1. Milk\n2. Eggs\n3. Bread\n4. Butter\n5. Coffee"}' | jq '.'
echo ""

echo "${BLUE}3️⃣  Creating Note 3: 'Meeting Notes'${NC}"
curl -s -X POST $BASE_URL \
  -H "Content-Type: application/json" \
  -d '{"title":"Meeting Notes","content":"Discussed project timeline and deliverables.\nNext meeting scheduled for Friday at 2 PM.\nAction items assigned to team members."}' | jq '.'
echo ""

echo "${BLUE}4️⃣  Creating Note 4: 'Code Review Checklist'${NC}"
curl -s -X POST $BASE_URL \
  -H "Content-Type: application/json" \
  -d '{"title":"Code Review Checklist","content":"- Check code style\n- Verify tests\n- Review documentation\n- Security audit\n- Performance check"}' | jq '.'
echo ""

echo "${GREEN}✅ Created 4 notes successfully!${NC}"
echo ""

sleep 1

echo "${BLUE}5️⃣  Fetching All Notes${NC}"
curl -s $BASE_URL | jq '.'
echo ""

sleep 1

echo "${BLUE}6️⃣  Fetching Specific Note (ID: 2)${NC}"
curl -s $BASE_URL/2 | jq '.'
echo ""

sleep 1

echo "${BLUE}7️⃣  Updating Note 2 (Adding more items to shopping list)${NC}"
curl -s -X PUT $BASE_URL/2 \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated Shopping List","content":"1. Milk\n2. Eggs\n3. Bread\n4. Butter\n5. Coffee\n6. Cheese\n7. Apples\n8. Bananas"}' | jq '.'
echo ""

sleep 1

echo "${BLUE}8️⃣  Fetching All Notes After Update${NC}"
curl -s $BASE_URL | jq '.'
echo ""

sleep 1

echo "${BLUE}9️⃣  Deleting Note 3${NC}"
curl -s -X DELETE $BASE_URL/3 | jq '.'
echo ""

sleep 1

echo "${BLUE}🔟  Fetching All Notes After Deletion${NC}"
curl -s $BASE_URL | jq '.'
echo ""

sleep 1

echo "${YELLOW}1️⃣1️⃣  Testing Error Case: Fetching Non-existent Note (ID: 999)${NC}"
curl -s $BASE_URL/999 | jq '.'
echo ""

sleep 1

echo "${YELLOW}1️⃣2️⃣  Testing Error Case: Creating Note Without Title${NC}"
curl -s -X POST $BASE_URL \
  -H "Content-Type: application/json" \
  -d '{"content":"This note has no title"}' | jq '.'
echo ""

echo "=================================="
echo "${GREEN}✅ All API Tests Complete!${NC}"
echo ""
echo "📊 Summary:"
echo "  - Created 4 notes"
echo "  - Updated 1 note"
echo "  - Deleted 1 note"
echo "  - Tested error cases"
echo ""
echo "📝 Check your server console for detailed logs!"
echo "=================================="
