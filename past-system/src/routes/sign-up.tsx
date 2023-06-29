import { Link } from '@solidjs/router'
import { createSignal, onMount } from 'solid-js'
import { css, styled } from 'solid-styled-components'

import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { useModal } from '~/components/ui/modal'
import { VStack } from '~/components/ui/stack'
import { useToast } from '~/components/ui/toast'
import { supabase } from '~/util/supabase/client'

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
          アカウントを作成
        </h1>
        <p
          class={css`
            font-size: 14px;
            text-align: center;
          `}
        >
          メールアドレスを入力することで
          <br />
          アカウントを登録することが出来ます
        </p>
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
            if (error)
              toast({
                title: error.name,
                description: error.message,
                status: 'error',
                duration: 1000 * 10,
                isClosable: true,
              })
            else
              modal({
                title: '登録リンクをメールにて送信しました。',
                description: '受け取ったリンクをクリックすると登録できます。',
              })
            setIsLoading(false)
          }}
        >
          作成
        </Button>
        <Link
          class={css`
            margin-top: 10px;
          `}
          href={`/sign`}
        >
          代わりにログイン
        </Link>
      </VStack>
    </Container>
  )
}
