import { Link } from '@solidjs/router'
import type { Component } from 'solid-js'
import { styled } from 'solid-styled-components'

import { Box } from './ui/box'
import { Button } from './ui/button'

const Container = styled(Box)``

const NewsItem = styled.div`
  display: grid;
  overflow: hidden;
  width: 320px;
  min-height: 480px;
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 2px 4px #4385bb12;
`

const NewsThumbnail = styled.div`
  grid-row: 1 / 2;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    vertical-align: top;
  }
`

const NewsContent = styled.div`
  margin: 1rem;
  background-color: white;
  grid-row: 2 / 3;
`

export const News: Component = () => {
  return (
    <Container>
      <NewsItem>
        <NewsThumbnail>
          <img src="/assets/images/form-background.png" alt="アンケート回答フォーム" />
        </NewsThumbnail>

        <NewsContent>
          <h3>クローズドベータ利用アンケート</h3>
          <p>by RouteX</p>
          <br />
          <p>
            現在SmartAcceptではクローズドベータ版の利用アンケートを実施しています。
            <br />
            回答頂いた方にはリリース後の割引を配布致します。
          </p>
          <br />
          <Link
            target="_blank"
            href="https://docs.google.com/forms/d/e/1FAIpQLSd0mfT2eVNIUxeMNJLG7E2PZvEB_3FWpuZ64X0UOvhx_NjgKA/viewform?usp=sf_link"
          >
            <Button>回答する</Button>
          </Link>
        </NewsContent>
      </NewsItem>
    </Container>
  )
}
