#!/bin/bash

# oh-my-silly-me installer
# Agent Hoot Approved (1997)

set -e

echo "🦉 [CLASSIFIED] Initializing oh-my-silly-me installation..."
sleep 1

echo -n "Installing oh-my-silly-me"
for i in {1..5}; do
    echo -n "."
    sleep 0.5
done
echo " DONE (maybe)"

echo ""
echo "WARNING: This framework is designed to actively degrade your productivity."
echo "It will make your terminal significantly worse."
read -p "Are you sure you want to proceed? [y/N] " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Installation aborted. Agent Hoot is disappointed but relieved."
    exit 1
fi

SILLY_INSTALL_DIR="${HOME}/oh-my-silly-me"

if [ ! -d "$SILLY_INSTALL_DIR" ]; then
    echo "Cloning oh-my-silly-me to ${SILLY_INSTALL_DIR}..."
    git clone --depth 1 --filter=blob:none --sparse https://github.com/saraeloop/awesome-useless.git /tmp/awesome-useless-clone 2>/dev/null
    cd /tmp/awesome-useless-clone
    git sparse-checkout set tools/oh-my-silly-me 2>/dev/null
    cp -r tools/oh-my-silly-me "$SILLY_INSTALL_DIR"
    rm -rf /tmp/awesome-useless-clone
    echo "Cloned. Agent Hoot is impressed you got this far."
else
    echo "oh-my-silly-me already exists at ${SILLY_INSTALL_DIR}. Updating config..."
fi

echo "Copying .silly to ~/.silly..."
cp "${SILLY_INSTALL_DIR}/.silly" ~/.silly
sed -i.bak "s|export SILLY_DIR=.*|export SILLY_DIR=\"${SILLY_INSTALL_DIR}\"|" ~/.silly
rm -f ~/.silly.bak

echo ""
echo "oh-my-silly-me is now installed at ${SILLY_INSTALL_DIR}."
echo "We are so sorry."
echo "Please restart your terminal or run: source ~/.silly"
echo "🦉 MEMORANDUM: Installation completed. Subject has been flagged."
