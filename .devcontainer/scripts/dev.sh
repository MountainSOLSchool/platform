#!/bin/bash
# Start development servers and output Safari URL

echo "🚀 Starting development servers..."

# Start Firebase emulators in background
firebase emulators:start &>/tmp/firebase-emulators.log &
FIREBASE_PID=$!
echo "  Firebase emulators starting (PID: $FIREBASE_PID)"

# Wait for emulators to be ready
sleep 5

# Start Angular app in background
npx nx run enrollment-portal:serve:development &>/tmp/angular.log &
ANGULAR_PID=$!
echo "  Angular app starting (PID: $ANGULAR_PID)"

# Wait for Angular to compile
echo "  Waiting for Angular to compile..."
sleep 15

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
echo "    Firebase: tail -f /tmp/firebase-emulators.log"
echo "    Angular:  tail -f /tmp/angular.log"
echo ""
echo "  Stop all: kill $FIREBASE_PID $ANGULAR_PID"
echo "=========================================="
