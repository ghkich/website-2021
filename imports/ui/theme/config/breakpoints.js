export const DUO_SCREEN_M = `(screen-spanning: single-fold-horizontal)`
export const MAX_WIDTH_DESKTOP_S = `(max-width: 1150px)`
export const MAX_WIDTH_TABLET_L = `(max-width: 1024px)`
export const MAX_WIDTH_TABLET_M = `(max-width: 898px)`
export const MAX_WIDTH_TABLET_S = `(max-width: 800px)`
export const MAX_WIDTH_MOBILE_L = `(max-width: 720px)`
export const MAX_WIDTH_MOBILE_M = `(max-width: 540px)`
export const MAX_WIDTH_MOBILE_S = `(max-width: 424px)`
export const MAX_WIDTH_MOBILE_XS = `(max-width: 320px)`

export default {
  DUO_SCREEN_M: `@media ${DUO_SCREEN_M}`,
  DESKTOP_S: `@media ${MAX_WIDTH_DESKTOP_S}`,
  TABLET_L: `@media ${MAX_WIDTH_TABLET_L}`,
  TABLET_M: `@media ${MAX_WIDTH_TABLET_M}`,
  TABLET_S: `@media ${MAX_WIDTH_TABLET_S}`,
  MOBILE_L: `@media ${MAX_WIDTH_MOBILE_L}`,
  MOBILE_M: `@media ${MAX_WIDTH_MOBILE_M}`,
  MOBILE_S: `@media ${MAX_WIDTH_MOBILE_S}`,
  MOBILE_XS: `@media ${MAX_WIDTH_MOBILE_XS}`,
}
