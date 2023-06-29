import { Link } from '@solidjs/router'
import { Component, JSX, onMount, Show } from 'solid-js'
import { css, styled, useTheme } from 'solid-styled-components'

import { News } from '~/components/news'
import { Search } from '~/components/search'
import { SideBar } from '~/components/side-bar'
import { Box } from '~/components/ui/box'
import { useUserProfile } from '~/context/user-profile'
import { setupChannelTalk } from '~/util/channeltalk/client'
import IconUser from '~icons/carbon/user'

const Container = styled.div`
  display: grid;
  min-height: 100vh;
  max-height: 100vh;
  background-color: ${(p) => p.theme?.colors.background.string()};
  grid-template-columns: 300px 1fr 400px;
  grid-template-rows: 100px 1fr;
  overflow-x: scroll;
  overflow-y: hidden;
`

const Top = styled.div`
  display: grid;
  align-items: center;
  padding: 1rem;
  grid-column: 2/4;
  grid-template-columns: 1fr 300px;
`

const Main = styled.div`
  min-width: 1000px;
  height: 100%;
  margin-top: 1.5rem;
  grid-column: 2 / 3;
  overflow-x: hidden;
  overflow-y: auto;
`

const Right = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 4rem;
  margin-top: 1.5rem;
  gap: 1rem;
  grid-column: 3 / 4;
`

const UserCard: Component = () => {
  const { userProfile, signedIconUrl } = useUserProfile()
  const theme = useTheme()
  return (
    <Link href="/account">
      <Box
        class={css`
          display: inline-flex;
          height: 90%;
          align-items: center;
          margin-right: 50px;
          background-color: ${theme.colors.sub.fade(0.8).string()};
          border-radius: 1rem;
          color: ${theme.colors.text.string()};
          gap: 2rem;

          img {
            width: 50px;
            height: 50px;
            border-radius: 5px;
            object-fit: cover;
          }
        `}
      >
        <Show when={signedIconUrl} fallback={<IconUser />}>
          <img src={signedIconUrl} alt="" />
        </Show>
        <h4>{userProfile.company_name}</h4>
      </Box>
    </Link>
  )
}

export const AppLayout: Component<{ children: JSX.Element }> = (props) => {
  onMount(() => {
    setupChannelTalk()
  })
  return (
    <Show
      when={navigator.userAgent.includes('Chrome')}
      fallback={
        <div
          class={css`
            display: flex;
            height: 100vh;
            align-items: center;
            justify-content: center;
          `}
        >
          <h1>Chromeのみ対応しています。</h1>
        </div>
      }
    >
      <Container>
        <SideBar />
        <Top>
          <Search />
          <UserCard />
        </Top>
        <Main>{props.children}</Main>
        <Right>
          <News />
        </Right>
      </Container>
    </Show>
  )
}
