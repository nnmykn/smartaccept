import type { ComponentProps } from 'solid-js'
import { styled } from 'solid-styled-components'

import { Box } from './box'

export const HStack = styled<
  ComponentProps<typeof Box> & {
    gap?: string | number
  }
>(Box)`
  display: flex;
  align-items: center;
  gap: ${(p) => p.gap || '0.5rem'};
`

export const VStack = styled(HStack)`
  flex-direction: column;
`
