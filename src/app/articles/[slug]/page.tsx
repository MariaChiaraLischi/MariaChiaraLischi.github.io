import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPostBySlug, getAllPosts } from '@/lib/markdown';

interface PostPageProps {
    params: {
        slug: string;
    };
}

export async function generateStaticParams() {
    const posts = getAllPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export default async function PostPage({ params }: PostPageProps) {
    const post = await getPostBySlug(params.slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-16">
            <div className="space-y-8">
                {/* Back to articles */}
                <div>
                    <Link
                        href="/articles"
                        className="text-[#442d15] hover:opacity-70 transition-opacity text-sm"
                    >
                        ← Back to articles
                    </Link>
                </div>

                {/* Article header */}
                <div className="space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-[#442d15]">
                        {post.title}
                    </h1>

                    <div className="flex items-center space-x-4 text-sm text-[#442d15]/70">
                        <time dateTime={post.date}>
                            {new Date(post.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </time>
                        {post.excerpt && (
                            <span>•</span>
                        )}
                        {post.excerpt && (
                            <span className="italic">{post.excerpt}</span>
                        )}
                    </div>
                </div>

                {/* Article content */}
                <div
                    className="prose prose-lg max-w-none prose-headings:text-[#442d15] prose-headings:font-bold prose-p:text-[#442d15] prose-a:text-[#442d15] prose-a:underline prose-strong:text-[#442d15] prose-code:text-[#442d15] prose-code:bg-[#442d15]/10 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-[#442d15]/5 prose-pre:border prose-pre:border-[#442d15]/20"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />
            </div>
        </div>
    );
}
