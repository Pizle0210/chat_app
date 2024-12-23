import forms from "@tailwindcss/forms";
import typo from "@tailwindcss/typography";
import daisyui from "daisyui";
import t_animate from "tailwindcss-animate";
import t_form from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"], // Optional: Enables dark mode
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // Add all file types Tailwind should scan
  theme: {
    extend: {
      colors: {
        apple: {
          black: "#000000", // Apple black
          gray: "#666666", // Apple gray
          silver: "#979797", // Apple silver
          lightGray: "#eeeeee", // Apple light gray
          blue: "#0088cc" // Apple blue
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))"
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))"
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      }
    }
  },
  plugins: [t_animate, forms, typo, daisyui,t_form],
  daisyui: {
    themes: [
      "light",
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
      "dim",
      "nord",
      "sunset"
    ]
  }
};
