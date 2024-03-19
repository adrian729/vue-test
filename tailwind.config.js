/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors';

delete colors['lightBlue'];
delete colors['warmGray'];
delete colors['trueGray'];
delete colors['coolGray'];
delete colors['blueGray'];

export default {
    darkMode: ['selector', '[data-theme="dark"]'],
    content: [
        './index.html',
        './public/**/*.html',
        './src/**/*.{vue,js,ts,jsx,tsx}',
    ],
    theme: {
        colors: {
            ...colors,
            transparent: 'transparent',
            current: 'currentColor',
            primary: 'var(--primary-color)',
            secondary: 'var(--secondary-color)',
        },
    },
    plugins: [],
};
