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
				'tg-bg-color': 'var(--tg-theme-bg-color)',
        'tg-secondary-bg-color': 'var(--tg-theme-secondary-bg-color)',
        'tg-theme-hint-color': 'var(--tg-theme-hint-color)',
				'tg-text-color': 'var(--tg-theme-text-color)',
        'tg-subtitle-text-color': 'var(--tg-theme-subtitle-text-color)',
        'tg-button-color': 'var(--tg-theme-button-color)',
			},
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
      },
      boxShadow: {
        'header': '0 2px 12px 0 #000',
      },
    },
  },
  plugins: [],
};
export default config;
