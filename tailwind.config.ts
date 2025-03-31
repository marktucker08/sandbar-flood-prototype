import type {Config} from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";
import tailwindcssTypography from "@tailwindcss/typography";



const config: Config = {
    darkMode: ["class", "[data-mode='dark']"],
    content: [
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/styles/**/*.{css}",
    ],
    theme: {
        extend: {
            screens: {
                xs: "475px",
            },
            colors: {
                // Sandbar Color Palette
                sandbar: {
                    primary: "#0066CC",    // Primary Blue
                    dark: "#003366",       // Dark Blue
                    light: "#E6F2FF",      // Light Blue
                    accent: "#FF9900",     // Accent Orange
                    gray: {
                        light: "#F5F5F5",  // Light Gray
                        dark: "#333333",    // Dark Gray
                    }
                },
                primary: {
                    "100": "#FFE8F0",
                    DEFAULT: "#51a4f7",
                },
                secondary: "#FBE843",
                black: {
                    "100": "#333333",
                    "200": "#141413",
                    "300": "#7D8087",
                    DEFAULT: "#000000",
                },
                white: {
                    "100": "#F7F7F7",
                    DEFAULT: "#FFFFFF",
                },
				light: {
					100: "#D6E0FF",
					200: "#EED1AC",
					300: "#F8F8FF",
					400: "#EDF1F1",
					500: "#8D8D8D",
					600: "#F9FAFB",
					700: "#E2E8F0",
					800: "#F8FAFC",
				  },
				  dark: {
					100: "#16191E",
					200: "#3A354E",
					300: "#232839",
					400: "#1E293B",
					500: "#0F172A",
					600: "#333C5C",
					700: "#464F6F",
					800: "#1E2230",
				  },
            },
            fontFamily: {
                "work-sans": ["var(--font-work-sans)"],
                "ar-sans": ["var(--font-ar-sans)"],
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            boxShadow: {
                100: "2px 2px 0px 0px rgb(0, 0, 0)",
                200: "2px 2px 0px 2px rgb(0, 0, 0)",
                300: "2px 2px 0px 2px rgb(238, 43, 105)",
            },
        },
    },
    plugins: [tailwindcssAnimate, tailwindcssTypography],
};

export default config;