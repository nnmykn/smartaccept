import { styled } from 'solid-styled-components'

export const Box = styled.div<{
  padding?: string
  bg?: string
}>`
  padding: ${(p) => p.padding || '0.75rem 1.25rem'};
  background-color: ${(p) => p.bg || 'inherit'};
`
