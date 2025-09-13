import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'src/content/posts');

export interface Post {
    slug: string;
    title: string;
    date: string;
    excerpt?: string;
    content: string;
    published: boolean;
    category: string;
}

export interface Category {
    name: string;
    slug: string;
    count: number;
    description?: string;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
    try {
        const fullPath = path.join(postsDirectory, `${slug}.md`);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        const processedContent = await remark()
            .use(html)
            .process(content);

        const contentHtml = processedContent.toString();

        return {
            slug,
            title: data.title || 'Untitled',
            date: data.date || new Date().toISOString(),
            excerpt: data.excerpt || '',
            content: contentHtml,
            published: data.published !== false,
            category: data.category || 'general',
        };
    } catch (error) {
        console.error(`Error reading post ${slug}:`, error);
        return null;
    }
}

export function getAllPosts(): Post[] {
    try {
        if (!fs.existsSync(postsDirectory)) {
            return [];
        }

        const fileNames = fs.readdirSync(postsDirectory);
        const allPostsData = fileNames
            .filter((name) => name.endsWith('.md'))
            .map((name) => {
                const slug = name.replace(/\.md$/, '');
                const fullPath = path.join(postsDirectory, name);
                const fileContents = fs.readFileSync(fullPath, 'utf8');
                const { data } = matter(fileContents);

                return {
                    slug,
                    title: data.title || 'Untitled',
                    date: data.date || new Date().toISOString(),
                    excerpt: data.excerpt || '',
                    content: '', // We don't need content for the list view
                    published: data.published !== false,
                    category: data.category || 'general',
                };
            })
            .filter((post) => post.published)
            .sort((a, b) => (a.date < b.date ? 1 : -1));

        return allPostsData;
    } catch (error) {
        console.error('Error reading posts:', error);
        return [];
    }
}

export function getAllCategories(): Category[] {
    const posts = getAllPosts();
    const categoryMap = new Map<string, Category>();

    posts.forEach((post) => {
        const categorySlug = post.category.toLowerCase().replace(/\s+/g, '-');
        const existingCategory = categoryMap.get(categorySlug);

        if (existingCategory) {
            existingCategory.count += 1;
        } else {
            categoryMap.set(categorySlug, {
                name: post.category,
                slug: categorySlug,
                count: 1,
                description: getCategoryDescription(post.category),
            });
        }
    });

    return Array.from(categoryMap.values()).sort((a, b) => a.name.localeCompare(b.name));
}

export function getPostsByCategory(categorySlug: string): Post[] {
    const posts = getAllPosts();
    return posts.filter((post) =>
        post.category.toLowerCase().replace(/\s+/g, '-') === categorySlug
    );
}

function getCategoryDescription(category: string): string {
    const descriptions: { [key: string]: string } = {
        'technology': 'Thoughts on tech, programming, and digital innovation',
        'personal': 'Personal reflections and life experiences',
        'tutorials': 'Step-by-step guides and how-to articles',
        'projects': 'Showcasing my work and project documentation',
        'general': 'General thoughts and miscellaneous musings',
    };

    return descriptions[category.toLowerCase()] || 'Articles and thoughts';
}
