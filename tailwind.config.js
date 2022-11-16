const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [ "./src/**/*.{js,jsx,ts,tsx}" ],
  theme: {
    extend: {},
  },
  plugins: [ require("daisyui") ],
  daisyui: {
    themes: [ "light", "dark", "cupcake", "bumblebee", "emerald", "corporate", "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden", "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black", "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade", "night", "coffee", "winter" ],
  },
});
