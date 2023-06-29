import { Link } from '@solidjs/router'
import { createSignal, onMount } from 'solid-js'
import { styled } from 'solid-styled-components'

import { Button } from '~/components/ui/button'
import { useApi } from '~/hooks/api/client'
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
  font-size: 15px;
  gap: 1rem;
  line-height: 1.9;
  list-style: disc;

  h2 {
    font-size: 1.6rem;
  }

  ol {
    margin-left: 1.5rem;
    list-style: decimal;

    li {
      color: #000000d1;
      font-size: 1em;

      p {
        color: #000000d1;
      }
    }
  }

  .notion {
    ul {
      margin-left: 1.5rem;
      list-style: disc;

      li {
        color: #000000d1;
        font-size: 1em;

        p {
          color: #000000d1;
        }
      }
    }
  }
`
export default function Guide() {
  const [notionFlow, setNotionFlow] = createSignal('')
  const [notionInfo, setNotionInfo] = createSignal('')
  const api = useApi()
  onMount(async () => {
    api('/notion/page2html', {
      query: {
        url: 'https://nnmykn.notion.site/0d32cc7d9301429297e18719a8f3465c',
      },
    }).then(({ html }) => setNotionFlow(html))
    api('/notion/page2html', {
      query: {
        url: 'https://nnmykn.notion.site/dc4479f5e1b14f908beccc3a9521675e',
      },
    }).then(({ html }) => setNotionInfo(html))
  })
  return (
    <AppLayout>
      <h1>飲食店営業許可のガイドを読む</h1>
      <p>
        東京都の飲食店営業許可の取得へようこそ、さっそく飲食店営業許可の取得を進めていきましょう🎉
      </p>
      <p>これらの内容はSmartAccept Centralからも確認が可能です。</p>
      <Link target="_blank" href="https://central.smartaccept.jp/fa4bb4e6b5044a8da5394239823243a0">
        <Button>ヘルプを読む</Button>
      </Link>
      <Container>
        <h2>
          <img
            src="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f481-200d-2642-fe0f.svg"
            width="22px"
          />
          ライセンスインフォメーション
        </h2>
        {/* eslint-disable-next-line solid/no-innerhtml */}
        <div class="notion" innerHTML={notionInfo()} />
        <h2>
          <img
            src="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f30a.svg"
            width="22px"
          />
          ライセンス取得完了までの流れ
        </h2>
        {/* eslint-disable-next-line solid/no-innerhtml */}
        <div class="notion" innerHTML={notionFlow()} />
        <Link href="/license/restaurant-license/establish">
          <Button>取得する</Button>
        </Link>
      </Container>
    </AppLayout>
  )
}
