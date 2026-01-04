#!/bin/bash
# Codespace Initialization Script
# Automatically configures Firebase, ngrok, and SSH on container start

set -e

echo "=== Initializing Codespace ==="

# --- Firebase Setup ---
if [ -n "$FIREBASE_TOKEN" ]; then
    echo "✓ Firebase token found, configuring..."
    # Firebase CLI uses FIREBASE_TOKEN env var automatically for CI
    export FIREBASE_TOKEN="$FIREBASE_TOKEN"
    echo "  Firebase CLI will use token from environment"
else
    echo "⚠ FIREBASE_TOKEN not set - run 'firebase login:ci' locally and add to Codespaces secrets"
fi

# --- ngrok Setup ---
if [ -n "$NGROK_AUTHTOKEN" ]; then
    echo "✓ ngrok token found, configuring..."
    ngrok config add-authtoken "$NGROK_AUTHTOKEN" 2>/dev/null || true
    echo "  ngrok configured"
else
    echo "⚠ NGROK_AUTHTOKEN not set - add to Codespaces secrets for auto-config"
fi

# --- SSH Setup ---
echo "✓ Starting SSH server..."
sudo service ssh start 2>/dev/null || true

# Set password for node user if not already set (for Termius access)
if [ -n "$SSH_PASSWORD" ]; then
    echo "node:$SSH_PASSWORD" | sudo chpasswd
    echo "  SSH password configured"
fi

# Ensure password auth is enabled
if ! grep -q "^PasswordAuthentication yes" /etc/ssh/sshd_config; then
    echo "PasswordAuthentication yes" | sudo tee -a /etc/ssh/sshd_config > /dev/null
    sudo service ssh restart
fi

echo ""
echo "=== Codespace Ready ==="
echo ""
echo "Quick commands:"
echo "  Start Angular app:    npx nx run enrollment-portal:serve:development"
echo "  Start Firebase:       firebase emulators:start"
echo "  Start SSH tunnel:     ngrok tcp 2222"
echo ""
