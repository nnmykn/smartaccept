import { Component, createContext, createSignal, JSX, Show, useContext } from 'solid-js'
import { createStore } from 'solid-js/store'
import { styled } from 'solid-styled-components'

import { Box } from './box'
import { Button } from './button'

const ModalContainer = styled.div<{ show: boolean }>`
  position: fixed;
  z-index: 10;
  display: flex;
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: center;
  opacity: ${(p) => (p.show ? '1' : '0')};
  pointer-events: ${(p) => (p.show ? 'auto' : 'none')};
  transform: scale(${(p) => (p.show ? '1' : '0.8')});
  transition: 0.2s ease-out;
`

const Modal = styled(Box)`
  display: flex;
  min-width: 480px;
  max-width: 600px;
  flex-wrap: wrap;
  padding: 30px;
  animation-duration: 0.5s;
  animation-name: fade-in;
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 0 12px -6px rgba(0, 0, 0, 0.6);
  gap: 1rem;
  grid-template-rows: 1fr 50px;

  h1 {
    font-size: 23px;
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }
`

type ModalOption = {
  title?: string
  description?: string
  render?: (close: () => void) => JSX.Element
}

const ModalContext = createContext((option: ModalOption) => {})

export const ModalProvider: Component<{ children: JSX.Element }> = (props) => {
  const [isOpen, setIsOpen] = createSignal(false)
  const [option, setOption] = createStore({} as ModalOption)

  const open = (option: ModalOption) => {
    setOption(option)
    setIsOpen(true)
  }

  return (
    <ModalContext.Provider value={open}>
      <ModalContainer show={isOpen()}>
        <Show
          when={option.render}
          fallback={
            <Modal>
              <div>
                <h1>{option.title}</h1>
                <p>{option.description}</p>
              </div>
              <Button onClick={() => setIsOpen(false)}>閉じる</Button>
            </Modal>
          }
        >
          {option.render?.(() => setIsOpen(false))}
        </Show>
      </ModalContainer>
      {props.children}
    </ModalContext.Provider>
  )
}

export const useModal = () => useContext(ModalContext)
