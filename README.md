# @zemenay/blog-system

A plug-and-play Next.js blog system with Supabase integration. Features include post management, reactions (likes/dislikes), comments, reporting system, and admin functionality.

## Features

- 📝 **Post Management**: Create, read, update, delete blog posts with Markdown support
- 👍 **Reactions**: Like/dislike system with IP-based tracking (no auth required)
- 💬 **Comments**: Anonymous or named commenting system
- 🚨 **Reporting**: Report inappropriate posts or comments
- 👨‍💼 **Admin Panel**: Protected admin functionality with RLS policies
- 🎨 **Responsive Design**: Mobile-friendly with Tailwind CSS styling
- ⚡ **Optimistic Updates**: Smooth user experience with SWR
- 🔒 **Security**: Row Level Security (RLS) policies for data protection

## Installation

\`\`\`bash
npm install @zemenay/blog-system
\`\`\`

### Peer Dependencies

Make sure you have these installed in your Next.js project:

\`\`\`bash
npm install next react react-dom @supabase/supabase-js
\`\`\`

## Quick Setup

### 1. Database Setup

Run the SQL script in your Supabase SQL editor:

\`\`\`sql
-- Copy and paste the contents of supabase-schema.sql
-- This creates all necessary tables, policies, and indexes
\`\`\`

### 2. Environment Variables

Add to your \`.env.local\`:

\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
\`\`\`

### 3. Create IP Detection Endpoint

Create \`pages/api/get-ip.js\` (Pages Router) or \`app/api/get-ip/route.js\` (App Router):

\`\`\`javascript
// Pages Router
export default function handler(req, res) {
  const forwarded = req.headers["x-forwarded-for"];
  const ip = forwarded ? forwarded.split(/, /)[0] : req.connection.remoteAddress;
  res.status(200).json({ ip });
}

// App Router
export async function GET(request) {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(/, /)[0] : request.ip;
  return Response.json({ ip });
}
\`\`\`

### 4. Setup Provider

Wrap your app with the BlogProvider:

\`\`\`jsx
// _app.js (Pages Router) or layout.js (App Router)
import { createClient } from '@supabase/supabase-js'
import { BlogProvider } from '@zemenay/blog-system'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default function App({ Component, pageProps }) {
  return (
    <BlogProvider supabaseClient={supabase}>
      <Component {...pageProps} />
    </BlogProvider>
  )
}
\`\`\`

## Usage Examples

### Display Blog Posts

\`\`\`jsx
import { PostList } from '@zemenay/blog-system'

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>
      <PostList page={1} limit={10} />
    </div>
  )
}
\`\`\`

### Single Post View

\`\`\`jsx
import { Post } from '@zemenay/blog-system'
import { useRouter } from 'next/router'

export default function PostPage() {
  const router = useRouter()
  const { slug } = router.query

  return (
    <div className="container mx-auto px-4 py-8">
      <Post slug={slug} />
    </div>
  )
}
\`\`\`

### Admin Panel

\`\`\`jsx
import { CreatePostForm, EditPostForm } from '@zemenay/blog-system'

export default function AdminPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <CreatePostForm onSuccess={() => console.log('Post created!')} />
    </div>
  )
}
\`\`\`

## Components

### Core Components

- \`<PostList />\` - Displays paginated list of posts
- \`<Post slug="post-slug" />\` - Single post view with reactions and comments
- \`<ReactionButtons postId={id} />\` - Like/dislike buttons with counts
- \`<CommentSection postId={id} />\` - Comment form and list
- \`<ReportButton targetId={id} type="post|comment" />\` - Report functionality

### Admin Components

- \`<CreatePostForm />\` - Create new posts (admin only)
- \`<EditPostForm postId={id} />\` - Edit existing posts (admin only)

## Hooks

### Data Fetching

- \`usePosts(page, limit)\` - Fetch paginated posts
- \`usePost(slug)\` - Fetch single post by slug
- \`useReactions(postId)\` - Get reaction counts and user's reaction
- \`useComments(postId)\` - Fetch comments for a post

### Mutations

- \`useCreatePost()\` - Create, update, delete posts (admin only)
- \`useReportContent()\` - Report posts or comments

## Admin Setup

### 1. Enable Admin Access

In your Supabase dashboard, update a user to be admin:

\`\`\`sql
UPDATE auth.users 
SET is_admin = true 
WHERE email = 'admin@example.com';
\`\`\`

### 2. Admin Routes

Create protected admin routes:

\`\`\`jsx
import { useBlogContext } from '@zemenay/blog-system'
import { CreatePostForm } from '@zemenay/blog-system'

export default function AdminDashboard() {
  const { isAdmin } = useBlogContext()

  if (!isAdmin) {
    return <div>Access denied</div>
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <CreatePostForm />
    </div>
  )
}
\`\`\`

## Customization

### Styling

The components use Tailwind CSS classes. You can override styles by:

1. Using the \`className\` prop on components
2. Creating custom CSS classes
3. Using Tailwind's utility classes

### Rate Limiting

The system includes basic rate limiting for reactions (1 per IP per post). For production, consider implementing additional rate limiting at the API level.

## TypeScript Support

Full TypeScript support with exported types:

\`\`\`typescript
import type { 
  Post, 
  Comment, 
  Reaction, 
  CreatePostData 
} from '@zemenay/blog-system'
\`\`\`

## Security

- Row Level Security (RLS) policies protect data
- IP-based reaction tracking prevents spam
- Admin-only access for post management
- Content reporting system for moderation

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

For issues and questions:
- GitHub Issues: [Create an issue](https://github.com/zemenay/blog-system/issues)
- Documentation: [Full docs](https://github.com/zemenay/blog-system#readme)
