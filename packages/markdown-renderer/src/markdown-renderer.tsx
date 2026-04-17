import React from "react"
import ReactMarkdown from "react-markdown"

import type { Components } from "react-markdown"

const MarkdownRenderer = ({ markdown }: { markdown: string }) => {
  return <ReactMarkdown components={BASE_COMPONENTS}>{markdown}</ReactMarkdown>
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

  a: ({ ...props }) => (
    <a
      className="text-primary underline underline-offset-2"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),

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
}
