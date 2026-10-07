tailwind.config = {
  theme: {
    extend: {
      colors: {
        carbon: "#000000",
        paper: "#FFFFFF",
        warm: "#E5E5E5",
        mist: "#F3F3F3",
        ash: "#C6C6C6",
        smoke: "#979797",
        slate: "#444444",
        graphite: "#2F2F2F",
        mint: "#D1FFCA",
        voltage: "#FFF100",
      },
      fontFamily: {
        display: ['"Rozha One"', '"Noto Serif Devanagari"', "serif"],
        yatra: ['"Yatra One"', "serif"],
        marathi: ['"Noto Serif Devanagari"', "serif"],
        sans: ['"Mukta"', "system-ui", "sans-serif"],
        tiro: ['"Tiro Devanagari Marathi"', "serif"],
        cond: ['"Mukta"', '"Space Grotesk"', "sans-serif"],
        mono: ['"JetBrains Mono"', '"Mukta"', "monospace"],
      },
      borderRadius: {
        "3xl": "24px",
        "4xl": "36px",
        "5xl": "48px",
        "6xl": "64px",
      },
    },
  },
};
