import { Link } from '@solidjs/router'
import type { Component, JSX } from 'solid-js'
import { useLocation } from 'solid-start'
import { css, styled, useTheme } from 'solid-styled-components'

import { Box } from './ui/box'
import { Button } from './ui/button'
import { HStack, VStack } from './ui/stack'

import { supabase } from '~/util/supabase/client'
import IconAt from '~icons/carbon/at'
import IconDocument from '~icons/carbon/document'
import IconEmail from '~icons/carbon/email'
import IconHome from '~icons/carbon/home'
import IconMoney from '~icons/carbon/money'
import IconSmartAcceptLogo from '~icons/routex/smartaccept-logo'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const MenuButton: Component<{
  children: JSX.Element
  href: string
}> = (props) => {
  const location = useLocation()
  const theme = useTheme()
  return (
    <Link
      href={props.href}
      class={css`
        width: 100%;
      `}
    >
      <Button
        class={css`
          width: 100%;
          background-color: ${location.pathname === props.href
            ? theme.colors.background.darken(0.1).string()
            : theme.colors.background.string()};

          &:hover {
            background-color: ${theme.colors.background.darken(0.1).string()};
          }

          .children {
            display: inline-flex;
            width: 100%;
            align-items: center;
            justify-content: flex-start;
            color: ${theme.colors.text.string()};
            font-weight: bold;
            gap: 1rem;
          }
        `}
      >
        <div class="children">{props.children}</div>
      </Button>
    </Link>
  )
}

export const SideBar: Component = () => {
  return (
    <Container>
      <HStack
        class={css`
          margin: 2rem;
        `}
      >
        <Link href="/">
          <Box
            padding="0"
            class={css`
              height: 30px;

              svg {
                width: auto;
                height: 100%;
              }
            `}
          >
            <IconSmartAcceptLogo />
          </Box>
        </Link>
      </HStack>
      <VStack
        class={css`
          width: 80%;
        `}
      >
        <MenuButton href="/">
          <IconHome font-size="20px" />
          ダッシュボード
        </MenuButton>
        <MenuButton href="/license">
          <IconDocument font-size="20px" />
          ライセンス
        </MenuButton>
        <MenuButton href="/plan">
          <IconMoney font-size="20px" />
          プラン
        </MenuButton>
        <MenuButton href="/forms">
          <IconEmail font-size="20px" />
          お問い合わせ
        </MenuButton>
        <MenuButton href="/account">
          <IconAt font-size="20px" />
          アカウント
        </MenuButton>
      </VStack>
      <Button
        onClick={async () => {
          await supabase.auth.signOut()
          window.location.href = '/sign'
        }}
      >
        ログアウト
      </Button>
    </Container>
  )
}
