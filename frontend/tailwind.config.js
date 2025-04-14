/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["dark", "light", "cupcake", "forest", "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden", "lofi", "dracula", "cmyk", "autumn", "business", "acid", "lemonade", "night"],
  }
}