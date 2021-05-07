const getLightAlpha = (opacity) => `rgba(255,255,255, ${opacity})`
const getDarkAlpha = (opacity) => `rgba(0,0,0, ${opacity})`

export default {
  PRIMARY: 'var(--color-primary)',
  LIGHT_PRIMARY: 'var(--color-light-primary)',
  WHITE_PRIMARY: 'var(--color-white-primary)',
  SECONDARY: 'var(--color-secondary)',
  LIGHT_SECONDARY: 'var(--color-light-secondary)',
  WHITE_SECONDARY: 'var(--color-white-secondary)',
  TEXT: 'var(--color-text)',
  LIGHT_TEXT: 'var(--color-light-text)',
  WHITE_TEXT: 'var(--color-white-text)',
  BG_GRADIENT_1: 'var(--color-bg-gradient-1)',
  BG_GRADIENT_2: 'var(--color-bg-gradient-2)',
  BG_GRADIENT_3: 'var(--color-bg-gradient-3)',
  BG_GRADIENT_4: 'var(--color-bg-gradient-4)',
  lightAlpha: (opacity) => getLightAlpha(opacity),
  darkAlpha: (opacity) => getDarkAlpha(opacity),
}
