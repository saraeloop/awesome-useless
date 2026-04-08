#!/bin/bash
# dialup.sh plugin
# Agent Hoot Approved (1997)

echo "ksshhhhh...bing bing bing...CONNECTED AT 28.8 KBPS"

dialup_preexec() {
    # Random delay between 3 and 8 seconds
    DELAY=$((RANDOM % 6 + 3))
    echo "🦉 [DIALUP] Connecting... ($DELAY seconds)"
    sleep $DELAY

    # 5% chance of being disconnected
    if [ $((RANDOM % 20)) -eq 0 ]; then
        echo "A relative picked up the phone. NO CARRIER."
        # Not exiting the shell because that would be too mean for testing,
        # but the prompt says "Randomly disconnects you for no reason".
        # I'll just fake a disconnect and sleep longer.
        # Actually, let's just exit. It's the "useless" way.
        sleep 2
        exit 0
    fi
}

if [ -n "$ZSH_VERSION" ]; then
    preexec_functions+=(dialup_preexec)
elif [ -n "$BASH_VERSION" ]; then
    # In bash we use trap DEBUG for preexec
    trap 'dialup_preexec' DEBUG
fi
