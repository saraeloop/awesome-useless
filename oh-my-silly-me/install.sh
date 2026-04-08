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

echo "Copying .silly to ~/.silly..."
cp .silly ~/.silly

echo ""
echo "oh-my-silly-me is now installed. We are so sorry."
echo "Please restart your terminal or source ~/.silly to begin your descent."
echo "🦉 MEMORANDUM: Installation completed. Subject has been flagged."
