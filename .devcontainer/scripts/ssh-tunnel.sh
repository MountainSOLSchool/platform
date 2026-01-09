#!/bin/bash
# SSH Tunnel Setup for Termius
# This script exposes SSH via ngrok for mobile access

set -e

echo "=== SSH Tunnel Setup for Termius ==="
echo ""

# Check if ngrok is installed
if ! command -v ngrok &> /dev/null; then
    echo "Installing ngrok..."
    curl -s https://ngrok-agent.s3.amazonaws.com/ngrok.asc | sudo tee /etc/apt/trusted.gpg.d/ngrok.asc >/dev/null
    echo "deb https://ngrok-agent.s3.amazonaws.com buster main" | sudo tee /etc/apt/sources.list.d/ngrok.list
    sudo apt update && sudo apt install ngrok -y
fi

# Check if ngrok is configured
if ! ngrok config check &> /dev/null; then
    echo ""
    echo "ngrok needs to be configured with your auth token."
    echo ""
    echo "1. Go to https://dashboard.ngrok.com/get-started/your-authtoken"
    echo "2. Copy your auth token"
    echo "3. Run: ngrok config add-authtoken YOUR_TOKEN"
    echo ""
    echo "Then run this script again."
    exit 1
fi

# Start SSH server if not running
if ! pgrep -x "sshd" > /dev/null; then
    echo "Starting SSH server..."
    sudo service ssh start
fi

# Get the SSH port (default 22, or 2222 for sshd feature)
SSH_PORT=22
if [ -f /etc/ssh/sshd_config ]; then
    CONFIGURED_PORT=$(grep -E "^Port " /etc/ssh/sshd_config | awk '{print $2}')
    if [ -n "$CONFIGURED_PORT" ]; then
        SSH_PORT=$CONFIGURED_PORT
    fi
fi

echo ""
echo "Starting ngrok tunnel on port $SSH_PORT..."
echo ""

# Start ngrok in background and capture output
ngrok tcp $SSH_PORT --log=stdout > /tmp/ngrok.log 2>&1 &
NGROK_PID=$!

# Wait for tunnel to establish
sleep 3

# Get the public URL
NGROK_URL=$(curl -s http://localhost:4040/api/tunnels | grep -o '"public_url":"[^"]*"' | head -1 | cut -d'"' -f4)

if [ -z "$NGROK_URL" ]; then
    echo "Failed to get ngrok URL. Check /tmp/ngrok.log for errors."
    exit 1
fi

# Parse host and port from tcp://host:port
NGROK_HOST=$(echo $NGROK_URL | sed 's|tcp://||' | cut -d':' -f1)
NGROK_PORT=$(echo $NGROK_URL | sed 's|tcp://||' | cut -d':' -f2)

echo "=========================================="
echo "  SSH Tunnel Ready!"
echo "=========================================="
echo ""
echo "  Termius Connection Settings:"
echo "  ----------------------------"
echo "  Host:     $NGROK_HOST"
echo "  Port:     $NGROK_PORT"
echo "  Username: node"
echo "  Auth:     Use SSH key or password"
echo ""
echo "  Full URL: $NGROK_URL"
echo ""
echo "  ngrok dashboard: http://localhost:4040"
echo "=========================================="
echo ""
echo "Press Ctrl+C to stop the tunnel"

# Keep script running
wait $NGROK_PID
