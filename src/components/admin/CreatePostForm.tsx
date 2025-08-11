"use client"

import type React from "react"
import { useState } from "react"
import { useCreatePost } from "../../hooks/useCreatePost"
import { useBlogContext } from "../../context/BlogContext"

interface CreatePostFormProps {
  onSuccess?: () => void
  className?: string
}

export function CreatePostForm({ onSuccess, className = "" }: CreatePostFormProps) {
  const { isAdmin } = useBlogContext()
  const { createPost } = useCreatePost()
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    slug: "",
    excerpt: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!isAdmin) {
    return <div className={`text-red-600 p-4 border border-red-200 rounded ${className}`}>Admin access required</div>
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title.trim() || !formData.content.trim() || !formData.slug.trim()) {
      return
    }

    setIsSubmitting(true)
    try {
      await createPost({
        title: formData.title.trim(),
        content: formData.content.trim(),
        slug: formData.slug.trim(),
        excerpt: formData.excerpt.trim() || undefined,
      })

      setFormData({ title: "", content: "", slug: "", excerpt: "" })
      onSuccess?.()
    } catch (error) {
      console.error("Error creating post:", error)
      alert("Error creating post")
    } finally {
      setIsSubmitting(false)
    }
  }

  const generateSlug = () => {
    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "") // Updated line
    setFormData((prev) => ({ ...prev, slug }))
  }

  return (
    <div className={className}>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Post</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Title *
          </label>
          <input
            id="title"
            type="text"
            value={formData.title}
            onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
            Slug *
          </label>
          <div className="flex space-x-2">
            <input
              id="slug"
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
              required
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={generateSlug}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              Generate
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
            Excerpt (optional)
          </label>
          <textarea
            id="excerpt"
            value={formData.excerpt}
            onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
            Content (Markdown) *
          </label>
          <textarea
            id="content"
            value={formData.content}
            onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
            rows={15}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Creating..." : "Create Post"}
        </button>
      </form>
    </div>
  )
}
