import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'tg-bg-color': '#212121',
        'tg-secondary-bg-color': '#0f0f0f',
        'tg-theme-hint-color': '#aaaaaa',
        'tg-text-color': '#ffffff',
        'tg-subtitle-text-color': '#aaaaaa',
        'tg-button-color': '#8774e1',
			},
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
      },
      boxShadow: {
        'header': '0 2px 12px 0 #000',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
};
export default config;
