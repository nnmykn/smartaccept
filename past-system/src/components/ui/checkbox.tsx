import type { Component, JSX } from 'solid-js'
import { styled } from 'solid-styled-components'

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  user-select: none;
`

const StyledCheckbox = styled.input`
  width: 1.25rem;
  height: 1.25rem;
`

export const Checkbox: Component<{
  isChecked: boolean
  onChange?: (checked: boolean) => void
  children: JSX.Element
}> = (props) => {
  return (
    <Container>
      <StyledCheckbox
        type="checkbox"
        checked={props.isChecked}
        onChange={(e) => props.onChange?.(e.currentTarget.checked)}
      />
      {props.children}
    </Container>
  )
}
