'use client';

import BlockGame from '@/components/BlockGame';
import { useState } from 'react';

export default function Mystery() {
    const [, setEasterEgg] = useState(false);
    const [clickCount, setClickCount] = useState(0);
    const [currentFact, setCurrentFact] = useState<string>('');
    const [isLoadingFact, setIsLoadingFact] = useState(false);

    const fetchRandomFact = async () => {
        setIsLoadingFact(true);
        try {
            const response = await fetch('https://uselessfacts.jsph.pl/api/v2/facts/random');
            const data = await response.json();
            setCurrentFact(data.text);
        } catch (error) {
            console.error('Failed to fetch fact:', error);
            setCurrentFact('failed to fetch a random fact, but here\'s a fun one: the word "set" has the most different meanings in english! 📚');
        } finally {
            setIsLoadingFact(false);
        }
    };

    const handleMysteryClick = async () => {
        setClickCount(prev => prev + 1);

        // Always fetch a new fact on each click
        await fetchRandomFact();

        // Unlock easter egg after 4 clicks
        if (clickCount >= 3) { // Changed from 4 to 3 since we increment first
            setEasterEgg(true);
        }
    };

    const funnyMessages = [
        "this page is definitely not suspicious at all 👀",
        "nothing to see here, move along...",
        "are you sure you want to be here?",
        "this page contains 99% mystery and 1% confusion",
        "warning: may contain traces of fun",
        "congratulations! you found the secret page! 🎉"
    ];

    // Random message for potential future use
    // const randomMessage = funnyMessages[Math.floor(Math.random() * funnyMessages.length)];

    return (
        <div className="max-w-4xl mx-auto px-4 py-16">
            <div className="space-y-8">
                {/* Animated title */}
                <div className="text-center">
                    <h1
                        className="text-4xl md:text-6xl font-bold cursor-pointer select-none hover:scale-110 transition-transform duration-300"
                        onClick={handleMysteryClick}
                        style={{
                            textShadow: '2px 2px 4px rgba(68, 45, 21, 0.3)',
                            animation: 'bounce 2s infinite'
                        }}
                    >
                        ???
                    </h1>
                </div>

                {/* Funny content */}
                <div className="space-y-4">
                    <div className="text-center">
                        {/* Random fact display */}
                        {clickCount > 0 && (
                            <div className="bg-[#442d15]/10 border border-[#442d15]/20 rounded-lg p-4 mb-2 animate-fadeIn">
                                <div className="text-sm opacity-80 mb-2">
                                    💡 useless fact #{clickCount}:
                                </div>
                                {isLoadingFact ? (
                                    <div className="flex items-center justify-center py-4">
                                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#442d15]"></div>
                                        <span className="ml-2 text-sm opacity-70">loading fact...</span>
                                    </div>
                                ) : (
                                    <p className="text-sm italic">{currentFact}</p>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Game section with fun styling */}
                    <div className="p-6 text-center bg-gradient-to-br from-[#e4c8b7]/20 to-transparent">
                        <div className="space-y-2">
                            <div className="flex justify-center space-x-2 text-2xl">
                                <span className="animate-bounce" style={{ animationDelay: '0ms' }}>🎮</span>
                                <span className="animate-bounce" style={{ animationDelay: '150ms' }}>🎯</span>
                                <span className="animate-bounce" style={{ animationDelay: '300ms' }}>🎲</span>
                            </div>

                            <BlockGame />
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes bounce {
                    0%, 20%, 50%, 80%, 100% {
                        transform: translateY(0);
                    }
                    40% {
                        transform: translateY(-10px);
                    }
                    60% {
                        transform: translateY(-5px);
                    }
                }
                
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .animate-fadeIn {
                    animation: fadeIn 0.5s ease-out;
                }
            `}</style>
        </div>
    );
}
