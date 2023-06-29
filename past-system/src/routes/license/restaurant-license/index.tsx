import { Link } from '@solidjs/router'
import { For } from 'solid-js'
import { styled } from 'solid-styled-components'

import { Button } from '~/components/ui/button'
import { Card, CardBody, CardImage } from '~/components/ui/card'
import { AppLayout } from '~/layouts/app-layout'

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 1rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 4px #4385bb12;
  gap: 1rem;
`
const StyledCardBody = styled(CardBody)`
  display: grid;
  grid-template-rows: 1fr 1fr 50px;
`

type ManagesInfo = {
  title: string
  subtitle: string
  description: string
  img: string
  id?: string
  button: string
  link: string
  blank?: boolean
}

const Manages: ManagesInfo[] = [
  {
    title: 'ライセンスの取得',
    subtitle: 'in 東京都',
    description: '飲食店の開業に必要な基本的なライセンスを取得して飲食店を始めましょう。',
    img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?fit=crop&h=570&w=970&q=40',
    id: 'restaurant-license',
    button: '取得する',
    link: './guide',
    blank: false,
  },
  {
    title: 'ライセンスガイドを読む',
    subtitle: 'in 東京都',
    description: 'ライセンスに関するガイドを読んで、ライセンスの知識を深めましょう。',
    img: 'https://images.unsplash.com/photo-1457694587812-e8bf29a43845?fit=crop&h=570&w=970&q=40',
    id: 'private-lodging-business-act',
    button: '読む',
    link: 'https://central.smartaccept.jp/fa4bb4e6b5044a8da5394239823243a0',
    blank: true,
  },
  {
    title: '行政書士に相談する',
    subtitle: 'in 東京都',
    description: '飲食店営業許可の取得に関する相談を行政書士に依頼することが出来ます。',
    img: 'https://images.unsplash.com/photo-1626148750586-df6e1b0bebf2?fit=crop&h=570&w=970&q=40',
    id: 'liquor-sales-license',
    button: '相談する',
    link: '/plan',
    blank: false,
  },
]

export default function License() {
  return (
    <AppLayout>
      <h1>🗃️飲食店営業許可の管理(東京都)</h1>
      <p>このページから飲食店営業許可の管理を行うことが可能です。</p>
      <Container>
        <For each={Manages}>
          {(manage) => (
            <Card>
              <CardImage>
                <img src={manage.img} alt="" />
              </CardImage>
              <StyledCardBody>
                <div>
                  <h3>{manage.title}</h3>
                  <p>{manage.subtitle}</p>
                </div>

                <p>{manage.description}</p>
                <div>
                  <Link target={manage.blank ? '_blank' : ''} href={`${manage.link}`}>
                    <Button>{manage.button}</Button>
                  </Link>
                </div>
              </StyledCardBody>
            </Card>
          )}
        </For>
      </Container>
    </AppLayout>
  )
}
