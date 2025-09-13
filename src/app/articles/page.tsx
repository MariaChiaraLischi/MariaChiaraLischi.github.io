import Link from 'next/link';
import { getAllCategories } from '@/lib/markdown';

export default function Writings() {
    const categories = getAllCategories();

    return (
        <div className="max-w-4xl mx-auto px-4 py-16">
            <div className="space-y-8">
                <h1 className="text-3xl md:text-4xl font-bold">
                    Writings
                </h1>
                <div className="space-y-6">
                    <p className="text-lg">
                        thoughts, ideas, and occasional ramblings organized by category.
                    </p>

                    {categories.length > 0 ? (
                        <div className="grid md:grid-cols-2 gap-6">
                            {categories.map((category) => (
                                <Link
                                    key={category.slug}
                                    href={`/articles/category/${category.slug}`}
                                    className="group"
                                >
                                    <div className="border border-[#442d15]/20 rounded-lg p-6 hover:bg-[#442d15]/5 transition-colors h-full">
                                        <div className="flex items-center justify-between mb-3">
                                            <h2 className="text-xl font-bold text-[#442d15] group-hover:opacity-70 transition-opacity">
                                                {category.name}
                                            </h2>
                                            <span className="text-sm text-[#442d15]/60 bg-[#442d15]/10 px-2 py-1 rounded-full">
                                                {category.count} {category.count === 1 ? 'article' : 'articles'}
                                            </span>
                                        </div>

                                        {category.description && (
                                            <p className="text-[#442d15]/80 leading-relaxed mb-4">
                                                {category.description}
                                            </p>
                                        )}

                                        <div className="text-[#442d15] group-hover:opacity-70 transition-opacity text-sm font-medium">
                                            Browse articles →
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="border-l-2 border-[#442d15]/20 pl-4 py-2">
                                <h3 className="font-bold text-lg">Coming soon</h3>
                                <p className="text-sm opacity-70">this space is being prepared</p>
                            </div>
                            <div className="border-l-2 border-[#442d15]/20 pl-4 py-2">
                                <h3 className="font-bold text-lg">Ideas in progress</h3>
                                <p className="text-sm opacity-70">thoughts are brewing</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
