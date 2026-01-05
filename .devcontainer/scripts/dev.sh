#!/bin/bash
# Start development servers and output Safari URL
# Angular app → local Functions → remote Firestore/Auth

echo "🚀 Starting development servers..."

# Start Firebase Functions in background (connects to remote Firestore/Auth)
npx nx run functions:serve:development &>/tmp/functions.log &
FUNCTIONS_PID=$!
echo "  Functions starting on port 5001 (PID: $FUNCTIONS_PID)"

# Wait for functions to compile
sleep 10

# Start Angular app in background (connects to local Functions)
npx nx run enrollment-portal:serve:development &>/tmp/angular.log &
ANGULAR_PID=$!
echo "  Angular app starting on port 4200 (PID: $ANGULAR_PID)"

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
echo "  ✅ Development servers running!"
echo "=========================================="
echo ""
echo "  📱 Safari URL:"
echo "  $PORT_URL"
echo ""
echo "  Logs:"
echo "    Functions: tail -f /tmp/functions.log"
echo "    Angular:   tail -f /tmp/angular.log"
echo ""
echo "  Stop all: kill $FUNCTIONS_PID $ANGULAR_PID"
echo "=========================================="
