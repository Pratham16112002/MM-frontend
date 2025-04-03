/** @type {import('tailwindcss').Config} */
import nativewindPreset from 'nativewind/preset';

module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [nativewindPreset],
  theme: {
    extend: {
      fontFamily: {
        Inter: ['Inter-Medium-Regular', 'sans-serif'],
        Intersm: ['Inter-Small-Regular', 'sans-serif'],
        InterItalic: ['Inter-Italic', 'sans-serif'],
      },
    },
    colors: {
      transparent: 'transparent',
      white: '#F5F5F5',
      link: '#00A6ED',
      background: '#211529',
      error: '#ff6b6b',
      gray: '#908D8A',
      success: '#38C172',
    },
  },
  plugins: [],
};
