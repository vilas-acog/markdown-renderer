## 🧠 Remark plugins (operate on Markdown → AST)

### `remark-gfm`

Adds GitHub-style Markdown features:

- Tables
- Task lists (`- [x]`)
- Strikethrough (`~~text~~`)
- Autolinks (`www.example.com`)

👉 Use it if your LLM or users write “real-world Markdown” (almost always yes).

---

### `remark-breaks`

Turns single line breaks into `<br>`
(Default Markdown needs 2 spaces or blank line)

👉 Useful for:

- Chat apps (like yours)
- LLM output where formatting is loose

---

### `remark-math`

Parses LaTeX-style math:

- Inline: `$E=mc^2$`
- Block: `$$ ... $$`

👉 Required if you're rendering math (paired with `rehype-katex`).

---

### `remark-emoji`

Converts emoji shortcodes:

- `:smile:` → 😄

👉 Nice-to-have for chat UX, not critical.

---

### `remark-smartypants`

Typographic improvements:

- `"` → “ ”
- `'` → ‘ ’
- `--` → –
- `...` → …

👉 Makes output look polished, but can be annoying if you want raw text fidelity (e.g., code-heavy content).

---

## 🔧 Rehype plugins (operate on HTML AST)

### `rehype-slug`

Adds `id` to headings:

```md
## Hello World
```

→

```html
<h2 id="hello-world">Hello World</h2>
```

👉 Needed for:

- Anchor links
- Table of contents

---

### `rehype-sanitize`

Prevents XSS by stripping unsafe HTML.

👉 Important if:

- You render **LLM output**
- You allow user input

⚠️ Be careful: it can break things like:

- KaTeX
- custom JSX
- embedded components

(You may need a custom schema)

---

### `rehype-katex`

Renders math (from `remark-math`) using **KaTeX**

👉 Turns:

```md
$$ E = mc^2 $$
```

→ styled math HTML

👉 Requires:

```ts
import 'katex/dist/katex.min.css';
```

---

### `rehype-external-links`

Adds attributes to external links:

- `target="_blank"`
- `rel="noopener noreferrer"`

👉 Good for:

- Security
- UX (don’t navigate away from app)

---

## 🧩 The ones you commented out

### `rehype-autolink-headings`

Makes headings clickable:

```html
<h2 id="hello">
  <a href="#hello">Hello</a>
</h2>
```

👉 Useful if you want copyable anchor links.

---

### `rehype-pretty-code`

Syntax highlighting for code blocks

👉 Great for:

- Dev tools
- Docs
- LLM-generated code (your case)

⚠️ Slightly heavier + needs config (themes, languages)

---

## 🧠 How this fits your LLM app

Given your context (LLM → Markdown → UI):

### Must-haves

- `remark-gfm`
- `remark-breaks`
- `rehype-sanitize` (with care)
- `rehype-external-links`

### If using math

- `remark-math`
- `rehype-katex`

### Optional (UX polish)

- `remark-emoji`
- `remark-smartypants`
- `rehype-slug`

### Likely needed for your setup

- `rehype-pretty-code` ← especially since you’re moving to **code fences**
