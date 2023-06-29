import type { Component } from 'solid-js'
import { styled } from 'solid-styled-components'

import { Box } from './ui/box'
import { Progress } from './ui/progress'

import IconChart from '~icons/carbon/chart-stacked'

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  background-color: white;
  border-radius: 1rem;
  gap: 1rem;
`

export const ProgressStatus: Component = () => {
  return (
    <Container>
      <IconChart />
      <h2>現在時点の進捗度</h2>
      <p>このプログレスバーは数分遅れて反映されることがあります。</p>
      <Progress value={0.5} />
    </Container>
  )
}
