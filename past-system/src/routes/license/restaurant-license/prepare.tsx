import { Link } from '@solidjs/router'
import { Component, ComponentProps, createEffect, createSignal, splitProps } from 'solid-js'
import { css, styled } from 'solid-styled-components'

import { Box } from '~/components/ui/box'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Select } from '~/components/ui/select'
import { AppLayout } from '~/layouts/app-layout'

const Container = styled.div`
  width: 100%;
  padding: 1.5rem;
  margin-top: 1rem;
  margin-bottom: 2rem;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 4px #4385bb12;
  color: #000000d1;
  font-family: -apple-system, BlinkMacSystemFont, 'Hiragino Kaku Gothic ProN', 'Hiragino Sans',
    Meiryo, sans-serif, 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  font-size: 16px;
  gap: 1rem;
  line-height: 1.9;
  list-style: disc;

  h3 {
    margin-top: 1.5rem;
  }

  ol {
    margin-left: 1.5rem;
    list-style: decimal;

    li {
      color: #5e6478;
      font-size: 1.1em;

      p {
        color: #000000d1;
      }
    }
  }

  ul {
    margin-left: 1.5rem;
    list-style: disc;

    li {
      color: #5e6478;
      font-size: 1.1em;

      p {
        color: #000000d1;
      }
    }
  }
`

const [isLoading, setIsLoading] = createSignal(false)

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
        display: flex;
        align-items: center;
        padding: 0;
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
        class={css`
          width: auto;
          margin: 0;
          white-space: nowrap;
        `}
      >
        {changing() ? '保存' : '変更'}
      </Button>
    </Box>
  )
}

const InputDay: Component<
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
        display: flex;
        align-items: center;
        padding: 0;
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
        class={css`
          width: auto;
          margin: 0;
          white-space: nowrap;
        `}
      >
        {changing() ? '保存' : '変更'}
      </Button>
    </Box>
  )
}

export default function Prepare() {
  const [shopAddress, setShopAddress] = createSignal('')
  const [applicantName, setApplicantName] = createSignal('')
  const [applicantNameFurigana, setApplicantNameFurigana] = createSignal('')
  const [applicantAddress, setApplicantAddress] = createSignal('')
  const [applicantBirth, setApplicantBirth] = createSignal('')
  const [shopTel, setShopTel] = createSignal('')
  const [shopName, setShopName] = createSignal('')
  const [foodManagerName, setFoodManagerName] = createSignal('')
  const [foodManagerLicense, setFoodManagerLicense] = createSignal('')
  const [foodManagerLicenseDate, setFoodManagerLicenseDate] = createSignal('')
  const [foodManagerLicenseNumber, setFoodManagerLicenseNumber] = createSignal('')
  return (
    <AppLayout>
      <h1>必要な情報を入力</h1>
      <p>必要な情報を入力してこれから営業に必要な資格や書類を確認していきましょう！</p>
      <p>入力された内容を元に書類が自動で作成されます。</p>
      <Container>
        <h2>
          <img src="https://twemoji.maxcdn.com/2/svg/1f58a.svg" width="22px" />
          情報の入力
        </h2>
        <div>
          <h3>
            <img src="https://twemoji.maxcdn.com/2/svg/1f3e0.svg" width="18px" />
            申請者情報
          </h3>
          <p>氏名</p>
          <InputItem
            placeholder="二宮貫"
            value={applicantName()}
            onSave={(value) => setApplicantName(value)}
          />
          <p>氏名(フリガナ)</p>
          <InputItem
            placeholder="ニノミヤカン"
            value={applicantNameFurigana()}
            onSave={(value) => setApplicantNameFurigana(value)}
          />
          <p>住所</p>
          <InputItem
            placeholder="東京都墨田区押上１丁目１−２"
            value={applicantAddress()}
            onSave={(value) => setApplicantAddress(value)}
          />
          <p>誕生日</p>
          <InputDay
            type="date"
            value={applicantBirth()}
            onSave={(value) => setApplicantBirth(value)}
          />
          <h3>
            <img src="https://twemoji.maxcdn.com/2/svg/1f4c3.svg" width="18px" />
            営業所情報
          </h3>
          <p>営業所の所在地</p>
          <InputItem
            placeholder="東京都墨田区押上１丁目１−２"
            value={shopAddress()}
            onSave={(value) => setShopAddress(value)}
          />
          <p>電話番号</p>
          <InputItem
            placeholder="070-8382-3331"
            value={shopTel()}
            onSave={(value) => setShopTel(value)}
          />
          <p>営業所の名称等</p>
          <InputItem
            placeholder="うまうま弁当"
            value={shopName()}
            onSave={(value) => setShopName(value)}
          />
          <h3>
            <img src="https://twemoji.maxcdn.com/2/svg/1f373.svg" width="18px" />
            食品衛生責任者
          </h3>
          <p>氏名</p>
          <InputItem
            placeholder="松尾典珂"
            value={foodManagerName()}
            onSave={(value) => setFoodManagerName(value)}
          />
          <p>資格</p>

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
              value={foodManagerLicense()}
              items={[
                {
                  key: '栄養士',
                  label: '栄養士',
                },
                {
                  key: '調理師',
                  label: '調理師',
                },
                {
                  key: '製菓衛生師',
                  label: '製菓衛生師',
                },
                {
                  key: '食鳥処理衛生管理者',
                  label: '食鳥処理衛生管理者',
                },
                {
                  key: '船舶料理士',
                  label: '船舶料理士',
                },
                {
                  key: '食品衛生管理者',
                  label: '食品衛生管理者',
                },
                {
                  key: '食品衛生監視員',
                  label: '食品衛生監視員',
                },
                {
                  key: '養成講習会受講者',
                  label: '養成講習会受講者',
                },
                {
                  key: '補充講習会受講者',
                  label: '補充講習会受講者',
                },
              ]}
              onChange={(item) => {
                setFoodManagerLicense(item.label)
              }}
            />
          </div>
          <p>取得日</p>
          <InputDay
            type="date"
            value={foodManagerLicenseDate()}
            onSave={(value) => setFoodManagerLicenseDate(value)}
          />
          <p>登録番号</p>
          <InputItem
            placeholder="1234567890"
            value={foodManagerLicenseNumber()}
            onSave={(value) => setFoodManagerLicenseNumber(value)}
          />
        </div>
        <Link href="/license/restaurant-license/establish">
          <Button>資格と書類を用意</Button>
        </Link>
      </Container>
    </AppLayout>
  )
}
