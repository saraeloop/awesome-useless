#!/bin/bash
# oh-my-silly-me core framework
# Parody of oh-my-zsh.sh
# Agent Hoot Approved (1997)

# 1. DETECT DIRECTORY (Top Secret)
if [ -n "$ZSH_VERSION" ]; then
    CURRENT_SCRIPT="${(%):-%x}"
elif [ -n "$BASH_VERSION" ]; then
    CURRENT_SCRIPT="${BASH_SOURCE[0]}"
fi

# Resolve the absolute path of the script's directory
SILLY_DIR_DETECTED="$(cd "$(dirname "$CURRENT_SCRIPT")" && pwd)"

# Use detected dir if the current SILLY_DIR is invalid or unset
if [[ -z "$SILLY_DIR" || ! -d "$SILLY_DIR/plugins" ]]; then
    export SILLY_DIR="$SILLY_DIR_DETECTED"
fi

# 2. LOAD CONFIG (Optional)
if [ -f "$HOME/.silly" ]; then
    source "$HOME/.silly"
fi

# 3. INITIALIZE PLUGINS (Classified)
# Ensure SILLY_PLUGINS is an array with valid defaults
if [[ -z "$SILLY_PLUGINS" || "${#SILLY_PLUGINS[@]}" -eq 0 || "${SILLY_PLUGINS}" == "()" ]]; then
    export SILLY_PLUGINS=(tamagotchi enya dialup spells overcomplicate)
fi

# 4. LOAD PLUGINS
for plugin in "${SILLY_PLUGINS[@]}"; do
    # Skip empty or literal "()" entries
    if [[ -z "$plugin" || "$plugin" == "()" ]]; then continue; fi
    
    plugin_path="$SILLY_DIR/plugins/$plugin.sh"
    if [ -f "$plugin_path" ]; then
        source "$plugin_path"
    else
        echo "🦉 [MEMO] Plugin $plugin not found at $plugin_path"
    fi
done

# 5. LOAD THEME
SILLY_THEME="${SILLY_THEME:-agent-hoot}"
theme_path="$SILLY_DIR/themes/$SILLY_THEME.zsh"
if [ -f "$theme_path" ]; then
    source "$theme_path"
fi

# 6. AGENT HOOT GREETING
HOOT_MEMOS=(
    "MEMORANDUM: We have noticed you are using a mouse. That is a security risk."
    "MEMORANDUM: The color green is now classified. Use at your own risk."
    "MEMORANDUM: Agent Hoot has reviewed your command history. He has many concerns."
    "MEMORANDUM: 1997 called. They want their shell back. Access DENIED."
    "MEMORANDUM: Please report any unauthorized use of the 'Tab' key to Agent Hoot."
    "MEMORANDUM: Everything is fine. Do not look out the window. Continue typing."
)

echo "${HOOT_MEMOS[$RANDOM % ${#HOOT_MEMOS[@]}]}"
