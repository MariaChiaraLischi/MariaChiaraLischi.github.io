# Personal Website

A minimal, warm-toned personal website built with Next.js 15, featuring an interactive name animation, blog system, and fun arcade page.

## Features

- **Interactive Home Page**: Animated name with hover effects and social links
- **About Page**: Contact information and personal details
- **Blog System**: Category-based article organization with markdown support
- **Arcade Page**: Fun interactive elements including a Tetris-like game and random facts
- **Responsive Design**: Optimized for all screen sizes
- **Warm Color Palette**: Custom brown theme (#e4c8b7 background, #442d15 text)

## Tech Stack

- **Next.js 15** with App Router
- **React 19** with TypeScript
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Markdown** for blog posts
- **GitHub Pages** for deployment

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Export static files (for GitHub Pages)
npm run export
```

## Deployment to GitHub Pages

This project is configured for automatic deployment to GitHub Pages:

1. **Push to main branch** - The GitHub Action will automatically build and deploy
2. **Manual deployment** - Go to Actions tab and run "Deploy to GitHub Pages" workflow

### Configuration

- **Repository name**: `personal-website` (update `basePath` in `next.config.ts` if different)
- **GitHub Pages source**: Deploy from a branch (GitHub Actions)
- **Branch**: `gh-pages` (automatically created by the workflow)

### Custom Domain (Optional)

To use a custom domain:
1. Add a `CNAME` file to the `public` folder with your domain
2. Configure DNS settings to point to your GitHub Pages URL
3. Update the `basePath` in `next.config.ts` to empty string

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── articles/          # Blog system
│   │   ├── [slug]/        # Individual articles
│   │   └── category/      # Category pages
│   ├── arcade/            # Fun interactive page
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── Graph.tsx          # Interactive name animation
│   ├── BlockGame.tsx      # Tetris-like game
│   └── Navigation.tsx     # Site navigation
├── content/               # Markdown blog posts
│   └── posts/
├── lib/                   # Utility functions
│   └── markdown.ts        # Markdown processing
└── globals.css            # Global styles
```

## Adding Blog Posts

1. Create a new `.md` file in `src/content/posts/`
2. Add frontmatter with required fields:
   ```markdown
   ---
   title: "Your Article Title"
   date: "2024-01-15"
   excerpt: "Brief description"
   category: "Technology"  # or Personal, Tutorials, etc.
   published: true
   ---
   
   # Your Content Here
   ```

## Customization

- **Colors**: Update CSS variables in `src/app/globals.css`
- **Fonts**: Modify font settings in `globals.css`
- **Categories**: Add new categories in `src/lib/markdown.ts`
- **Social Links**: Update links in `src/components/Graph.tsx`

## License

MIT License - feel free to use this as a template for your own personal website!
