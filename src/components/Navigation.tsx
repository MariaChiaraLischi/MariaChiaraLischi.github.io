'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navigation = () => {
    const pathname = usePathname();

    const navItems = [
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About' },
        { href: '/articles', label: 'Articles' },
        { href: '/arcade', label: 'Arcade' },
    ];

    return (
        <nav className="border-b border-[#442d15]/20 px-6 py-4">
            <div className="flex justify-between items-center">
                {/* <Link href="/" className="text-lg font-bold hover:opacity-70 transition-opacity">
                    Maria Chiara Lischi
                </Link> */}
                <div className="flex space-x-6">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`text-sm hover:opacity-70 transition-opacity ${pathname === item.href ? 'font-bold' : ''
                                }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
