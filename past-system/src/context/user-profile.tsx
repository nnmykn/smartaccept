import { Component, createContext, createSignal, JSX, onMount, Show, useContext } from 'solid-js'
import { createStore } from 'solid-js/store'
import { isServer } from 'solid-js/web'
import { useNavigate } from 'solid-start'

import { useUser } from './user'

import { Fallback } from '~/components/fallback'
import type { UserProfile } from '~/types/user'
import { supabase } from '~/util/supabase/client'

const UserProfileContext = createContext(
  {} as {
    userProfile: UserProfile
    signedIconUrl: string
    setUserProfile: (profile: UserProfile) => Promise<void>
  },
)

/**
 * 署名付きのユーザーアイコンへのURLを生成
 * アクセス毎に生成されるので有効期限は短めに
 * @param filename ユーザーアイコンのファイル名
 * @returns 署名付きのユーザーアイコンへのURL
 */
const fetchSignedIconUrl = async (filename: string) => {
  const signedIconUrl = await supabase.storage.from('icons').createSignedUrl(filename, 60 * 5)

  if (signedIconUrl.error) console.error(signedIconUrl.error) //TODO エラーハンドリング
  return signedIconUrl.data?.signedUrl as string
}

/**
 * アイコンファイルのアップロード
 * @param file アイコン用の画像ファイル
 * @returns アップロード後のファイル名
 */
export const uploadIconFile = async (file: File) => {
  // TODO アイコン更新毎にファイルが蓄積されるのを防ぐ
  const fileExt = file.name.split('.').pop()
  const fileName = `${Math.random()}.${fileExt}`
  const { error } = await supabase.storage.from('icons').upload(fileName, file)
  if (error) throw error
  return fileName
}

export const UserProfileProvider: Component<{ children: JSX.Element }> = (props) => {
  const navigate = useNavigate()
  const user = useUser()
  const [loaded, setLoaded] = createSignal(isServer ? true : false)
  const [profile, setProfile] = createStore<UserProfile>({} as UserProfile)
  const [signedIconUrl, setSignedIconUrl] = createSignal('')

  const fetchProfile = async () => {
    if (!user.id) return
    const { data, error, status } = await supabase
      .from('profiles')
      .select(
        `company_type, company_name, company_address, company_size, company_id, icon_url, iscorp`,
      )
      .eq('id', user.id)
      .single()

    if (error && status !== 406) throw error
    if (!data || !data.company_name) return navigate('/setup') // データがない場合には初期状態判定

    setProfile(data)

    const signedIconUrl = await fetchSignedIconUrl(data.icon_url)
    setSignedIconUrl(signedIconUrl)

    setLoaded(true)
  }

  const updateProfile = async (userProfile: Partial<UserProfile>) => {
    const { data } = await supabase.auth.getUser()

    if (!data.user) return
    const updates = {
      ...userProfile,
      id: data.user.id,
      updated_at: new Date(),
    }

    const { error } = await supabase.from('profiles').upsert(updates)

    if (error) throw error

    await fetchProfile()
  }

  onMount(fetchProfile)

  return (
    // プロファイル未取得時にダッシュボードを表示させないように
    <Show when={loaded()} fallback={<Fallback />}>
      <UserProfileContext.Provider
        value={{
          userProfile: profile,
          signedIconUrl: signedIconUrl(),
          setUserProfile: updateProfile,
        }}
      >
        {props.children}
      </UserProfileContext.Provider>
    </Show>
  )
}

export const useUserProfile = () => useContext(UserProfileContext)
