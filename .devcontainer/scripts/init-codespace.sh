#!/bin/bash
# Codespace Initialization Script
# Automatically configures Firebase, ngrok, and SSH on container start

echo "=== Initializing Codespace ==="

# --- Firebase Setup (Service Account) ---
CREDS_FILE="$HOME/.config/firebase-service-account.json"
mkdir -p "$HOME/.config"

if [ -n "$GOOGLE_APPLICATION_CREDENTIALS_JSON" ]; then
    echo "✓ Firebase service account found, configuring..."

    # Decode base64 (strip whitespace/newlines first) and write to file
    echo "$GOOGLE_APPLICATION_CREDENTIALS_JSON" | tr -d '[:space:]' | base64 -d > "$CREDS_FILE" 2>/dev/null

    if [ -s "$CREDS_FILE" ]; then
        # Set environment variable for Firebase CLI and Admin SDK
        export GOOGLE_APPLICATION_CREDENTIALS="$CREDS_FILE"

        # Add to bashrc for future shells (only if not already there)
        if ! grep -q "GOOGLE_APPLICATION_CREDENTIALS" "$HOME/.bashrc"; then
            echo "export GOOGLE_APPLICATION_CREDENTIALS=\"$CREDS_FILE\"" >> "$HOME/.bashrc"
        fi

        echo "  Service account configured at $CREDS_FILE"
    else
        echo "  ⚠ Failed to decode service account - check base64 encoding"
        echo "  Re-encode with: base64 -i your-key.json | tr -d '\\n' | pbcopy"
    fi
elif [ -n "$FIREBASE_TOKEN" ]; then
    echo "✓ Firebase token found (legacy), configuring..."
    export FIREBASE_TOKEN="$FIREBASE_TOKEN"
    if ! grep -q "FIREBASE_TOKEN" "$HOME/.bashrc"; then
        echo "export FIREBASE_TOKEN=\"$FIREBASE_TOKEN\"" >> "$HOME/.bashrc"
    fi
    echo "  Firebase CLI will use token from environment"
else
    echo "⚠ Firebase credentials not set"
    echo "  Add GOOGLE_APPLICATION_CREDENTIALS_JSON (base64 service account) to Codespaces secrets"
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

# --- Auto-start ngrok SSH tunnel (if static address configured) ---
if [ -n "$NGROK_AUTHTOKEN" ] && [ -n "$NGROK_TCP_ADDRESS" ]; then
    echo "✓ Starting ngrok SSH tunnel with static address..."
    nohup ngrok tcp --region=us --remote-addr="$NGROK_TCP_ADDRESS" 2222 > /tmp/ngrok.log 2>&1 &
    echo "  Tunnel running at $NGROK_TCP_ADDRESS → localhost:2222"
    echo "  Logs: /tmp/ngrok.log"
fi

# --- Add dev alias ---
if ! grep -q "alias dev=" "$HOME/.bashrc"; then
    echo "alias dev='/workspaces/platform/.devcontainer/scripts/dev.sh'" >> "$HOME/.bashrc"
fi

echo ""
echo "=== Codespace Ready ==="
echo ""
if [ -n "$NGROK_TCP_ADDRESS" ]; then
    echo "SSH Access (Termius):"
    echo "  Host: $(echo $NGROK_TCP_ADDRESS | cut -d: -f1)"
    echo "  Port: $(echo $NGROK_TCP_ADDRESS | cut -d: -f2)"
    echo "  User: node"
    echo ""
fi
echo "Quick commands:"
echo "  dev                   Start servers & get Safari URL"
echo "  Start Firebase:       firebase emulators:start"
if [ -z "$NGROK_TCP_ADDRESS" ]; then
    echo "  Start SSH tunnel:     ngrok tcp 2222"
fi
echo ""
