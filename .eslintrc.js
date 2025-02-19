export default {
  plugins: ["tailwindcss"],
  extends: ["plugin:tailwindcss/recommended"],
  rules: {
    "css/unknownAtRules": "off",
    "react/react-in-jsx-scope": "off",
    "react/jsx-uses-react": "off",
    "no-unused-vars": "off",
  },
};
