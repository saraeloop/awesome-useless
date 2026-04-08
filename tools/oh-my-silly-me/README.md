# oh-my-silly-me

> Your terminal, but worse.

oh-my-silly-me is a delightful, open source, community-driven framework for managing your silly shell configuration.

Sounds boring. Try it anyway.

## Prerequisites

- zsh (or bash, we don't care)
- A computer (recommended)
- Low expectations (required)
- Agent Hoot's approval (pending since 1997)

## Installation

### Via curl (recommended, probably...)

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/saraeloop/awesome-useless/main/tools/oh-my-silly-me/install.sh)"
```

### Manual

Don't. Just don't.
Agent Hoot didn't write 47 lines of install script for you to do it manually.

But if you must:

```bash
git clone https://github.com/saraeloop/awesome-useless.git
cp awesome-useless/tools/oh-my-silly-me/.silly ~/.silly
# Edit ~/.silly to set SILLY_DIR to the full path
source ~/.silly
```

## Usage

### 1. Configuration

Edit your `~/.silly` file to customize your descent into madness:

- Change `SILLY_THEME` to `agent-hoot`, `Devcities`, or `dial-up`.
- Add or remove `SILLY_PLUGINS` (e.g., `tamagotchi`, `enya`, `dialup`, `spells`, `overcomplicate`).

### 2. Casting Spells

If you have the `spells` plugin enabled, use the arcane power of O.W.L.S. directly:

- `cast`: List all available AI incantations.
- `cast <spell-name>`: Display the full prompt for copying into your favorite AI.

### 3. Agent Hoot Memos

Every time you open your terminal, Agent Hoot will deliver a [CLASSIFIED] memorandum. Please read them. He is watching.

### 4. Enterprise Architecture

With the `overcomplicate` plugin enabled, O.W.L.S. will periodically (10% chance) provide a \$2.4M enterprise roadmap for your simple shell commands. This is a mandatory efficiency measure.

## Themes

| Theme      | Vibe       | Agent Hoot Rating          |
| ---------- | ---------- | -------------------------- |
| agent-hoot | classified | 🦉🦉🦉🦉🦉                 |
| Devcities  | phat       | 🦉🦉🦉                     |
| dial-up    | nostalgic  | 🦉 (he's still connecting) |

### Add Your Own Theme

Create a file in `themes/your-theme.zsh`:

```bash
# themes/my-theme.zsh
# Set the prompt (works in zsh and bash)
if [ -n "$ZSH_VERSION" ]; then
    PROMPT='YOUR PROMPT HERE %~ $ '
else
    PS1='YOUR PROMPT HERE \w $ '
fi

# Optional: add a hook that runs before each command
preexec() { echo "something silly"; }
```

Then set it in `~/.silly`:

```bash
export SILLY_THEME="my-theme"
```

## Plugins

| Plugin         | What it does   | What it actually does                  |
| -------------- | -------------- | -------------------------------------- |
| tamagotchi     | virtual pet    | dies in 30 minutes. always dies.       |
| enya           | error handling | replaces errors with Enya lyrics       |
| dialup         | authenticity   | adds 3-8 second delay to every command |
| blink          | accessibility  | claims to blink. does not blink.       |
| spells         | AI grimoire    | `cast` command for AI prompt templates |
| overcomplicate | enterprise     | 10% chance of a $2.75M roadmap         |

### Add Your Own Plugin

Create a file in `plugins/your-plugin.sh`:

```bash
# plugins/my-plugin.sh

# This runs once when the plugin loads
echo "🦉 [MY-PLUGIN] Initializing..."

# This runs before every prompt (after each command)
my_plugin_precmd() {
    echo "something useless"
}

# Register the hook (works in zsh and bash)
if [ -n "$ZSH_VERSION" ]; then
    precmd_functions+=(my_plugin_precmd)
else
    PROMPT_COMMAND="my_plugin_precmd; ${PROMPT_COMMAND}"
fi
```

Then add it to `~/.silly`:

```bash
export SILLY_PLUGINS=(tamagotchi enya my-plugin)
```

### Add Your Own Spell

Create a file in `spells/your-spell.md`:

```markdown
# 🧙 SPELL: MY SPELL

### Cast on: Claude, Gemini, ChatGPT

### Effect: Something absurd

\`\`\`
Your prompt text here
\`\`\`
```

Then use it:

```bash
cast my-spell
```

## Contributing

We accept pull requests that make things worse.
Please do not improve anything.

### What we want:

- **Themes** that make the terminal harder to use
- **Plugins** that solve problems that do not exist
- **Spells** that make AI do things it should not do

### How to submit:

1. Fork the repo
2. Add your theme/plugin/spell to the appropriate folder
3. Update this README table
4. Submit a PR. Agent Hoot will review it. Eventually.

## License

WTFPL
Agent Hoot has reviewed this license.
Agent Hoot has concerns.
Agent Hoot's concerns are classified.
