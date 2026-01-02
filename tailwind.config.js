/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            keyframes: {
                "fade-out": {
                    "0%": {
                        opacity: "0",
                        transform: "translate(-50%, 4px)",
                    },
                    "15%": {
                        opacity: "1",
                        transform: "translate(-50%, 0)",
                    },
                    "100%": {
                        opacity: "0",
                        transform: "translate(-50%, -4px)",
                    },
                },
            },
        },
    },
    plugins: [],
};