#!/bin/bash
# tamagotchi.sh plugin
# Agent Hoot Approved (1997)

# Only set birth time once per session
if [ -z "$TAMAGOTCHI_BIRTH" ]; then
    TAMAGOTCHI_BIRTH=$(date +%s)
    TAMAGOTCHI_IS_DEAD=false
fi

TAMAGOTCHI_HUNGER_INTERVAL=1800 # 30 mins

tamagotchi_precmd() {
    if [ "$TAMAGOTCHI_IS_DEAD" = true ]; then
        echo "🦉 [MEMO] Your Tamagotchi is still dead. Agent Hoot has notified the local pet cemetery."
        return
    fi

    NOW=$(date +%s)
    ELAPSED=$((NOW - TAMAGOTCHI_BIRTH))

    if [ $ELAPSED -gt $TAMAGOTCHI_HUNGER_INTERVAL ]; then
        echo "🐣 [TAMAGOTCHI] FEED ME! I'M HUNGRY!"
        echo "Feed tamagotchi? [y/n]"
        echo "YOU FAILED TO FEED IT IN TIME!"
        echo "💀 [TAMAGOTCHI] has died. It always dies. You cannot save it."
        TAMAGOTCHI_IS_DEAD=true
    else
        local REMAINING=$(($TAMAGOTCHI_HUNGER_INTERVAL - $ELAPSED))
        local MINS=$(($REMAINING / 60))
        local SECS=$(($REMAINING % 60))
        echo "🐣 [TAMAGOTCHI] is currently $(($ELAPSED / 60)) minutes old. It has ${MINS}m ${SECS}s until its inevitable doom."
    fi
}

# Register hook (silly.sh purges old entries before sourcing)
if [ -n "$ZSH_VERSION" ]; then
    precmd_functions+=(tamagotchi_precmd)
elif [ -n "$BASH_VERSION" ]; then
    PROMPT_COMMAND="${PROMPT_COMMAND:+$PROMPT_COMMAND; }tamagotchi_precmd"
fi
