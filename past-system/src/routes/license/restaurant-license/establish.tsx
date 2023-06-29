import { Link } from '@solidjs/router'
import { styled } from 'solid-styled-components'

import { GuideContent } from '~/components/guide-content'
import { Button } from '~/components/ui/button'
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
`

export default function Establish() {
  return (
    <AppLayout>
      <h1>飲食店営業許可の取得</h1>
      <p>必要な資格や書類を用意して提出しましょう。</p>
      <Container>
        <h2>
          <img
            src="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f481-200d-2642-fe0f.svg"
            width="22px"
          />
          必要な資格と書類を提出
        </h2>
        <GuideContent
          title={'食品衛生責任者の資格を取りに行く'}
          number={'1'}
          description="営業許可の取得に必要な食品衛生責任者の資格を取りに行きます。"
          isFinished={true}
        >
          <p>
            飲食店営業許可を取得するには食品衛生責任者資格を取得する必要があります。
            <br />
            一人が複数店舗の衛生責任者を行うことは出来ません、お店の数と同じ人数の資格保有者が必要です。
            <br />
            すでに栄養士、調理師などの免許を持っている方は、食品衛生社養成講習会を受講することなく取得のみで資格の取得が可能です。
          </p>
          <p>資格の証明書が後々必要になるので無くさないように保管しましょう</p>
          <Link target="_blank" href="https://www.toshoku.or.jp/training/seki-gaiyou.html">
            <Button>講習を受ける</Button>
          </Link>
        </GuideContent>
        <GuideContent
          title={'防火管理者の資格を取りに行く'}
          number={'2'}
          description="店舗によって必要な場合は防火管理者の資格を取りに行きます。"
          isFinished={false}
        >
          <p>防火管理者の資格が必要なのは店舗の収容人数が30名以上(従業員含む)の場合のみです。</p>
          <p>
            防火対象物の延べ面積が300㎡以上の場合は「甲種防火管理者」、300㎡未満の場合は「乙種防火管理者」の資格が必要です。
          </p>
          <p>資格の証明書が後々必要になるので無くさないように保管しましょう</p>
          <Link target="_blank" href="https://www.bouka-bousai.jp/hp/lec_info/index.html">
            <Button>講習を受ける</Button>
          </Link>
        </GuideContent>
        <GuideContent
          title={'設計図を用意する'}
          number={'3'}
          description="保健所に事前相談に行くために店舗の設計図を用意します。"
          isFinished={false}
        >
          <p>店舗の施工を始める前に設計図を持って保健所に事前相談するために設計図を用意します。</p>
          <p>
            施工会社の方が「これで大丈夫」と言って設計をしても念のために保健所に事前相談することをおすすめします。
          </p>
        </GuideContent>
        <GuideContent
          title={'保健所に事前相談に行く'}
          number={'4'}
          description="保健所に事前相談に行き、設計図通りで大丈夫化を確認します。"
          isFinished={false}
        >
          <p>
            検査に合格するための条件にローカルルールなどもあるため施工を始める前に相談するようにしましょう。
            <br />
            窓口に行くことで無料で相談を行えます。
          </p>
          <Link href="#">
            <Button>保健所を探す(未実装)</Button>
          </Link>
        </GuideContent>
        <GuideContent
          title={'営業設備の大要・配置図を用意する'}
          number={'5'}
          description="保健所に飲食店営業許可申請を提出します。"
          isFinished={false}
        >
          <p>飲食店営業許可を取得するために申請書類を作成して保健所に提出します。</p>
          <img src="https://www.unchi-co.com/kaigyoblog/img/eigyosetubi_taiyou.png" />
          <Link target="_blank" href="/license/restaurant-license/create">
            <Button>申請書類を作成</Button>
          </Link>
        </GuideContent>
        <GuideContent
          title={'水質検査成績書を用意する'}
          number={'6'}
          description="保健所に飲食店営業許可申請を提出します。"
          isFinished={false}
        >
          <p>飲食店営業許可を取得するために申請書類を作成して保健所に提出します。</p>
          <Link target="_blank" href="/license/restaurant-license/create">
            <Button>申請書類を作成</Button>
          </Link>
        </GuideContent>
        <GuideContent
          title={'登記事項証明書を用意する'}
          number={'7'}
          description="保健所に飲食店営業許可申請を提出します。"
          isFinished={false}
        >
          <p>飲食店営業許可を取得するために申請書類を作成して保健所に提出します。</p>
          <Link target="_blank" href="/license/restaurant-license/create">
            <Button>申請書類を作成</Button>
          </Link>
        </GuideContent>
        <GuideContent
          title={'飲食店営業許可申請を提出'}
          number={'8'}
          description="保健所に飲食店営業許可申請を提出します。"
          isFinished={false}
        >
          <p>飲食店営業許可を取得するために申請書類を作成して保健所に提出します。</p>
          <Link target="_blank" href="/license/restaurant-license/create">
            <Button>申請書類を作成</Button>
          </Link>
        </GuideContent>
        <GuideContent
          title={'施設検査を受ける'}
          number={'9'}
          description="保健所から検査を受けます。"
          isFinished={false}
        >
          <p>保健所の定めるルールなどに従っているか施設検査を行います。</p>
        </GuideContent>
        <GuideContent
          title={'営業許可証の受け取り'}
          number={'10'}
          description="保健所から営業許可証を受け取ります。"
          isFinished={false}
        >
          <p>営業許可証を受け取ったら営業を始めることが出来ます。</p>
          <p>
            営業許可証は店内の目立つところに掲示し、期限が切れる一ヶ月前には更新手続きを行いましょう。
          </p>
          <p>お疲れ様でした。</p>
        </GuideContent>
      </Container>
    </AppLayout>
  )
}
