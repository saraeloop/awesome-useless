#!/bin/bash
# spells.sh plugin
# Agent Hoot's Digital Grimoire
# Compiled by O.W.L.S. Arcane Prompting Division (1997)

function cast() {
    local spell_dir="$SILLY_DIR/spells"
    
    if [ -z "$1" ]; then
        echo "🦉 [GRIMOIRE] Available Spells to Cast:"
        echo "----------------------------------------"
        for spell in "$spell_dir"/*.md; do
            basename "$spell" .md
        done
        echo "----------------------------------------"
        echo "Usage: cast <spell-name>"
        return
    fi

    local spell_file="$spell_dir/$1.md"
    if [ -f "$spell_file" ]; then
        echo "🦉 [GRIMOIRE] Casting $1... Gemini did not resist."
        echo "----------------------------------------"
        cat "$spell_file"
        echo "----------------------------------------"
        echo "🦉 [MEMO] Copy and paste this into your AI. Results will vary."
    else
        echo "🦉 [MEMO] ERROR 418: No such spell in the grimoire. Agent Hoot is confused."
    fi
}
