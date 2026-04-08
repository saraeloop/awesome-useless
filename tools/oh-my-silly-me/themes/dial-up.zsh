#!/bin/bash
# dial-up.zsh theme
# Agent Hoot Approved (1997)

echo "ksshhhhh...bing bing bing...CONNECTED"

if [ -n "$ZSH_VERSION" ]; then
    PROMPT='📞 [CONNECTING...] %~ $ '
    preexec() {
        sleep $((RANDOM % 3 + 1))
    }
elif [ -n "$BASH_VERSION" ]; then
    PS1='📞 [CONNECTING...] \w $ '
    # Delay before every command
    trap 'sleep $((RANDOM % 3 + 1))' DEBUG
fi
