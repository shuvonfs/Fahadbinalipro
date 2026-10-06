#!/bin/bash
echo "===== Fahad Video Studio : one-time setup ====="
if ! command -v node >/dev/null; then echo "Node.js is missing. Opening download page - install it, then run this file again."; open https://nodejs.org/; exit 0; fi
if ! command -v git >/dev/null; then echo "Git is missing - a system popup will offer to install it. Then run this file again."; xcode-select --install; exit 0; fi
npm install -g @anthropic-ai/claude-code || sudo npm install -g @anthropic-ai/claude-code
[ -d "$HOME/Fahadbinalipro" ] || git clone https://github.com/shuvonfs/Fahadbinalipro.git "$HOME/Fahadbinalipro"
cd "$HOME/Fahadbinalipro" && git checkout claude/upbeat-einstein-2xyjvo && git pull
cd remotion && npm install
echo "===== DONE! Now double-click 2-START-CLAUDE-MAC.command ====="
