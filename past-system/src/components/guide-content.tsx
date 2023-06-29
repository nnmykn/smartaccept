import { Component, ComponentProps, createSignal, splitProps } from 'solid-js'
import { css, styled } from 'solid-styled-components'

type Props = {
  title: string
  number?: string
  description?: string
  isFinished?: boolean
}

const Container = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
  box-sizing: border-box;
  align-items: center;
  padding: 0.5rem;
  margin: 15px;
  background-color: transparent;
  border-radius: 1.25rem;
  box-shadow: 0 0 12px #0e3e6612;
  color: ${(p) => p.theme?.colors.text.string()};
  cursor: pointer;
  transition: 0.15s;
`

export const GuideContent: Component<Props & Omit<ComponentProps<'div'>, 'onChange'>> = (props) => {
  const [local, others] = splitProps(props, ['title', 'number', 'description', 'isFinished'])
  const [opened, setOpened] = createSignal(false)
  const [isFinished, setIsFinished] = createSignal(false)
  setIsFinished(local.isFinished)

  return (
    <Container {...others}>
      {isFinished() ? '✔ 終了済み' : ''}
      <div
        class={css`
          display: flex;
          width: 100%;
          height: 80px;
          box-sizing: border-box;
          align-items: center;
          padding: 0.5rem;
          border: none;
          background-color: white;
          border-radius: 1.25rem;
          font-size: 1rem;
          outline: none;

          &:hover {
            background-color: #4385bb12;
            cursor: pointer;
          }
        `}
        onClick={() => setOpened(!opened())}
      >
        <div
          class={css`
            width: 3rem;
            height: 3rem;
            background-color: #00b3b3;
            border-radius: 25%;
            color: white;
            font-weight: bold;
            line-height: 3rem;
            text-align: center;
          `}
        >
          {local.number}
        </div>
        <div
          class={css`
            margin-left: 1rem;
            line-height: 1.5;

            p {
              color: #535353;
              font-size: 0.9rem;
            }
          `}
        >
          <h3>{local.title}</h3>
          <p>{local.description}</p>
        </div>
      </div>
      <div
        class={css`
          overflow: hidden;
          height: ${opened() ? 'auto' : 0};
          padding: ${opened() ? '10px 0' : 0};
          opacity: ${opened() ? 1 : 0};
          transition: 0.8s;
        `}
      >
        {props.children}
      </div>
    </Container>
  )
}
