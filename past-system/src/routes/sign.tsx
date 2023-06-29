import { Link } from '@solidjs/router'
import { createSignal, onMount } from 'solid-js'
import { css, styled } from 'solid-styled-components'

import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { useModal } from '~/components/ui/modal'
import { VStack } from '~/components/ui/stack'
import { useToast } from '~/components/ui/toast'
import { supabase } from '~/util/supabase/client'
import { translateError } from '~/util/supabase/error'

const Container = styled.div`
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
  background-color: ${(p) => p.theme?.colors.background.string()};
  gap: 0.75rem;
`

const isLoggedIn = async () => {
  const { data } = await supabase.auth.getUser()
  return !!data.user
}

export default function Sign() {
  const modal = useModal()
  const toast = useToast()
  const [isLoading, setIsLoading] = createSignal(false)
  const [email, setEmail] = createSignal('')

  onMount(async () => {
    if (await isLoggedIn()) window.location.replace('/')
  })

  return (
    <Container>
      <VStack
        bg="white"
        padding="30px 50px"
        class={css`
          border: 1px solid #ccc;
          border-radius: 10px;
        `}
      >
        <Link href={`/sign`}>
          <img src="/assets/images/smartaccept-logo.svg" alt="logo" width="185px" />
        </Link>
        <h1
          class={css`
            font-size: 23px;
          `}
        >
          ログイン
        </h1>
        <Input
          type="email"
          placeholder="メールアドレス"
          value={email()}
          onInput={(e) => setEmail(e.currentTarget.value)}
          onKeyPress={(e) => {
            if (e.key == 'Enter') {
              e.preventDefault()
              document.getElementById('sign')?.click()
            }
          }}
        />
        <Button
          class={css`
            margin: 15px;
          `}
          loading={isLoading()}
          id="sign"
          onClick={async () => {
            if (!email())
              return toast({
                title: 'メールアドレスが空です。',
                description: '',
                status: 'error',
                duration: 1000 * 3,
                isClosable: true,
              })
            setIsLoading(true)
            const { error } = await supabase.auth.signInWithOtp({ email: email() })
            if (error) {
              const translated = translateError(error)
              toast({
                title: translated.title,
                description: translated.message,
                status: 'error',
                duration: 1000 * 10,
                isClosable: true,
              })
            } else
              modal({
                title: 'ログインリンクをメールにて送信しました。',
                description: '受け取ったリンクをクリックするとログインできます。',
              })
            setIsLoading(false)
          }}
        >
          ログイン
        </Button>
        <Link
          class={css`
            margin-top: 10px;
          `}
          href={`/sign-up`}
        >
          アカウントを作成
        </Link>
      </VStack>
    </Container>
  )
}
