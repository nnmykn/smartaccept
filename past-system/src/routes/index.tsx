import { styled } from 'solid-styled-components'

import { Box } from '~/components/ui/box'
import { VStack } from '~/components/ui/stack'
import { AppLayout } from '~/layouts/app-layout'

const Container = styled.div`
  display: flex;
  margin-top: 1rem;
  gap: 1rem;
`

const StyledBox = styled(Box)`
  display: inline-block;
  width: 40%;
  padding: 1rem;
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 2px 4px #4385bb12;

  h2 {
    margin-bottom: 0.5rem;
  }
`

const Licenses = styled(VStack)`
  align-items: flex-start;
  gap: 1rem;
`

export default function Home() {
  return (
    <AppLayout>
      <h1>ダッシュボード</h1>
      <p>このページからSmartAccept内全体の状態を確認できます。</p>
      <Container>
        <StyledBox>
          <h2>進行中のライセンス</h2>
        </StyledBox>
        <StyledBox>
          <h2>管理中のライセンス</h2>
          <Licenses />
        </StyledBox>
      </Container>
    </AppLayout>
  )
}
