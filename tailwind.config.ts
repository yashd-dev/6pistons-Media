import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0F1115",
        foreground: "#F5F5F5",
        BrandRed: "#ED203D",
      },
      fontFamily: {
        hanken: "'Hanken Grotesk', sans-serif",
        bigShoulders: "'Big Shoulders Display', sans-serif",
      },
    },
  },
  plugins: [],
} satisfies Config;
