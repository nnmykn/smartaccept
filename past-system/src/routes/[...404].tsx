import { Title } from 'solid-start'
import { HttpStatusCode } from 'solid-start/server'
import { styled } from 'solid-styled-components'

const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;

  .content {
    position: absolute;
    top: 50%;
    left: 50%;
    text-align: center;
    transform: translate(-50%, -50%);
  }
`

export default function NotFound() {
  return (
    <div>
      <Title>404 Not Found</Title>
      <HttpStatusCode code={404} />
      <Container>
        <div class="content">
          <h1>404 Not Found</h1>
          <p>ページが見つかりませんでした</p>
          <a href="/">ダッシュボードに移動する</a>
        </div>
      </Container>
    </div>
  )
}
