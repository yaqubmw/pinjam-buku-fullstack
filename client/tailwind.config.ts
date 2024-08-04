import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-poppins)", ...fontFamily.sans],
      }
    },
  },
  plugins: [
    require("@tailwindcss/forms"),

    function ({ addUtilities }: any) {

      const newUtilities = {
        '.no-outline': {
          '@apply focus:outline-none focus:ring-0': {},
        },
      };

      addUtilities(newUtilities);


      const newScrollbarUtilities = {
        '.no-scrollbar::-webkit-scrollbar': {
          display: 'none',
        },
        '.no-scrollbar': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
      };

      addUtilities(newScrollbarUtilities, ['responsive', 'hover']);
    },

  ],
};
export default config;
