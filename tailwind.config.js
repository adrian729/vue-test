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
            tertiary: 'var(--tertiary-color)',
            accent: 'var(--accent-color)',
            'primary-text': 'var(--font-primary-color)',
            'secondary-text': 'var(--font-secondary-color)',
            'tertiary-text': 'var(--font-tertiary-color)',
            'accent-text': 'var(--font-accent-color)',
        },
    },
    plugins: [],
    safelist: [
        {
            pattern:
                /^(bg|text|border)-(primary|secondary|tertiary|accent)(-text)?/,
            variants: ['hover', 'focus'],
        },
    ],
};
