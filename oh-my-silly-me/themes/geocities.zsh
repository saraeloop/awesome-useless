#!/bin/bash
# geocities.zsh theme
# Best viewed in Netscape Navigator 4.0

VISITOR_COUNT=0

if [ -n "$ZSH_VERSION" ]; then
    PROMPT='~*~ AgentH00t %~ ~*~ '
    precmd() {
        VISITOR_COUNT=$((VISITOR_COUNT + 1))
        echo "!!!!! KEWL !!!!! (Visitor #$VISITOR_COUNT)"
    }
elif [ -n "$BASH_VERSION" ]; then
    PS1='~*~ AgentH00t \w ~*~ '
    PROMPT_COMMAND='VISITOR_COUNT=$((VISITOR_COUNT + 1)); echo "!!!!! KEWL !!!!! (Visitor #$VISITOR_COUNT)"'
fi
