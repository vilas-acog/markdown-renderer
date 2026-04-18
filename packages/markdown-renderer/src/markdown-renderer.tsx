import ReactMarkdown from "react-markdown"

import remarkGfm from "remark-gfm"
import remarkBreaks from "remark-breaks"
import remarkMath from "remark-math"
import remarkEmoji from "remark-emoji"
import remarkSmartypants from "remark-smartypants"

import rehypeSlug from "rehype-slug"
import rehypeSanitize, { defaultSchema } from "rehype-sanitize"
// import rehypeAutolinkHeadings from 'rehype-autolink-headings';
// import rehypePrettyCode from 'rehype-pretty-code';
import rehypeKatex from "rehype-katex"
import rehypeExternalLinks from "rehype-external-links"
import "katex/dist/katex.min.css"
import rephypeHighlight from "rehype-highlight" // needs highlights for styles
import "highlight.js/styles/github.css"

import type { Components } from "react-markdown"

const MarkdownRenderer = ({ markdown }: { markdown: string }) => {
  return (
    <div>
      <ReactMarkdown
        remarkPlugins={[
          remarkGfm,
          remarkBreaks,
          remarkMath,
          remarkEmoji,
          [
            remarkSmartypants,
            {
              dashes: "oldschool", // or 'inverted'
              ellipses: true,
            },
          ],
        ]}
        rehypePlugins={[
          rehypeSlug,
          rephypeHighlight,
          // rehypeAutolinkHeadings,
          // [rehypeAutolinkHeadings, { behavior: 'wrap' }],
          // [
          // 	rehypePrettyCode,
          // // 	{
          // // 		theme: 'github-dark',
          // // 		keepBackground: false,
          // // 	},
          // ],
          [
            rehypeSanitize,
            {
              ...defaultSchema,
              attributes: {
                ...defaultSchema.attributes,
                // remark-math outputs <div className="math"> and <span className="math">
                // We must preserve these classes before rehype-katex processes them
                div: [...(defaultSchema.attributes?.div || []), "className"],
                span: [...(defaultSchema.attributes?.span || []), "className"],
              },
            },
          ],
          rehypeKatex,
          [
            rehypeExternalLinks,
            {
              target: "_blank",
              rel: ["noopener", "noreferrer"],
            },
          ],
        ]}
        components={BASE_COMPONENTS}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  )
}

export default MarkdownRenderer

// Base components for markdown renderer for html tags
const BASE_COMPONENTS: Components = {
  h1: ({ ...props }) => (
    <h1
      className="mt-6 mb-8 border-b pb-2 text-center text-4xl font-bold tracking-tight text-foreground/90"
      {...props}
    />
  ),

  h2: ({ ...props }) => (
    <h2
      className="mt-12 mb-6 border-b pb-2 text-3xl font-semibold tracking-tight text-foreground/90"
      {...props}
    />
  ),

  h3: ({ ...props }) => (
    <h3
      className="mt-8 mb-4 border-b pb-2 text-2xl font-semibold tracking-tight text-foreground/90"
      {...props}
    />
  ),

  h4: ({ ...props }) => (
    <h4
      className="mt-8 mb-3 text-[22px] font-semibold tracking-tight text-foreground/90"
      {...props}
    />
  ),

  p: ({ ...props }) => (
    // The [[li_&]:mt-0] is the secret sauce for your spacing issue
    <p className="[[li_&]:mt-0] leading-7 not-first:mt-2" {...props} />
  ),

  ul: ({ ...props }) => (
    <ul className="my-6 ml-10 list-disc [&>li]:mt-2 [*+&]:mt-0" {...props} />
  ),

  ol: ({ ...props }) => (
    <ol className="my-6 ml-10 list-decimal [&>li]:mt-2 [*+&]:mt-0" {...props} />
  ),

  li: ({ children, ...props }) => (
    <li
      className="[&>ol]:my-2 [&>ol]:ml-6 [&>p]:mt-0 [&>ul]:my-2 [&>ul]:ml-6"
      {...props}
    >
      {children}
    </li>
  ),

  a: ({ ...props }) => {
    const isExternal = props.href?.startsWith("http")
    return (
      <a
        className="text-primary underline underline-offset-2"
        target={isExternal ? "_blank" : "_self"}
        rel={isExternal ? "noopener noreferrer" : undefined}
        {...props}
      />
    )
  },

  blockquote: ({ ...props }) => (
    <blockquote className="mt-6 border-l-2 pl-6 italic" {...props} />
  ),

  hr: ({ ...props }) => <hr className="my-6" {...props} />,

  table: ({ ...props }) => (
    <div className="my-6 overflow-x-auto rounded-xl border">
      <table className="w-full text-sm" {...props} />
    </div>
  ),

  th: ({ ...props }) => (
    <th className="border-b p-2 text-left font-semibold" {...props} />
  ),

  td: ({ ...props }) => <td className="border-b p-2 align-top" {...props} />,

  // Later we can we experiment with different Rough.js styles for bold and strong
  b: ({ ...props }) => (
    <strong className="font-bold text-foreground/90" {...props} />
  ),

  strong: ({ ...props }) => (
    <strong className="font-bold text-foreground/90" {...props} />
  ),

  code: ({ className, children, ...props }: any) => {
    const match = /language-(\w+)/.exec(className || "")
    // const language = match ? match[1] : ""

    // Ignore math blocks since KaTeX handles them
    // if (language && language !== "math") {
    //   return (
    //     <ShikiCodeBlock
    //       code={String(children).replace(/\n$/, "")}
    //       language={language}
    //     />
    //   )
    // }

    return (
      <code
        className={`rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm ${className || ""}`}
        {...props}
      >
        {children}
      </code>
    )
  },
}
