#!/bin/bash
# Navigation.css Protection Script
# Run this to verify Navigation.css has proper full-width settings

echo "🔍 Checking Navigation.css for full-width compliance..."

CSS_FILE="/Users/ehsangarmsir/Desktop/winc/booking-frontend/src/components/Navigation.css"

# Check for forbidden properties
echo ""
echo "❌ Checking for FORBIDDEN properties that break full-width:"

FORBIDDEN_FOUND=false

if grep -q "max-width.*[0-9]" "$CSS_FILE"; then
    echo "  ⚠️  FOUND: max-width constraints"
    FORBIDDEN_FOUND=true
fi

if grep -q "width.*calc.*-" "$CSS_FILE"; then
    echo "  ⚠️  FOUND: calc() width constraints"
    FORBIDDEN_FOUND=true
fi

if grep -q "margin.*auto" "$CSS_FILE"; then
    echo "  ⚠️  FOUND: centering margins"
    FORBIDDEN_FOUND=true
fi

if [ "$FORBIDDEN_FOUND" = false ]; then
    echo "  ✅ No forbidden properties found"
fi

# Check for required properties
echo ""
echo "✅ Checking for REQUIRED properties:"

if grep -q "\.navigation.*{" "$CSS_FILE" && grep -A 20 "\.navigation.*{" "$CSS_FILE" | grep -q "width: 100%"; then
    echo "  ✅ .navigation has width: 100%"
else
    echo "  ❌ .navigation missing width: 100%"
fi

if grep -q "\.nav-container.*{" "$CSS_FILE" && grep -A 20 "\.nav-container.*{" "$CSS_FILE" | grep -q "width: 100%"; then
    echo "  ✅ .nav-container has width: 100%"
else
    echo "  ❌ .nav-container missing width: 100%"
fi

if grep -q "position: fixed" "$CSS_FILE"; then
    echo "  ✅ Navigation is fixed positioned"
else
    echo "  ❌ Navigation missing fixed positioning"
fi

echo ""
echo "🏁 Full-width verification complete!"
