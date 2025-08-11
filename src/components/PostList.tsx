"use client"
import Link from "next/link"
import { usePosts } from "../hooks/usePosts"
import { marked } from "marked"
import DOMPurify from "dompurify"

interface PostListProps {
  page?: number
  limit?: number
  className?: string
}

export function PostList({ page = 1, limit = 10, className = "" }: PostListProps) {
  const { posts, total, isLoading, error } = usePosts(page, limit)

  if (isLoading) {
    return (
      <div className={`space-y-6 ${className}`}>
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded"></div>
              <div className="h-3 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className={`text-red-600 p-4 border border-red-200 rounded ${className}`}>
        Error loading posts: {error.message}
      </div>
    )
  }

  const totalPages = Math.ceil(total / limit)

  return (
    <div className={className}>
      <div className="space-y-8">
        {posts.map((post) => (
          <article key={post.id} className="border-b border-gray-200 pb-8">
            <Link href={`/blog/${post.slug}`} className="group">
              <h2 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                {post.title}
              </h2>
            </Link>

            <div className="text-sm text-gray-500 mb-4">
              {new Date(post.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>

            <div className="prose prose-gray max-w-none">
              {post.excerpt ? (
                <p>{post.excerpt}</p>
              ) : (
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(marked.parse(post.content.substring(0, 300) + "...")),
                  }}
                />
              )}
            </div>

            <Link
              href={`/blog/${post.slug}`}
              className="inline-block mt-4 text-blue-600 hover:text-blue-800 font-medium"
            >
              Read more →
            </Link>
          </article>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-4 mt-12">
          {page > 1 && (
            <Link href={`?page=${page - 1}`} className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">
              Previous
            </Link>
          )}

          <span className="text-gray-600">
            Page {page} of {totalPages}
          </span>

          {page < totalPages && (
            <Link href={`?page=${page + 1}`} className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">
              Next
            </Link>
          )}
        </div>
      )}
    </div>
  )
}
