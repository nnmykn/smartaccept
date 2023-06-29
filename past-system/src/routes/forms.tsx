import { css } from 'solid-styled-components'

import { AppLayout } from '~/layouts/app-layout'

export default function Forms() {
  return (
    <AppLayout>
      <h1>問い合わせ</h1>
      <iframe
        src="https://smartaccept.channel.io/"
        width="100%"
        height="90%"
        class={css`
          border: none;
        `}
      />
    </AppLayout>
  )
}
