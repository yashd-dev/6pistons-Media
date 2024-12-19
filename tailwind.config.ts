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
        background: "rgb(15,17,21)",
        foreground: "#F5F5F5",
        BrandRed: "#ED203D",
      },
      fontFamily: {
        hanken: "'Hanken Grotesk', sans-serif",
        bigShoulders: "var(--font-big-shoulders-display)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
} satisfies Config;
