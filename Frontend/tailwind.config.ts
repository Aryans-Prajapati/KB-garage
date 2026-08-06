import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0f172a",
        "primary-container": "#131b2e",
        "on-primary": "#ffffff",
        "on-primary-container": "#7c839b",
        "on-primary-fixed": "#131b2e",
        "on-primary-fixed-variant": "#3f465c",
        secondary: "#e11d48", // Racing Red
        "secondary-dark": "#ba0035",
        "secondary-container": "#e21e49",
        "on-secondary": "#ffffff",
        "on-secondary-fixed-variant": "#920028",
        tertiary: "#10b981", // Professional Green
        "tertiary-container": "#002113",
        "on-tertiary-container": "#009668",
        background: "#f7f9fb",
        surface: "#f8fafc",
        "surface-bright": "#f7f9fb",
        "surface-dim": "#d8dadc",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f2f4f6",
        "surface-container": "#eceef0",
        "surface-container-high": "#e6e8ea",
        "surface-container-highest": "#e0e3e5",
        "on-surface": "#191c1e",
        "on-surface-variant": "#45464d",
        outline: "#76777d",
        "outline-variant": "#c6c6cd",
        error: "#ba1a1a",
        "error-container": "#ffdad6",
        "on-error": "#ffffff",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        heading: ["var(--font-montserrat)", "Montserrat", "sans-serif"],
        body: ["var(--font-inter)", "Inter", "sans-serif"],
      },
      borderRadius: {
        sm: "0.125rem",
        DEFAULT: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px",
      },
      spacing: {
        "margin-mobile": "16px",
        "margin-desktop": "40px",
        "section-gap": "80px",
        gutter: "24px",
        base: "8px",
        "container-max": "1280px",
      },
      boxShadow: {
        tactile: "0 4px 6px -1px rgba(15, 23, 42, 0.05)",
        "tactile-hover": "0 10px 25px -5px rgba(15, 23, 42, 0.12)",
        "accent-glow": "0 8px 20px rgba(225, 29, 72, 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
