export default function About() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-16">
            <div className="space-y-8">
                <h1 className="text-3xl md:text-4xl font-bold">
                    About
                </h1>

                <div className="space-y-6 text-lg leading-relaxed">
                    <p>
                        i'm a curious human who enjoys building things and exploring ideas.
                    </p>
                    <p>
                        this space is where i share thoughts, document projects,
                        and occasionally muse about the world around us.
                    </p>
                    <p>
                        currently learning, always growing.
                    </p>
                </div>

                {/* Contact Information */}
                <div className="mt-12 p-6 bg-[#442d15]/5 border border-[#442d15]/20 rounded-lg">
                    <h2 className="text-2xl font-bold mb-6 text-center">Get in touch</h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Email */}
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-[#442d15]/10 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-[#442d15]" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                                </svg>
                            </div>
                            <div>
                                <p className="font-semibold text-[#442d15]">Email</p>
                                <a
                                    href="mailto:lischimariachiara@gmail.com"
                                    className="text-[#442d15] hover:opacity-70 transition-opacity"
                                >
                                    lischimariachiara@gmail.com
                                </a>
                            </div>
                        </div>

                        {/* LinkedIn */}
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-[#442d15]/10 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-[#442d15]" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
                                </svg>
                            </div>
                            <div>
                                <p className="font-semibold text-[#442d15]">LinkedIn</p>
                                <a
                                    href="https://www.linkedin.com/in/maria-chiara-lischi"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#442d15] hover:opacity-70 transition-opacity"
                                >
                                    maria-chiara-lischi
                                </a>
                            </div>
                        </div>

                        {/* GitHub */}
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-[#442d15]/10 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-[#442d15]" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                                </svg>
                            </div>
                            <div>
                                <p className="font-semibold text-[#442d15]">GitHub</p>
                                <a
                                    href="https://github.com/MariaChiaraLischi"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#442d15] hover:opacity-70 transition-opacity"
                                >
                                    MariaChiaraLischi
                                </a>
                            </div>
                        </div>

                        {/* X (Twitter) */}
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-[#442d15]/10 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-[#442d15]" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </div>
                            <div>
                                <p className="font-semibold text-[#442d15]">X (Twitter)</p>
                                <a
                                    href="https://x.com/0xm4k1"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#442d15] hover:opacity-70 transition-opacity"
                                >
                                    @0xm4k1
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 text-center">
                        <p className="text-sm opacity-70">
                            feel free to reach out! i'm always interested in new projects and conversations.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
