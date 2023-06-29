import type { Component, JSX } from 'solid-js'
import { styled } from 'solid-styled-components'

const StyledCard = styled.div`
  display: grid;
  overflow: hidden;
  width: 320px;
  min-height: 480px;
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 2px 4px #4385bb12;
`

export const CardBody = styled.div`
  padding: 1rem;
  background-color: white;
  grid-row: 2 / 3;
`

export const CardImage = styled.div`
  grid-row: 1 / 2;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    vertical-align: top;
  }
`

export const Card: Component<{ children: JSX.Element }> = (props) => {
  return <StyledCard>{props.children}</StyledCard>
}
