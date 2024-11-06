const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            backgroundImage: {
                'nav-gradient': "linear-gradient(to bottom,  rgba(11,11,92,1),  rgba(11,11,92,0.96),  rgba(11,11,92,0.95),  rgba(11,11,92,0.94),  rgba(11,11,92,0.93),  rgba(11,11,92,0.92),  rgba(11,11,92,0.91),  rgba(11,11,92,0.9), rgba(11,11,92,0.9), rgba(11,11,92,0.9), rgba(11,11,92,0.9), rgba(11,11,92,0.9), rgba(11,11,92,0.9), rgba(11,11,92,0.9), rgba(11,11,92,0.9), rgba(11,11,92,0.9), rgba(11,11,92,0.9), rgba(11,11,92,0.6), rgba(11,11,92,0.5), rgba(11,11,92,0.2), rgba(11,11,92,0))"
            },
            colors: {
                neutral: colors.neutral
            },
            fontFamily: {
                sans: ['Helvetica Neue', 'Arial', ...defaultTheme.fontFamily.sans],
                Roboto: ['Roboto', 'Helvetica Neue', 'Arial', ...defaultTheme.fontFamily.sans],
                NotoSans: ['Noto Sans', 'Helvetica Neue', 'Arial', ...defaultTheme.fontFamily.sans],
                Inter: ['Inter', 'Helvetica Neue', 'Arial', ...defaultTheme.fontFamily.sans],
                condensed: ['Reddit Sans Condensed', ...defaultTheme.fontFamily.sans]
            }
        }
    },
    daisyui: {
        themes: [
            {
                lofi: {
                    ...require('daisyui/src/theming/themes')['lofi'],
                    primary: '#2bdcd2',
                    'primary-content': '#171717',
                    secondary: '#016968',
                    info: '#2bdcd2',
                    'info-content': '#171717',
                }
            }
        ]
    },
    plugins: [require('daisyui')]
};
