/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        "accent-primary": "var(--color-neutral-silver)",
        "surface-primary": "var(--color-neutral-black)",
        "text-brand": "var(--color-brand-butterscotch)",
        "text-primary": "var(--color-neutral-white)",
      },

      backgroundImage: {
        'aboutUs': "url('/src/assets/aboutUs.jpg')",
      },
    },
	fontFamily: {
		'oswald': ['Oswald', 'sans-serif'],
	}
  },
  
  plugins: [],
};
