import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostsByCategory, getAllCategories } from '@/lib/markdown';

interface CategoryPageProps {
    params: {
        slug: string;
    };
}

export async function generateStaticParams() {
    const categories = getAllCategories();
    return categories.map((category) => ({
        slug: category.slug,
    }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const posts = getPostsByCategory(params.slug);
    const categories = getAllCategories();
    const currentCategory = categories.find(cat => cat.slug === params.slug);

    if (!currentCategory || posts.length === 0) {
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
                        ← Back to categories
                    </Link>
                </div>

                {/* Category header */}
                <div className="space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-[#442d15]">
                        {currentCategory.name}
                    </h1>

                    <div className="flex items-center space-x-4 text-sm text-[#442d15]/70">
                        <span>{posts.length} {posts.length === 1 ? 'article' : 'articles'}</span>
                        {currentCategory.description && (
                            <>
                                <span>•</span>
                                <span className="italic">{currentCategory.description}</span>
                            </>
                        )}
                    </div>
                </div>

                {/* Articles list */}
                <div className="space-y-6">
                    {posts.map((post) => (
                        <Link
                            key={post.slug}
                            href={`/articles/${post.slug}`}
                            className="block"
                        >
                            <article className="border border-[#442d15]/20 rounded-lg p-6 hover:bg-[#442d15]/5 transition-colors cursor-pointer">
                                <h2 className="text-xl font-bold text-[#442d15] hover:opacity-70 transition-opacity mb-2">
                                    {post.title}
                                </h2>

                                <div className="flex items-center space-x-4 text-sm text-[#442d15]/70 mb-3">
                                    <time dateTime={post.date}>
                                        {new Date(post.date).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </time>
                                </div>

                                {post.excerpt && (
                                    <p className="text-[#442d15]/80 leading-relaxed">
                                        {post.excerpt}
                                    </p>
                                )}

                                <div className="mt-4">
                                    <span className="text-[#442d15] hover:opacity-70 transition-opacity text-sm font-medium">
                                        Read more →
                                    </span>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
