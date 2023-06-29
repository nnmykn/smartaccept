import { createSignal } from 'solid-js'
import { css, styled } from 'solid-styled-components'

import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Select } from '~/components/ui/select'
import { VStack } from '~/components/ui/stack'
import { useToast } from '~/components/ui/toast'
import { supabase } from '~/util/supabase/client'

const Container = styled.div`
  display: flex;
  overflow: scroll;
  height: 100vh;
  align-items: center;
  justify-content: center;
  background-color: ${(p) => p.theme?.colors.background.string()};
  gap: 0.75rem;
`
export default function Setup() {
  const toast = useToast()
  const [isLoading, setIsLoading] = createSignal(false)
  const [isCorp, setIsCorp] = createSignal<boolean>(false) //法人ならTrue個人ならFalse
  const [companyName, setCompanyName] = createSignal('')
  const [companyAddress, setCompanyAddress] = createSignal('')
  const [companyId, setCompanyId] = createSignal<number>()
  const [companySize, setCompanySize] = createSignal<number>()
  return (
    <Container>
      <VStack
        bg="white"
        padding="30px 50px"
        class={css`
          width: 850px;
          height: auto;
          border: 1px solid #ccc;
          border-radius: 1rem;

          input {
            width: 60%;
          }
        `}
      >
        <h1>SmartAcceptへようこそ🎉</h1>
        <h2>はじめに、いくつかの基本事項から設定していきましょう</h2>
        <p>法人または個人を選択してください</p>
        <Select
          class={css`
            width: 60%;
          `}
          value={isCorp() ? 'true' : 'false'}
          items={[
            {
              key: 'true',
              label: '法人',
            },
            {
              key: 'false',
              label: '個人',
            },
          ]}
          onChange={(item) => {
            setIsCorp(item.key === 'true')
          }}
        />
        <Input
          placeholder="会社名"
          value={companyName()}
          onInput={(e) => setCompanyName(e.currentTarget.value)}
        />
        <Input
          placeholder="住所"
          value={companyAddress()}
          onInput={(e) => setCompanyAddress(e.currentTarget.value)}
        />
        <Input
          type="number"
          placeholder="法人番号"
          value={companyId() || ''}
          onInput={(e) => setCompanyId(parseInt(e.currentTarget.value))}
        />
        <Input
          type="number"
          placeholder="従業員数"
          value={companySize() || ''}
          onInput={(e) => setCompanySize(parseInt(e.currentTarget.value))}
        />
        <Button
          loading={isLoading()}
          onClick={async () => {
            setIsLoading(true)
            const { data } = await supabase.auth.getUser()
            if (!data.user)
              return toast({
                title: 'ユーザーの取得に失敗しました。',
                description: 'ログインからやり直してください。',
                status: 'error',
                duration: 1000 * 10,
                isClosable: true,
              })
            const updates = {
              iscorp: isCorp(),
              company_address: companyAddress(),
              company_name: companyName(),
              company_id: companyId(),
              company_size: companySize(),
              id: data.user.id,
              updated_at: new Date(),
            }

            const { error } = await supabase.from('profiles').upsert(updates)
            if (error)
              toast({
                title: error.message,
                description: error.details,
                status: 'error',
                duration: 1000 * 10,
                isClosable: true,
              })
            else window.location.href = '/'
            setIsLoading(false)
          }}
        >
          はじめる
        </Button>
        <Button
          onClick={async () => {
            await supabase.auth.signOut()
            window.location.href = '/sign'
          }}
        >
          ログアウト
        </Button>
      </VStack>
    </Container>
  )
}
