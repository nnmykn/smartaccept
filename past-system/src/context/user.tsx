import type { User } from '@supabase/supabase-js'
import { Component, createContext, JSX, Match, onMount, Switch, useContext } from 'solid-js'
import { createStore } from 'solid-js/store'
import { useLocation, useNavigate } from 'solid-start'

import { UserProfileProvider } from './user-profile'

import { Fallback } from '~/components/fallback'
import { supabase } from '~/util/supabase/client'

type UserContextType = User & {
  iconUrl: string
}

/**
 * ログインが不要なページ
 */
const IgnoreLocation = ['/sign', '/setup', '/sign-up']

const UserContext = createContext({} as UserContextType)

export const UserProvider: Component<{ children: JSX.Element }> = (props) => {
  const [user, setUser] = createStore({} as UserContextType)
  const location = useLocation()
  const navigate = useNavigate()

  /**
   * マウント時にユーザーを取得、処理
   * 未ログイン時には /sign にリダイレクト
   */
  onMount(async () => {
    const { data } = await supabase.auth.getUser()
    if (!data.user) return navigate('/sign')
    setUser({ ...data.user, iconUrl: '' })
  })

  return (
    // 未ログイン時にダッシュボードが表示されないように
    <Switch fallback={<Fallback />}>
      <Match when={IgnoreLocation.includes(location.pathname)}>{props.children}</Match>
      <Match when={user.id}>
        <UserContext.Provider value={{ ...user }}>
          <UserProfileProvider>{props.children}</UserProfileProvider>
        </UserContext.Provider>
      </Match>
    </Switch>
  )
}

export const useUser = () => useContext(UserContext)
