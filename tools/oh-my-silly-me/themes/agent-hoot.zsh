#!/bin/bash
# agent-hoot.zsh theme
# Agent Hoot Approved (1997)

# Prompt definition
if [ -n "$ZSH_VERSION" ]; then
    PROMPT='🦉 [CLASSIFIED] %~ $ '
    preexec() {
        echo "MEMORANDUM: $1 command executed. Agent Hoot notified."
    }
elif [ -n "$BASH_VERSION" ]; then
    PS1='🦉 [CLASSIFIED] \w $ '
    # Simple preexec simulation for Bash
    preexec_bash() {
        # Avoid showing the memo for empty commands or internal setup
        if [[ -n "$BASH_COMMAND" && "$BASH_COMMAND" != "preexec_bash" ]]; then
            echo "MEMORANDUM: $BASH_COMMAND command executed. Agent Hoot notified."
        fi
    }
    # This might be noisy in bash, but it fits the theme
    trap 'preexec_bash' DEBUG
fi
