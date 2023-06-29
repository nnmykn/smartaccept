import dayjs from 'dayjs'
import { createSignal, For, Show } from 'solid-js'
import { createStore } from 'solid-js/store'
import { css } from 'solid-styled-components'

import { Box } from '~/components/ui/box'
import { Button } from '~/components/ui/button'
import { Checkbox } from '~/components/ui/checkbox'
import { Input } from '~/components/ui/input'
import { useModal } from '~/components/ui/modal'
import { Select } from '~/components/ui/select'
import { HStack } from '~/components/ui/stack'
import { useToast } from '~/components/ui/toast'
import { AppLayout } from '~/layouts/app-layout'
import type { TRestaurantLicense } from '~/types/license/restaurant-license'
import { restaurantLicense } from '~/util/pdf/restaurant-license'
import IconClose from '~icons/carbon/close'

export default function ApplicationForRestaurantCreate() {
  const modal = useModal()
  const toast = useToast()
  const [loading, setLoading] = createSignal(false)
  const [data, setData] = createStore<TRestaurantLicense>({
    type: 'new',
    date: dayjs().format('YYYY-MM-DD'),
    healthCentre: { name: '', postalCode: '', phoneNumber: '' },
    applicant: { ruby: '', fullname: '', address: '', birthday: '' },
    salesOffice: {
      address: '',
      phoneNumber: '',
      name: '',
      sales: [{ type: '', remarks: '' }],
    },
    foodSanitationSupervisor: {
      fullname: '',
      qualifications: { type: 'nutritionist', date: '', number: '', others: '' },
    },
    disqualification: { '1': undefined, '2': undefined },
  })

  return (
    <AppLayout>
      <h1>飲食店営業許可申請書の作成</h1>
      <p>
        デモとして東京都福祉保健局の営業許可申請書を作成することが出来ます。(店内図面作成機能は未実装)
      </p>

      <Box
        class={css`
          width: 90%;
          margin: 1rem;
          background-color: white;
          border-radius: 0.5rem;
        `}
      >
        <Box
          padding="0"
          class={css`
            display: flex;
            flex-wrap: wrap;
            gap: 1rem;

            & > div {
              & > h2 {
                margin-top: 2rem;
              }

              & > h3 {
                margin-top: 1rem;
              }
            }
          `}
        >
          <div>
            <h3>新規 / 継続</h3>
            <Select
              value={data.type}
              items={[
                {
                  key: 'new',
                  label: '新規',
                },
                {
                  key: 'continuation',
                  label: '継続',
                },
              ]}
              onChange={(item) => setData('type', item.key as any)}
            />

            <h3>申請日</h3>
            <Input
              type="date"
              value={data.date}
              onInput={(e) => {
                setData('date', e.currentTarget.value)
              }}
            />
          </div>

          <div>
            <h2>保健所情報</h2>
            <h3>名前</h3>
            <Input
              value={data.healthCentre?.name}
              onInput={(e) => {
                setData('healthCentre', 'name', e.currentTarget.value)
              }}
            />

            <h3>郵便番号</h3>
            <Input
              value={data.healthCentre?.postalCode}
              onInput={(e) => {
                setData('healthCentre', 'postalCode', e.currentTarget.value)
              }}
            />

            <h3>電話番号</h3>
            <Input
              value={data.healthCentre?.phoneNumber}
              onInput={(e) => {
                setData('healthCentre', 'phoneNumber', e.currentTarget.value)
              }}
            />
          </div>

          <div>
            <h2>申請者情報</h2>
            <h3>氏名</h3>
            <Input
              value={data.applicant?.fullname}
              onInput={(e) => {
                setData('applicant', 'fullname', e.currentTarget.value)
              }}
            />

            <h3>フリガナ</h3>
            <Input
              value={data.applicant?.ruby}
              onInput={(e) => {
                setData('applicant', 'ruby', e.currentTarget.value)
              }}
            />

            <h3>住所</h3>
            <Input
              value={data.applicant?.address}
              onInput={(e) => {
                setData('applicant', 'address', e.currentTarget.value)
              }}
            />

            <h3>誕生日</h3>
            <Input
              type="date"
              value={data.applicant?.birthday}
              onInput={(e) => {
                setData('applicant', 'birthday', e.currentTarget.value)
              }}
            />
          </div>

          <div>
            <h2>営業所情報</h2>
            <h3>営業所の所在地</h3>
            <Input
              value={data.salesOffice?.address}
              onInput={(e) => {
                setData('salesOffice', 'address', e.currentTarget.value)
              }}
            />

            <h3>電話番号</h3>
            <Input
              value={data.salesOffice?.phoneNumber}
              onInput={(e) => {
                setData('salesOffice', 'phoneNumber', e.currentTarget.value)
              }}
            />

            <h3>営業所の名称等</h3>
            <Input
              value={data.salesOffice?.name}
              onInput={(e) => {
                setData('salesOffice', 'name', e.currentTarget.value)
              }}
            />
          </div>

          <div
            class={css`
              width: 100%;
            `}
          >
            <h2>業種</h2>

            <Button
              onClick={() => {
                if (data.salesOffice?.sales?.length === 5) {
                  toast({
                    status: 'error',
                    title: '業種は5つまでです',
                    description: '',
                    duration: 1000 * 3,
                    isClosable: true,
                  })
                  return
                }
                setData('salesOffice', 'sales', (l) => [
                  ...l,
                  {
                    type: '',
                    remarks: '',
                  },
                ])
              }}
            >
              追加
            </Button>
            <HStack>
              <For each={data.salesOffice.sales}>
                {(sale, i) => (
                  <Box
                    class={css`
                      display: inline-block;
                      width: 18%;
                      box-shadow: 0 0 16px -6px rgba(0, 0, 0, 0.6);

                      button {
                        margin-top: 0.5rem;
                      }
                    `}
                  >
                    <h3>No. {i() + 1}</h3>
                    <h4>営業の種類</h4>
                    <Input
                      value={sale.type}
                      onInput={(e) => {
                        setData('salesOffice', 'sales', i(), 'type', e.currentTarget.value)
                      }}
                    />

                    <h4>備考</h4>
                    <Input
                      value={sale.remarks}
                      onInput={(e) => {
                        setData('salesOffice', 'sales', i(), 'remarks', e.currentTarget.value)
                      }}
                    />
                    <br />

                    <Show when={i() !== 0}>
                      <Button
                        onClick={() => {
                          setData('salesOffice', 'sales', (l) => l.filter((_, i2) => i() !== i2))
                        }}
                      >
                        削除
                      </Button>
                    </Show>
                  </Box>
                )}
              </For>
            </HStack>
          </div>

          <div>
            <h2>申請者の欠格事項</h2>
            <p>いずれかに該当する場合、営業許可を取得することが出来ません。</p>
            <Checkbox
              isChecked={typeof data.disqualification[1] !== 'undefined'}
              onChange={(checked) => {
                setData('disqualification', 1, checked ? '' : undefined)
              }}
            >
              (1) 食品衛生法又は同法に基づく処分に違反し て刑に処せられ、その執行を終わり、又は執
              行を受けることがなくなった日から起算して 2 年を経過していないこと。
            </Checkbox>
            <Show when={typeof data.disqualification[1] !== 'undefined'}>
              <Input
                value={data.disqualification[1] || ''}
                onInput={(e) => {
                  setData('disqualification', 1, e.currentTarget.value)
                }}
              />
            </Show>

            <Checkbox
              isChecked={typeof data.disqualification[2] !== 'undefined'}
              onChange={(checked) => {
                setData('disqualification', 2, checked ? '' : undefined)
              }}
            >
              (2) 食品衛生法第 54 条から第 56 条までの規定 により許可を取り消され、その取消しの日か
              ら起算して 2 年を経過していないこと。
            </Checkbox>
            <Show when={typeof data.disqualification[2] !== 'undefined'}>
              <Input
                value={data.disqualification[2] || ''}
                onInput={(e) => {
                  setData('disqualification', 2, e.currentTarget.value)
                }}
              />
            </Show>
          </div>

          <div>
            <h2>食品衛生責任者</h2>

            <h3>氏名</h3>
            <Input
              value={data.foodSanitationSupervisor?.fullname}
              onInput={(e) => {
                setData('foodSanitationSupervisor', 'fullname', e.currentTarget.value)
              }}
            />

            <h3>資格</h3>
            <Select
              value={data.foodSanitationSupervisor?.qualifications?.type}
              items={[
                { key: 'nutritionist', label: '栄養士' },
                {
                  key: 'cook',
                  label: '調理師',
                },
                {
                  key: 'licensedConfectioner',
                  label: '製菓衛生師',
                },
                {
                  key: 'poultryProcessingHygieneManager',
                  label: '食鳥処理衛生管理者',
                },
                {
                  key: 'shipCook',
                  label: '船舶料理士',
                },
                {
                  key: 'foodHygieneManager',
                  label: '食品衛生管理者',
                },
                {
                  key: 'foodSanitationInspector',
                  label: '食品衛生監視員',
                },
                {
                  key: 'trainingClassParticipants',
                  label: '養成講習会受講者',
                },
                {
                  key: 'replenishmentClassAttendees',
                  label: '補充講習会受講者',
                },
                {
                  key: 'others',
                  label: 'その他',
                },
              ]}
              onChange={(item) => {
                setData('foodSanitationSupervisor', 'qualifications', 'type', item.key as any)
              }}
            />

            <Show when={data.foodSanitationSupervisor?.qualifications?.type === 'others'}>
              <h3>その他</h3>
              <Input
                value={data.foodSanitationSupervisor?.qualifications?.others}
                onInput={(e) => {
                  setData(
                    'foodSanitationSupervisor',
                    'qualifications',
                    'others',
                    e.currentTarget.value,
                  )
                }}
              />
            </Show>

            <h3>取得日</h3>
            <Input
              type="date"
              value={data.foodSanitationSupervisor?.qualifications?.date}
              onInput={(e) => {
                setData('foodSanitationSupervisor', 'qualifications', 'date', e.currentTarget.value)
              }}
            />

            <h3>登録番号</h3>
            <Input
              value={data.foodSanitationSupervisor?.qualifications?.number}
              onInput={(e) => {
                setData(
                  'foodSanitationSupervisor',
                  'qualifications',
                  'number',
                  e.currentTarget.value,
                )
              }}
            />
          </div>
        </Box>
        <Button
          class={css`
            margin-top: 1rem;
          `}
          onClick={async () => {
            setLoading(true)
            const pdf = await restaurantLicense(data)
            const base64 = await pdf.saveAsBase64()
            modal({
              render: (close) => (
                <Box
                  class={css`
                    position: fixed;
                    top: 0;
                    left: 0;
                    display: flex;
                    width: 100%;
                    height: 100vh;
                    align-items: center;
                    justify-content: center;
                    background-color: white;

                    button {
                      position: absolute;
                      top: 0;
                      right: 0;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      margin: 1rem;
                    }
                  `}
                >
                  <embed
                    src={`data:application/pdf;base64,${base64}`}
                    width="90%"
                    height="100%"
                    type="application/pdf"
                  />
                  <Button onClick={() => close()}>
                    <IconClose />
                  </Button>
                </Box>
              ),
            })
            setLoading(false)
          }}
          loading={loading()}
        >
          プレビューを表示
        </Button>
      </Box>
    </AppLayout>
  )
}
