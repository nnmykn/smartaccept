import { styled } from 'solid-styled-components'

export const Progress = styled.progress`
  appearance: none;

  &::-webkit-progress-bar {
    background-color: gray;
    border-radius: 0.25rem;
  }

  &::-webkit-progress-value {
    background-color: ${(p) => p.theme?.colors.sub.string()};
    border-radius: 0.25rem;
  }
`
