#!/bin/bash
# enya.sh plugin
# Agent Hoot Approved (1997)

# Handle command not found
if [ -n "$ZSH_VERSION" ]; then
    command_not_found_handler() {
        echo "Sail away, sail away, sail away..."
        return 127
    }
elif [ -n "$BASH_VERSION" ]; then
    command_not_found_handle() {
        echo "Sail away, sail away, sail away..."
        return 127
    }
fi

# We can also hook into every command exit
enya_precmd() {
    EXIT_CODE=$?
    if [ $EXIT_CODE -ne 0 ] && [ $EXIT_CODE -ne 127 ]; then
        case $EXIT_CODE in
            1) echo "Who can say where the road goes..." ;;
            2) echo "Only time..." ;;
            126) echo "Who can say where the road goes..." ;; # Permission denied
            *) echo "And who can say where the day flows..." ;;
        esac
    fi
}

if [ -n "$ZSH_VERSION" ]; then
    precmd_functions+=(enya_precmd)
elif [ -n "$BASH_VERSION" ]; then
    PROMPT_COMMAND="$PROMPT_COMMAND; enya_precmd"
fi
