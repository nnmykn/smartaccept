import type { Component } from 'solid-js'
import { styled } from 'solid-styled-components'

import { Spinner } from './ui/spinner'

const Container = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`

export const Fallback: Component = () => {
  return (
    <Container>
      <h1>ロード中...</h1>
      <Spinner />
    </Container>
  )
}
