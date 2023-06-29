import { styled } from 'solid-styled-components'

export const Input = styled.input`
  display: inline-block;
  width: 100%;
  box-sizing: border-box;
  padding: 0.5rem;
  border: none;
  border-bottom: 1px solid ${(p) => p.theme?.colors.text.string()};
  background-color: white;
  color: ${(p) => (p.disabled ? p.theme?.colors.text.fade(0.25) : p.theme?.colors.text)?.string()};
  font-size: 1rem;
  outline: none;
`
