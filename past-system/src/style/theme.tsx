import Color from 'color'
import type { DefaultTheme } from 'solid-styled-components'

import { MediaBreakpoints } from './media'

export const theme: DefaultTheme = {
  colors: {
    main: Color('#00CCCC'),
    sub: Color('#00B3B3'),
    text: Color('#333333'),
    background: Color('#DFEEEE'),
  },
  media: {
    breakpoints: {
      md: `@media ${MediaBreakpoints.md}`,
      lg: `@media ${MediaBreakpoints.lg}`,
      xl: `@media ${MediaBreakpoints.xl}`,
    },
  },
}

declare module 'solid-styled-components' {
  export interface DefaultTheme {
    colors: {
      main: Color
      sub: Color
      text: Color
      background: Color
    }
    media: {
      breakpoints: {
        md: string
        lg: string
        xl: string
      }
    }
  }
}
