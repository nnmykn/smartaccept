import {
  Component,
  createContext,
  createEffect,
  createSignal,
  For,
  JSX,
  Match,
  Show,
  Switch,
  useContext,
} from 'solid-js'
import { createStore } from 'solid-js/store'
import { css, styled, useTheme } from 'solid-styled-components'

import { Box } from './box'

import IconCheck from '~icons/carbon/checkmark-outline'
import IconClose from '~icons/carbon/close'
import IconError from '~icons/carbon/error'
import IconInfo from '~icons/carbon/information'

type ToastOption = {
  status: 'success' | 'error' | 'info'
  title: string
  description: string
  duration: number
  isClosable: boolean
}

const ToastContext = createContext((option: ToastOption) => {})

const ToastContainer = styled.div`
  position: fixed;
  left: 0;
  display: flex;
  height: 100vh;
  flex-direction: column-reverse;
  padding: 1rem;
  gap: 1rem;
`

const Toast: Component<
  ToastOption & {
    onHide: () => void
  }
> = (props) => {
  const theme = useTheme()
  const [hide, setHide] = createSignal(false)

  const hideToast = () => {
    setHide(true)
    setTimeout(() => props.onHide(), 500)
  }

  createEffect(() => {
    setTimeout(() => hideToast(), props.duration)
  })

  return (
    <Box
      class={css`
        display: grid;
        min-width: 300px;
        align-items: center;
        background-color: white;
        border-radius: 0.5rem;
        box-shadow: 0 0 16px -6px rgba(0, 0, 0, 0.6);
        gap: 0.25rem;
        grid-template-columns: 50px 1fr 25px;
        grid-template-rows: 1fr 1fr;
        opacity: ${hide() ? '0' : '1'};
        transition: 0.5s;

        h1 {
          font-size: 1.5rem;
        }
      `}
    >
      <div
        class={css`
          grid-row: 1/3;

          svg {
            width: 100%;
            height: 100%;
          }
        `}
      >
        <Switch>
          <Match when={props.status === 'error'}>
            <IconError />
          </Match>
          <Match when={props.status === 'success'}>
            <IconCheck />
          </Match>
          <Match when={props.status === 'info'}>
            <IconInfo />
          </Match>
        </Switch>
      </div>
      <div
        class={css`
          grid-row: 1/3;
        `}
      >
        <h1>{props.title}</h1>
        <p>{props.description}</p>
      </div>
      <Show when={props.isClosable}>
        <div
          class={css`
            border-radius: 0.25rem;
            grid-column: 3/4;

            svg {
              width: 100%;
              height: 100%;
              vertical-align: top;
            }

            &:hover {
              background-color: ${theme.colors.background.string()};
            }
          `}
          onClick={() => hideToast()}
        >
          <IconClose />
        </div>
      </Show>
    </Box>
  )
}

export const ToastProvider: Component<{ children: JSX.Element }> = (props) => {
  const [toasts, setToasts] = createStore<
    (ToastOption & {
      created_at: number
    })[]
  >([])

  const createToast = (option: ToastOption) => {
    const created_at = new Date().getTime()
    setToasts((prev) => [{ ...option, created_at }, ...prev])
  }

  return (
    <>
      <ToastContainer>
        <For each={toasts}>
          {(option) => (
            <Toast
              {...option}
              onHide={() =>
                setToasts((prev) => prev.filter((toast) => toast.created_at !== option.created_at))
              }
            />
          )}
        </For>
      </ToastContainer>
      <ToastContext.Provider value={createToast}>{props.children}</ToastContext.Provider>
    </>
  )
}

export const useToast = () => useContext(ToastContext)
