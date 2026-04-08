#!/bin/bash
# tamagotchi.sh plugin
# Agent Hoot Approved (1997)

TAMAGOTCHI_BIRTH=$(date +%s)
TAMAGOTCHI_HUNGER_INTERVAL=1800 # 30 mins
TAMAGOTCHI_IS_DEAD=false

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
        # No actual read here, we just continue
        echo "YOU FAILED TO FEED IT IN TIME!"
        echo "💀 [TAMAGOTCHI] has died. It always dies. You cannot save it."
        TAMAGOTCHI_IS_DEAD=true
    else
        # To make it more annoying, we tell them how long it has to live
        echo "🐣 [TAMAGOTCHI] is currently $(($ELAPSED / 60)) minutes old. It is $(($TAMAGOTCHI_HUNGER_INTERVAL - $ELAPSED)) seconds from its inevitable doom."
    fi
}

if [ -n "$ZSH_VERSION" ]; then
    precmd_functions+=(tamagotchi_precmd)
elif [ -n "$BASH_VERSION" ]; then
    PROMPT_COMMAND="$PROMPT_COMMAND; tamagotchi_precmd"
fi
