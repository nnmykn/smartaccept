import { createFileUploader, createDropzone } from '@solid-primitives/upload'
import { Component, ComponentProps, createEffect, createSignal, splitProps, Show } from 'solid-js'
import { css, styled, useTheme } from 'solid-styled-components'

import { Box } from '~/components/ui/box'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Select } from '~/components/ui/select'
import { useToast } from '~/components/ui/toast'
import { useUser } from '~/context/user'
import { useUserProfile, uploadIconFile } from '~/context/user-profile'
import { AppLayout } from '~/layouts/app-layout'
import { supabase } from '~/util/supabase/client'
import IconFile from '~icons/carbon/copy-file'

const Container = styled(Box)`
  margin: 1rem;
  border-radius: 1rem;

  input {
    width: 100%;
  }
`

const [isLoading, setIsLoading] = createSignal(false)

const IconUpload: Component<{
  onChange: (file: File) => void
}> = (props) => {
  const theme = useTheme()
  const [iconFile, setIconFile] = createSignal('')
  const { selectFiles } = createFileUploader({ accept: 'image/*' })
  const { setRef: dropzoneRef } = createDropzone({
    onDrop: async ([file]) => {
      if (file) {
        props.onChange(file.file)
        setIconFile(file.source)
      }
    },
  })

  return (
    <Box
      class={css`
        display: flex;
        width: 40%;
        flex-direction: column;
        align-items: center;
        gap: 1rem;

        img {
          width: 100px;
          height: 100px;
        }
      `}
    >
      <Box
        bg={theme.colors.background.string()}
        ref={dropzoneRef}
        onClick={() =>
          selectFiles(([file]) => {
            if (file) {
              props.onChange(file.file)
              setIconFile(file.source)
            }
          })
        }
        class={css`
          width: 100%;
          border: ${theme.colors.text.string()} solid 1px;
          border-radius: 0.5rem;
          color: ${theme.colors.text.fade(0.5).string()};
          cursor: pointer;
          text-align: center;
        `}
      >
        <IconFile height={75} width={75} />
        <p>アイコン画像をドロップ</p>
      </Box>
      <Show when={iconFile()}>
        <img src={iconFile()} alt="" />
      </Show>
    </Box>
  )
}

const InputItem: Component<
  {
    value: string
    onSave?: (value: string) => void
  } & Omit<ComponentProps<'input'>, 'value'>
> = (props) => {
  const [local, inputProps] = splitProps(props, ['onSave'])
  const [changing, setChanging] = createSignal(false)
  let inputRef: HTMLInputElement

  createEffect(() => {
    if (changing()) inputRef.focus()
    else local.onSave?.(inputRef.value)
  })

  return (
    <Box
      class={css`
        display: grid;
        align-items: center;
        gap: 1rem;
        grid-template-columns: 1fr 100px;
      `}
    >
      <Input
        {...inputProps}
        ref={inputRef!}
        disabled={!changing()}
        onKeyPress={(e) => {
          if (changing() && e.key === 'Enter') setChanging(false)
        }}
      />
      <Button
        loading={isLoading()}
        onClick={() => {
          setChanging(!changing())
        }}
      >
        {changing() ? '保存' : '変更'}
      </Button>
    </Box>
  )
}

export default function Account() {
  const user = useUser()
  const toast = useToast()
  const { userProfile, setUserProfile } = useUserProfile()
  const [email, setEmail] = createSignal(user.email || '')
  const [isCorp, setIsCorp] = createSignal(userProfile.iscorp)
  const [companyName, setCompanyName] = createSignal(userProfile.company_name || '')
  const [companyAddress, setCompanyAddress] = createSignal(userProfile.company_address || '')
  const [companyId, setCompanyId] = createSignal(userProfile.company_id || 0)
  const [companySize, setCompanySize] = createSignal(userProfile.company_size || 0)
  const [iconFile, setIconFile] = createSignal({} as File)

  createEffect(() => {
    if (
      userProfile.iscorp !== isCorp() ||
      userProfile.company_name !== companyName() ||
      userProfile.company_address !== companyAddress() ||
      userProfile.company_id !== companyId() ||
      userProfile.company_size !== companySize()
    ) {
      setIsLoading(true)
      setUserProfile({
        ...userProfile,
        iscorp: isCorp(),
        company_address: companyAddress(),
        company_name: companyName(),
        company_id: companyId(),
        company_size: companySize(),
      }).then(() => setIsLoading(false))
    }
  })

  return (
    <AppLayout>
      <h1>アカウント</h1>
      <p>このページからアカウントの管理を行うことができます。</p>
      <Container bg="white">
        <h2>アカウント設定</h2>
        <br />
        <p>メールアドレス</p>
        <InputItem value={email()} onSave={(value) => setEmail(value)} />
        <p>形式</p>
        <div
          class={css`
            display: flex;
            gap: 1rem;
            text-align: center;
          `}
        >
          <Select
            class={css`
              width: 86%;
              box-sizing: border-box;
              padding: 0.5rem;
              margin-left: 20px;
              background-color: white;
              font-size: 1rem;
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
        </div>
        <p>屋号・会社名</p>
        <InputItem value={companyName()} onSave={(value) => setCompanyName(value)} />
        <p>住所</p>
        <InputItem value={companyAddress()} onSave={(value) => setCompanyAddress(value)} />
        <p>法人番号</p>
        <InputItem
          type="number"
          value={`${companyId()}`}
          onSave={(value) => setCompanyId(parseInt(value))}
        />
        <p>従業員数</p>
        <InputItem
          type="number"
          value={`${companySize()}`}
          onSave={(value) => setCompanySize(parseInt(value))}
        />
        <p>アイコン画像</p>
        <div
          class={css`
            display: flex;
          `}
        >
          <IconUpload
            onChange={(file) => {
              setIconFile(file)
            }}
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
              const filename = await uploadIconFile(iconFile())
              const updates = {
                iscorp: isCorp(),
                company_address: companyAddress(),
                company_name: companyName(),
                company_id: companyId(),
                company_size: companySize(),
                icon_url: filename,
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
              setIsLoading(false)
            }}
          >
            変更
          </Button>
        </div>
      </Container>
    </AppLayout>
  )
}
