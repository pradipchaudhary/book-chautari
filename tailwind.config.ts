import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: "media", // Enables dark mode based on media query
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "custom-radial":
                    "radial-gradient(ellipse 80% 80% at 50% -20%, rgba(120,119,198,0.3), rgba(255,255,255,0))",
            },
            maxWidth: {
                custom: "80rem", // Custom max-width of 80rem (1280px)
            },
            container: {
                center: true,
                padding: "2rem", // Optional: Add padding for smaller screens
                screens: {
                    lg: "80rem", // Custom container width for large screens
                },
            },
        },
    },
    plugins: [],
};
export default config;
