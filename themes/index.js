export const themes = {
  forest: {
    name: 'Forest', atmosphere: 'calm',
    colors: { primary: '#2d5a27', secondary: '#4a7c3f', accent: '#8b6914', bg: '#f4f1ea', surface: '#faf7f0', text: '#2c1810', textLight: '#5a4a3a', border: '#c4b59a' },
    typography: { heading: 'serif', body: 'serif', dropCap: true },
    decor: { divider: '🍃', particles: 'fireflies', particleColor: '#a8e6a1' },
  },
  gothic: {
    name: 'Gothic', atmosphere: 'dark',
    colors: { primary: '#8b0000', secondary: '#4a0000', accent: '#d4af37', bg: '#1a1a1a', surface: '#2a2a2a', text: '#d4d4d4', textLight: '#888888', border: '#3a3a3a' },
    typography: { heading: 'serif', body: 'serif', dropCap: true },
    decor: { divider: '🥀', particles: 'none', particleColor: 'transparent' },
  },
  cyberpunk: {
    name: 'Cyberpunk', atmosphere: 'energetic',
    colors: { primary: '#b026ff', secondary: '#00ffff', accent: '#ff006e', bg: '#0a0a0f', surface: '#1a1a2e', text: '#e0e0ff', textLight: '#8888aa', border: '#2a2a4e' },
    typography: { heading: 'sans', body: 'mono', dropCap: false },
    decor: { divider: '⚡', particles: 'neon', particleColor: '#00ffff' },
  },
  ocean: {
    name: 'Ocean', atmosphere: 'calm',
    colors: { primary: '#1b4965', secondary: '#3e92cc', accent: '#62b6cb', bg: '#f0f7fa', surface: '#ffffff', text: '#0a1922', textLight: '#2c4a5a', border: '#b8d8e3' },
    typography: { heading: 'serif', body: 'sans', dropCap: true },
    decor: { divider: '🌊', particles: 'none', particleColor: 'transparent' },
  },
  winter: {
    name: 'Winter', atmosphere: 'calm',
    colors: { primary: '#2c5282', secondary: '#63b3ed', accent: '#b794f4', bg: '#f7fafc', surface: '#ffffff', text: '#1a202c', textLight: '#4a5568', border: '#e2e8f0' },
    typography: { heading: 'serif', body: 'serif', dropCap: true },
    decor: { divider: '❄️', particles: 'snow', particleColor: '#ffffff' },
  },
  academy: {
    name: 'Academy', atmosphere: 'warm',
    colors: { primary: '#722f37', secondary: '#2f4f2f', accent: '#8b6914', bg: '#faf3e0', surface: '#fef5e7', text: '#1a0f0a', textLight: '#4a3830', border: '#c4b59a' },
    typography: { heading: 'serif', body: 'serif', dropCap: true },
    decor: { divider: '📚', particles: 'none', particleColor: 'transparent' },
  },
  nature: {
    name: 'Nature', atmosphere: 'calm',
    colors: { primary: '#3d7a3d', secondary: '#6aaf6a', accent: '#c4a43e', bg: '#f5faf5', surface: '#ffffff', text: '#1a2a1a', textLight: '#4a5a4a', border: '#c4d4c4' },
    typography: { heading: 'serif', body: 'serif', dropCap: true },
    decor: { divider: '🌸', particles: 'fireflies', particleColor: '#a8e6a1' },
  },
  desert: {
    name: 'Desert', atmosphere: 'warm',
    colors: { primary: '#c4783a', secondary: '#e0a050', accent: '#8b4513', bg: '#fdf5e6', surface: '#fffaf0', text: '#2c1810', textLight: '#6b5030', border: '#d4c5a9' },
    typography: { heading: 'serif', body: 'serif', dropCap: true },
    decor: { divider: '🏜️', particles: 'none', particleColor: 'transparent' },
  },
  space: {
    name: 'Space', atmosphere: 'dark',
    colors: { primary: '#7b2ff7', secondary: '#4f2ee8', accent: '#00d4ff', bg: '#0a0a1a', surface: '#1a1a3a', text: '#e0e0ff', textLight: '#8888cc', border: '#2a2a5a' },
    typography: { heading: 'sans', body: 'sans', dropCap: true },
    decor: { divider: '🌌', particles: 'stars', particleColor: '#ffffff' },
  },
  celestial: {
    name: 'Celestial', atmosphere: 'calm',
    colors: { primary: '#6b3fa0', secondary: '#9b7fc0', accent: '#d4af37', bg: '#faf8ff', surface: '#ffffff', text: '#1a102a', textLight: '#4a385a', border: '#c4b5d4' },
    typography: { heading: 'serif', body: 'serif', dropCap: true },
    decor: { divider: '⭐', particles: 'stars', particleColor: '#d4af37' },
  },
  samurai: {
    name: 'Samurai', atmosphere: 'calm',
    colors: { primary: '#8b0000', secondary: '#c41e3a', accent: '#1a1a1a', bg: '#faf8f5', surface: '#ffffff', text: '#1a1a1a', textLight: '#5a5a5a', border: '#c4b5a9' },
    typography: { heading: 'serif', body: 'serif', dropCap: true },
    decor: { divider: '⚔️', particles: 'none', particleColor: 'transparent' },
  },
  ancient: {
    name: 'Ancient', atmosphere: 'warm',
    colors: { primary: '#8b6914', secondary: '#c4a43e', accent: '#4a3520', bg: '#faf3e0', surface: '#fef5e7', text: '#2c1810', textLight: '#6b5030', border: '#c4b59a' },
    typography: { heading: 'serif', body: 'serif', dropCap: true },
    decor: { divider: '🏛️', particles: 'none', particleColor: 'transparent' },
  },
  library: {
    name: 'Library', atmosphere: 'warm',
    colors: { primary: '#4a2c17', secondary: '#6b3f23', accent: '#8b6914', bg: '#faf3e0', surface: '#fef5e7', text: '#1a0f0a', textLight: '#4a3830', border: '#c4b59a' },
    typography: { heading: 'serif', body: 'serif', dropCap: true },
    decor: { divider: '📖', particles: 'none', particleColor: 'transparent' },
  },
};

export function getTheme(name) {
  return themes[name] || themes.forest;
}
