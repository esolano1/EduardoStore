/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#f48525",
        "background-light": "#f8f7f5",
        "background-dark": "#221810",
        "background-white": "#ffffff",
      },
      fontFamily: {
        display: ['"Epilogue"', 'ui-sans-serif', 'system-ui', '-apple-system', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', '"Apple Color Emoji"', '"Segoe UI Emoji"'],
      },
      borderRadius: {
        DEFAULT: "1rem",
        lg: "2rem",
        xl: "3rem",
      },
      backgroundImage: {
        hero: `linear-gradient(rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%),
               url("https://lh3.googleusercontent.com/aida-public/AB6AXuD3jW4AmplQfV8j3IjR4AfI9-uX-n5UuENY6a90juXiMOv6HJbN5hQTKzk1GM_t3bqhXk6VYvLaqdwFYQQTbZR_TkDsgbCFKyUFkjomxXgxTw6SAgT3KdKhmrpcwZFjfNqdW1ZFYXBVFjax_NjQpf_2nwJ_KENYgoNjtrf0yUU3xPxKgTY9g8kcJ5Z9O7dNJfyrbg6kRZzH_JtvujsymO7A93lWpSWy_0syDFMrZM5CCBFG4QnbswiTDMltMmN4NNg5cpDf95IrWw0")`,
      },
    },
  },
  plugins: [],
};
