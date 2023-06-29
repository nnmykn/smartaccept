import { Component, ComponentProps, Show, splitProps } from 'solid-js'
import { css, styled } from 'solid-styled-components'

import { Spinner } from './spinner'

const StyledButton = styled.button`
  position: relative;
  padding: 0.75rem 1.5rem;
  border: none;
  margin: 0.5rem;
  background-color: ${(p) => p.theme?.colors.main.fade(0.8).string()};
  border-radius: 1rem;
  color: ${(p) => p.theme?.colors.text.string()};
  cursor: pointer;
  font-size: medium;
  font-weight: bold;
  outline: none;
  text-align: center;
  text-decoration: none;
  transition: 0.2s;

  &:hover {
    background-color: ${(p) => p.theme?.colors.main.fade(0.9).string()};
  }
`

const Inner = styled.div`
  width: 100%;
  height: 100%;
`

const SpinnerWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`

export const Button: Component<
  ComponentProps<typeof StyledButton> & {
    loading?: boolean
  }
> = (props) => {
  const [local, others] = splitProps(props, ['children'])
  return (
    <StyledButton {...others}>
      <Show when={others.loading}>
        <SpinnerWrapper>
          <Spinner radius={`60%`} stroke="2.5px" />
        </SpinnerWrapper>
      </Show>
      <Inner
        class={css`
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: ${others.loading ? '0' : '1'};
        `}
      >
        {local.children}
      </Inner>
    </StyledButton>
  )
}
