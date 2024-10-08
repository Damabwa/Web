/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "top-only":
          "0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06)",
        "bottom-only":
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06)",
      },
    },
    fontFamily: {
      pre: ["Pretendard"],
    },
    colors: {
      violet50: "#F2EBFB",
      violet100: "#EBE1F8",
      violet200: "#D6C0F1",
      violet300: "#7B35D3",
      violet400: "#6F30BE",
      violet500: "#622AA9",
      violet600: "#5C289E",
      violet700: "#4A207F",
      violet800: "#37185F",
      violet900: "#2B134A",
      yellow100: "#FFF7B0",
      yellow200: "#FFF492",
      yellow300: "#FFE600",
      red: "#FF3D3D",
      white: "#FFFFFF",
      black: "#111111",
      black02: "#555555",
      black03: "#767676",
      black04: "#999999",
      lineRegular: "#E5E5EC",
      lineLight: "#F1F1F5",
      gray: "#E0E0E0",
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
