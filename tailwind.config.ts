import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#080f0a",
        surface: "#0e1812",
        "tag-bg": "#0f1a14",
        "border-vy": "#1a2c22",
        accent: "#f97316",
        accent2: "#25a267",
        "text-vy": "#e8e8f0",
        muted: "#6b8a78",
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        mono: ["SF Mono", "JetBrains Mono", "monospace"],
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(90deg, #25a267, #f97316)",
        "card-air": "linear-gradient(135deg, #0a1a0f, #0e1812)",
      },
    },
  },
  plugins: [],
};

export default config;
