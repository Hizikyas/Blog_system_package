"use client"
import { usePost } from "../hooks/usePost"
import { ReactionButtons } from "./ReactionButtons"
import { CommentSection } from "./CommentSection"
import { ReportButton } from "./ReportButton"
import { marked } from "marked"
import DOMPurify from "dompurify"
import { useEffect, useState } from "react"

interface PostProps {
  slug: string
  className?: string
}

export function Post({ slug, className = "" }: PostProps) {
  const { post, isLoading, error } = usePost(slug)
  const [parsedContent, setParsedContent] = useState<string>("")

  useEffect(() => {
    if (post?.content) {
      const parseContent = async () => {
        try {
          const html = await marked.parse(post.content)
          setParsedContent(DOMPurify.sanitize(html))
        } catch (err) {
          console.error("Error parsing markdown:", err)
          setParsedContent(DOMPurify.sanitize(post.content))
        }
      }
      parseContent()
    }
  }, [post?.content])

  if (isLoading) {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="h-8 bg-gray-200 rounded mb-4"></div>
        <div className="h-4 bg-gray-200 rounded mb-8 w-1/3"></div>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-4 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`text-red-600 p-4 border border-red-200 rounded ${className}`}>
        Error loading post: {error.message}
      </div>
    )
  }

  if (!post) {
    return <div className={`text-gray-600 p-4 ${className}`}>Post not found</div>
  }

  return (
    <article className={className}>
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <time dateTime={post.created_at}>
            {new Date(post.created_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>

          <ReportButton targetId={post.id} type="post" />
        </div>
      </header>

      <div className="prose prose-lg max-w-none mb-8" dangerouslySetInnerHTML={{ __html: parsedContent }} />

      <div className="border-t border-gray-200 pt-8">
        <ReactionButtons postId={post.id} />
      </div>

      <div className="mt-12">
        <CommentSection postId={post.id} />
      </div>
    </article>
  )
}
