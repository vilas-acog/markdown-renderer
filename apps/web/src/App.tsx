import { Button } from "@workspace/ui/components/button"
import MarkdownRenderer from "@workspace/markdown-renderer"
import "@workspace/markdown-renderer/styles.css"

const SAMPLE_MARKDOWN = `
# Markdown Renderer Capabilities

This is a comprehensive test of the \`MarkdownRenderer\` component. 

---

## 1. GitHub Flavored Markdown (remark-gfm)

### Tables
| Feature | Status | Plugins involved |
| :--- | :---: | :--- |
| **Tables** | ✅ | \`remark-gfm\` |
| **Task Lists** | ✅ | \`remark-gfm\` |
| **Strikethrough**| ✅ | \`remark-gfm\` |

### Task Lists
- [x] Implement React Markdown
- [x] Configure Tailwind CSS
- [ ] Fix all bugs

### Strikethrough
You can ~strike through~ text easily!

---

## 2. Math & KaTeX (remark-math & rehype-katex)

Inline math looks like this $E = mc^2$, and here is a block equation:

$$
\\frac{1}{\\Bigl(\\sqrt{\\phi \\sqrt{5}}-\\phi\\Bigr) e^{\\frac25 \\pi}} =
1+\\frac{e^{-2\\pi}} {1+\\frac{e^{-4\\pi}} {1+\\frac{e^{-6\\pi}}
{1+\\frac{e^{-8\\pi}} {1+\\ldots} } } }
$$

---

Lift($$L$$) can be determined by Lift Coefficient ($$C_L$$) like the following
equation.

$$
L = \\frac{1}{2} \\rho v^2 S C_L
$$

---


## 3. Typography & Emoji (remark-smartypants & remark-emoji)

"Smart quotes" are automatically generated. Dashes like -- and --- become en and em dashes. And an ellipsis... is converted too.
Plus emojis! :rocket: :tada: :fire:

---

## 4. Code Blocks

\`\`\`typescript
// src/example.ts
export function calculateAnswer(): number {
  return 42;
}
\`\`\`

---

## 5. Security & Links (rehype-sanitize & rehype-external-links)

<script>alert("XSS")</script>

[Internal link](#) | [External link (Google)](https://google.com)

The external link should open in a new tab (\`target="_blank"\`) safely!
`

export function App() {
  return (
    <div className="flex min-h-svh p-6">
      <div className="mx-auto flex w-full max-w-4xl min-w-0 flex-col gap-4 text-sm leading-loose">
        <div>
          <h1 className="font-medium">Project ready!</h1>
          <p>You may now add components and start building.</p>
          <p>We&apos;ve already added the button component for you.</p>
          <Button className="mt-2">Button</Button>
        </div>

        <MarkdownRenderer markdown={SAMPLE_MARKDOWN} />
      </div>
    </div>
  )
}
