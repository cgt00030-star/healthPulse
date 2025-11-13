export default {
  content: [
    "./src/app/**/*.{js,jsx}",
    "./src/pages/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
    "./src/lib/**/*.{js,jsx}",
    "./public/**/*.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2DC6A8",
        secondary: "#3B82F6",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
    },
  },
};