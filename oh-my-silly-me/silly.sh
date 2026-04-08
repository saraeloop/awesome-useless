#!/bin/bash

# oh-my-silly-me core framework
# Parody of oh-my-zsh.sh
# Agent Hoot Approved (1997)

# Load config if not already loaded (for standalone runs)
if [[ -z "$SILLY_DIR" && -f "$HOME/.silly" ]]; then
    source "$HOME/.silly"
fi

# Set defaults if not set
SILLY_DIR="${SILLY_DIR:-$HOME/oh-my-silly-me}"
SILLY_THEME="${SILLY_THEME:-agent-hoot}"
SILLY_PLUGINS="${SILLY_PLUGINS:-()}"

# Load plugins
for plugin in "${SILLY_PLUGINS[@]}"; do
    plugin_path="$SILLY_DIR/plugins/$plugin.sh"
    if [ -f "$plugin_path" ]; then
        source "$plugin_path"
    fi
done

# Load theme
theme_path="$SILLY_DIR/themes/$SILLY_THEME.zsh"
if [ -f "$theme_path" ]; then
    source "$theme_path"
fi

# Random Agent Hoot Memos
HOOT_MEMOS=(
    "MEMORANDUM: We have noticed you are using a mouse. That is a security risk."
    "MEMORANDUM: The color green is now classified. Use at your own risk."
    "MEMORANDUM: Agent Hoot has reviewed your command history. He has many concerns."
    "MEMORANDUM: 1997 called. They want their shell back. Access DENIED."
    "MEMORANDUM: Please report any unauthorized use of the 'Tab' key to Agent Hoot."
    "MEMORANDUM: Everything is fine. Do not look out the window. Continue typing."
)

echo "${HOOT_MEMOS[$RANDOM % ${#HOOT_MEMOS[@]}]}"
