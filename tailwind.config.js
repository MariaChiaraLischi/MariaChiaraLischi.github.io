/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            typography: {
                DEFAULT: {
                    css: {
                        color: '#442d15',
                        maxWidth: 'none',
                        h1: {
                            color: '#442d15',
                        },
                        h2: {
                            color: '#442d15',
                        },
                        h3: {
                            color: '#442d15',
                        },
                        h4: {
                            color: '#442d15',
                        },
                        a: {
                            color: '#442d15',
                            textDecoration: 'underline',
                            '&:hover': {
                                opacity: '0.7',
                            },
                        },
                        code: {
                            color: '#442d15',
                            backgroundColor: '#442d15',
                            backgroundColorOpacity: '0.1',
                            padding: '0.25rem 0.5rem',
                            borderRadius: '0.25rem',
                        },
                        pre: {
                            backgroundColor: '#442d15',
                            backgroundColorOpacity: '0.05',
                            border: '1px solid #442d15',
                            borderOpacity: '0.2',
                        },
                        blockquote: {
                            borderLeftColor: '#442d15',
                            borderLeftOpacity: '0.3',
                        },
                    },
                },
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
}
