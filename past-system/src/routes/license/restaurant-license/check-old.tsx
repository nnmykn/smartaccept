import { Link } from '@solidjs/router'
import { createSignal } from 'solid-js'
import { css, styled } from 'solid-styled-components'

import { Button } from '~/components/ui/button'
import { useModal } from '~/components/ui/modal'
import { Select } from '~/components/ui/select'
import { AppLayout } from '~/layouts/app-layout'

const Container = styled.div`
  width: 100%;
  padding: 1.5rem;
  margin-top: 1rem;
  margin-bottom: 2rem;
  background-color: white;
  border-radius: 10px;
  color: #000000d1;
  font-family: -apple-system, BlinkMacSystemFont, 'Hiragino Kaku Gothic ProN', 'Hiragino Sans',
    Meiryo, sans-serif, 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  font-size: 16px;
  gap: 1rem;
  line-height: 1.9;
  list-style: disc;

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
export default function CheckOld() {
  const modal = useModal()
  const [isLoading, setIsLoading] = createSignal(false)
  const [isOver30People, setIsOver30People] = createSignal(false)
  const [isOver300m, setIsOver300m] = createSignal(false)
  const [isCorp, setIsCorp] = createSignal(false)
  const [isUseTank, setIsUseTank] = createSignal(false)
  return (
    <AppLayout>
      <h1>必要な資格や書類を確認</h1>
      <p>これから営業に必要な資格や書類を確認していきましょう！</p>
      <Container>
        <h2>
          <img
            src="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/2753.svg"
            width="22px"
          />
          質問に答えてください
        </h2>
        <p>店舗の収容人数は30人以上ですか？(従業員含む)</p>
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
            value={isOver30People() ? 'true' : 'false'}
            items={[
              {
                key: 'true',
                label: 'はい',
              },
              {
                key: 'false',
                label: 'いいえ',
              },
            ]}
            onChange={(item) => {
              setIsOver30People(item.key === 'true')
            }}
          />
        </div>

        <p>店舗の延べ面積は300㎡以上ですか？</p>
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
            value={isOver300m() ? 'true' : 'false'}
            items={[
              {
                key: 'true',
                label: 'はい',
              },
              {
                key: 'false',
                label: 'いいえ',
              },
            ]}
            onChange={(item) => {
              setIsOver300m(item.key === 'true')
            }}
          />
        </div>
        <p>法人として申請しますか？</p>
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
                label: 'はい',
              },
              {
                key: 'false',
                label: 'いいえ',
              },
            ]}
            onChange={(item) => {
              setIsCorp(item.key === 'true')
            }}
          />
        </div>
        <p>貯水槽や井戸水を利用しますか？</p>
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
            value={isUseTank() ? 'true' : 'false'}
            items={[
              {
                key: 'true',
                label: 'はい',
              },
              {
                key: 'false',
                label: 'いいえ',
              },
            ]}
            onChange={(item) => {
              setIsUseTank(item.key === 'true')
            }}
          />
        </div>
        <Button
          loading={isLoading()}
          onClick={() => {
            setIsLoading(true)
            {
              // TODO 条件分岐を綺麗にする
              if (isOver30People() && isOver300m() && isCorp() && isUseTank()) {
                modal({
                  title: 'これらの資格・書類が必要です。',
                  description:
                    '食品衛生責任者資格、防火管理者資格(甲種防火管理者)、飲食店営業許可申請書、場所の見取り図、営業設備の大要・配置図、内装の配置の平面図、水質検査成績書、登記事項証明書',
                })
              } else if (isOver30People() && isOver300m() && isCorp()) {
                modal({
                  title: 'これらの資格・書類が必要です。',
                  description:
                    '食品衛生責任者資格、防火管理者資格(甲種防火管理者)、飲食店営業許可申請書、場所の見取り図、営業設備の大要・配置図、内装の配置の平面図、登記事項証明書',
                })
              } else if (isOver30People() && isOver300m() && isUseTank()) {
                modal({
                  title: 'これらの資格・書類が必要です。',
                  description:
                    '食品衛生責任者資格、防火管理者資格(甲種防火管理者)、飲食店営業許可申請書、場所の見取り図、営業設備の大要・配置図、内装の配置の平面図、水質検査成績書',
                })
              } else if (isOver30People() && isCorp() && isUseTank()) {
                modal({
                  title: 'これらの資格・書類が必要です。',
                  description:
                    '食品衛生責任者資格、防火管理者資格(乙種防火管理者)、飲食店営業許可申請書、場所の見取り図、営業設備の大要・配置図、内装の配置の平面図、水質検査成績書、登記事項証明書',
                })
              } else if (isOver300m() && isCorp() && isUseTank()) {
                modal({
                  title: 'これらの資格・書類が必要です。',
                  description:
                    '食品衛生責任者資格、飲食店営業許可申請書、場所の見取り図、営業設備の大要・配置図、内装の配置の平面図、水質検査成績書、登記事項証明書',
                })
              } else if (isOver30People() && isOver300m()) {
                modal({
                  title: 'これらの資格・書類が必要です。',
                  description:
                    '食品衛生責任者資格、防火管理者資格(甲種防火管理者)、飲食店営業許可申請書、場所の見取り図、営業設備の大要・配置図、内装の配置の平面図',
                })
              } else if (isOver30People() && isCorp()) {
                modal({
                  title: 'これらの資格・書類が必要です。',
                  description:
                    '食品衛生責任者資格、防火管理者資格(乙種防火管理者)、飲食店営業許可申請書、場所の見取り図、営業設備の大要・配置図、内装の配置の平面図、登記事項証明書',
                })
              } else if (isOver30People() && isUseTank()) {
                modal({
                  title: 'これらの資格・書類が必要です。',
                  description:
                    '食品衛生責任者資格、防火管理者資格(乙種防火管理者)、飲食店営業許可申請書、場所の見取り図、営業設備の大要・配置図、内装の配置の平面図、水質検査成績書',
                })
              } else if (isOver300m() && isCorp()) {
                modal({
                  title: 'これらの資格・書類が必要です。',
                  description:
                    '食品衛生責任者資格、飲食店営業許可申請書、場所の見取り図、営業設備の大要・配置図、内装の配置の平面図、登記事項証明書',
                })
              } else if (isOver300m() && isUseTank()) {
                modal({
                  title: 'これらの資格・書類が必要です。',
                  description:
                    '食品衛生責任者資格、飲食店営業許可申請書、場所の見取り図、営業設備の大要・配置図、内装の配置の平面図、水質検査成績書',
                })
              } else if (isCorp() && isUseTank()) {
                modal({
                  title: 'これらの資格・書類が必要です。',
                  description:
                    '食品衛生責任者資格、飲食店営業許可申請書、場所の見取り図、営業設備の大要・配置図、内装の配置の平面図、水質検査成績書',
                })
              } else if (isOver30People()) {
                modal({
                  title: 'これらの資格・書類が必要です。',
                  description:
                    '食品衛生責任者資格、防火管理者資格(乙種防火管理者)、飲食店営業許可申請書、場所の見取り図、営業設備の大要・配置図、内装の配置の平面図',
                })
              } else if (isOver300m()) {
                modal({
                  title: 'これらの資格・書類が必要です。',
                  description:
                    '食品衛生責任者資格、飲食店営業許可申請書、場所の見取り図、営業設備の大要・配置図、内装の配置の平面図',
                })
              } else if (isCorp()) {
                modal({
                  title: 'これらの資格・書類が必要です。',
                  description:
                    '食品衛生責任者資格、飲食店営業許可申請書、場所の見取り図、営業設備の大要・配置図、内装の配置の平面図、登記事項証明書',
                })
              } else if (isUseTank()) {
                modal({
                  title: 'これらの資格・書類が必要です。',
                  description:
                    '食品衛生責任者資格、飲食店営業許可申請書、場所の見取り図、営業設備の大要・配置図、内装の配置の平面図、水質検査成績書',
                })
              } else {
                modal({
                  title: 'これらの資格・書類が必要です。',
                  description:
                    '食品衛生責任者資格、飲食店営業許可申請書、場所の見取り図、営業設備の大要・配置図、内装の配置の平面図',
                })
              }
            }
            setIsLoading(false)
          }}
        >
          必要なものを表示
        </Button>
        <Link href="/license/restaurant-license/create">
          <Button>取得を始める</Button>
        </Link>
      </Container>
    </AppLayout>
  )
}
