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
            // -- Primary
            primary: 'var(--color-primary)',
            'on-primary': 'var(--color-on-primary)',
            'container-primary': 'var(--color-container-primary)',
            'on-container-primary': 'var(--color-on-container-primary)',
            // -- Secondary
            secondary: 'var(--color-secondary)',
            'on-secondary': 'var(--color-on-secondary)',
            'container-secondary': 'var(--color-container-secondary)',
            'on-container-secondary': 'var(--color-on-container-secondary)',
            // -- Tertiary
            tertiary: 'var(--color-tertiary)',
            'on-tertiary': 'var(--color-on-tertiary)',
            'container-tertiary': 'var(--color-container-tertiary)',
            'on-container-tertiary': 'var(--color-on-container-tertiary)',
            // -- Warning
            warning: 'var(--color-warning)',
            'on-warning': 'var(--color-on-warning)',
            'container-warning': 'var(--color-container-warning)',
            'on-container-warning': 'var(--color-on-container-warning)',
            // -- Surface
            'dim-surface': 'var(--color-dim-surface)',
            surface: 'var(--color-surface)',
            'bright-surface': 'var(--color-bright-surface)',
            'on-surface': 'var(--color-on-surface)',
            'inverse-surface': 'var(--color-inverse-surface)',
            'on-inverse-surface': 'var(--color-on-inverse-surface)',
            // -- Accent
            accent: 'var(--color-accent)',
            'on-accent': 'var(--color-on-accent)',
            'container-accent': 'var(--color-container-accent)',
            'on-container-accent': 'var(--color-on-container-accent)',
        },
    },
    plugins: [],
    safelist: [
        {
            pattern:
                /^(bg|text|border)(-on)?(-container)?-(primary|secondary|tertiary|warning|accent)/,
            variants: ['hover', 'focus'],
        },
        {
            pattern:
                /^(bg|text|border)(-on)?(-dim|-bright|-inverse)?(-surface)/,
            variants: ['hover', 'focus'],
        },
    ],
};
