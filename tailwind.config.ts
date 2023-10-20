import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    rotate: {
      "-180": "-180deg",
      "-90": "-90deg",
      "-45": "-45deg",
      0: "0",
      45: "45deg",
      90: "90deg",
      135: "135deg",
      180: "180deg",
      270: "270deg",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        Header: ["Lato", "sans-serif"],
        Text2: ["Lato", "sans-serif"],
        About: ["Playfair Display", "serif"],
        Arimo: ["Arimo", "sans-serif"],
      },
      colors: {
        primary: "#2A2A2A",
        secondary: "#FFD700",
        AAtertiary: "#333333",
        btnHover: "#C08435",
        StartupBackground: "#020c1b",
      },
      screens: {
        sm: "640px",
        // => @media (min-width: 640px) { ... }

        md: "768px",
        // => @media (min-width: 768px) { ... }

        lg: "1024px",
        // => @media (min-width: 1024px) { ... }

        xl: "1280px",
        // => @media (min-width: 1280px) { ... }

        "2xl": "1536px",
        // => @media (min-width: 1536px) { ... }
        "3xl": "1920px",
        "4xl": "2560px",
        "5xl": "3840px",
      },
    },
    plugins: [
      require("tailwind-scrollbar"),
      require("tailwind-scrollbar-hide"),
    ],
    variants: {
      scrollbar: ["rounded"],
    },
  },
  plugins: [],
};
export default config;
