import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default <Partial<Config>>{
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'Inter', 'SF Pro', 'DM Sans', ...defaultTheme.fontFamily.sans],
      },
      borderRadius: {
        'neumorphic': '20px',
        'pill': '50px',
      },
      boxShadow: {
        'neumorphic-raised': '10px 10px 30px #c7d6e6, -10px -10px 30px #ffffff',
        'neumorphic-inset': 'inset 8px 8px 16px #c7d6e6, inset -8px -8px 16px #ffffff',
        'neumorphic-pressed': 'inset 8px 8px 16px #c7d6e6, inset -8px -8px 16px #ffffff',
      },
      colors: {
        'neumorphic-bg': '#e6effa',
        'neumorphic-text': '#3d4a5c',
        'neumorphic-card': '#f0f4f8',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
