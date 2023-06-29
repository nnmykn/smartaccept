import type { Component } from 'solid-js'
import { styled } from 'solid-styled-components'

import IconSearch from '~icons/carbon/search'

const Container = styled.div`
  display: flex;
  width: 80%;
  height: 80%;
  align-items: center;
  justify-content: center;
  padding: 0.75rem;
  background-color: ${(p) => p.theme?.colors.main.fade(0.8).string()};
  border-radius: 1rem;
  gap: 1rem;

  input {
    width: 100%;
    border: none;
    background-color: transparent;
    font-size: 1rem;
    outline: none;
  }
`

export const Search: Component = () => {
  return (
    <Container>
      <IconSearch />
      <input placeholder="SmartAccept内を検索" />
    </Container>
  )
}
