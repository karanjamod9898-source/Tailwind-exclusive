/** @type {import('tailwindcss').Config} */
export default {
  content: ["./**/*.html"],
  theme: {
    extend: {
      maxWidth: {

        'container': '1300px',
        '1200': '1200px',
        '1100': '1100px',
        '1000': '1000px',
        '500': '500px',

      },

      lineHeight: {
        '10': '55px'
      },

      colors: {
        'primary': 'rgba(0, 105, 171, 1)',
        'danger': 'rgba(219, 68, 68, 1)',
        'danger-dark':'#dc2626',
        'yellow':'#facc15',
        'green':'rgba(0, 255, 102, 1)',
      
        'secoundary': '#6b7280',
        'light-secoundary': '#e2e8f0',
        'secoundary-extra-light': 'rgba(245, 245, 245, 1)',
      },
      fontSize:{
        '35':'35px',
      },
      
    },
  },
  plugins: [],
}