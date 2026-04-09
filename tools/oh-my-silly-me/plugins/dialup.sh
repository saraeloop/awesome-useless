#!/bin/bash
# dialup.sh plugin
# Agent Hoot Approved (1997)

if [ -z "$DIALUP_LOADED" ]; then
    echo "ksshhhhh...bing bing bing...CONNECTED AT 28.8 KBPS"
    DIALUP_LOADED=true
fi

dialup_preexec() {
    # Exempt cast and source commands from dialup delay
    local cmd
    if [ -n "$ZSH_VERSION" ]; then
        cmd="$1"
    else
        cmd="$BASH_COMMAND"
    fi
    case "$cmd" in
        cast*|source*) return ;;
    esac

    # Random delay between 3 and 8 seconds
    DELAY=$((RANDOM % 6 + 3))
    echo "🦉 [DIALUP] Connecting... ($DELAY seconds)"
    sleep $DELAY

    # 5% chance of being disconnected
    if [ $((RANDOM % 20)) -eq 0 ]; then
        echo "A relative picked up the phone. NO CARRIER."
        echo "🦉 [DIALUP] Connection lost. Reconnecting..."
        sleep 2
    fi
}

# Register hook (silly.sh purges old entries before sourcing)
if [ -n "$ZSH_VERSION" ]; then
    preexec_functions+=(dialup_preexec)
elif [ -n "$BASH_VERSION" ]; then
    trap 'dialup_preexec' DEBUG
fi
