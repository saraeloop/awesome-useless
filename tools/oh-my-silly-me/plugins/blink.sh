#!/bin/bash
# blink.sh plugin
# Agent Hoot Approved (1997)

echo "🦉 [BLINK] Initializing blink mode. Everything is now blinking."

blink_precmd() {
    # It just lies.
    echo "🦉 [BLINK] BLINKING... (current status: BLINKING)"
}

if [ -n "$ZSH_VERSION" ]; then
    precmd_functions+=(blink_precmd)
elif [ -n "$BASH_VERSION" ]; then
    PROMPT_COMMAND="$PROMPT_COMMAND; blink_precmd"
fi
