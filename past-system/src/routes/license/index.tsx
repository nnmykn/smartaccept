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
  gap: 1rem;
`
const StyledCardBody = styled(CardBody)`
  display: grid;
  grid-template-rows: 1fr 1fr 50px;
`

type LicenseInfo = {
  title: string
  subtitle: string
  description: string
  img: string
  id?: string
}

const Licenses: LicenseInfo[] = [
  {
    title: '飲食店営業許可',
    subtitle: 'in 東京都',
    description: '飲食店の開業に必要な基本的なライセンスを取得・管理することができます。',
    img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?fit=crop&h=570&w=970&q=40',
    id: 'restaurant-license',
  },
]

export default function License() {
  return (
    <AppLayout>
      <h1>ライセンス</h1>
      <Container>
        <For each={Licenses}>
          {(license) => (
            <Card>
              <CardImage>
                <img src={license.img} alt="" />
              </CardImage>
              <StyledCardBody>
                <div>
                  <h3>{license.title}</h3>
                  <p>{license.subtitle}</p>
                </div>

                <p>{license.description}</p>
                <div>
                  <Link href={`/license/${license.id}`}>
                    <Button>管理する</Button>
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
