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
            'primary-hover': 'var(--color-primary-hover)',
            'container-primary': 'var(--color-container-primary)',
            'container-primary-hover': 'var(--color-container-primary-hover)',
            'on-container-primary': 'var(--color-on-container-primary)',
            // -- Secondary
            secondary: 'var(--color-secondary)',
            'secondary-hover': 'var(--color-secondary-hover)',
            'on-secondary': 'var(--color-on-secondary)',
            'container-secondary': 'var(--color-container-secondary)',
            'container-secondary-hover':
                'var(--color-container-secondary-hover)',
            'on-container-secondary': 'var(--color-on-container-secondary)',
            // -- Tertiary
            tertiary: 'var(--color-tertiary)',
            'tertiary-hover': 'var(--color-tertiary-hover)',
            'on-tertiary': 'var(--color-on-tertiary)',
            'container-tertiary': 'var(--color-container-tertiary)',
            'container-tertiary-hover': 'var(--color-container-tertiary-hover)',
            'on-container-tertiary': 'var(--color-on-container-tertiary)',
            // -- Warning
            warning: 'var(--color-warning)',
            'warning-hover': 'var(--color-warning-hover)',
            'on-warning': 'var(--color-on-warning)',
            'container-warning': 'var(--color-container-warning)',
            'container-warning-hover': 'var(--color-container-warning-hover)',
            'on-container-warning': 'var(--color-on-container-warning)',
            // -- Accent
            accent: 'var(--color-accent)',
            'accent-hover': 'var(--color-accent-hover)',
            'on-accent': 'var(--color-on-accent)',
            'container-accent': 'var(--color-container-accent)',
            'container-accent-hover': 'var(--color-container-accent-hover)',
            'on-container-accent': 'var(--color-on-container-accent)',
            // -- Surface
            'dim-surface': 'var(--color-dim-surface)',
            surface: 'var(--color-surface)',
            'bright-surface': 'var(--color-bright-surface)',
            'on-surface': 'var(--color-on-surface)',
            'inverse-surface': 'var(--color-inverse-surface)',
            'on-inverse-surface': 'var(--color-on-inverse-surface)',
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
