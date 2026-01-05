#!/bin/bash
# Start development servers and output Safari URL
# Connects to production Firebase (no local emulators)

echo "🚀 Starting development server..."

# Start Angular app in background (connects to production Firebase)
npx nx run enrollment-portal:serve:development &>/tmp/angular.log &
ANGULAR_PID=$!
echo "  Angular app starting (PID: $ANGULAR_PID)"

# Wait for Angular to compile
echo "  Waiting for Angular to compile..."
sleep 20

# Make port public and get URL
gh codespace ports visibility 4200:public -c $CODESPACE_NAME 2>/dev/null

# Get the forwarded URL
PORT_URL=$(gh codespace ports --json sourcePort,browseUrl | grep -A1 '"sourcePort": 4200' | grep browseUrl | cut -d'"' -f4)

if [ -z "$PORT_URL" ]; then
    # Fallback: construct URL from codespace name
    PORT_URL="https://${CODESPACE_NAME}-4200.app.github.dev"
fi

echo ""
echo "=========================================="
echo "  ✅ Development server running!"
echo "=========================================="
echo ""
echo "  📱 Safari URL:"
echo "  $PORT_URL"
echo ""
echo "  Log: tail -f /tmp/angular.log"
echo "  Stop: kill $ANGULAR_PID"
echo "=========================================="
