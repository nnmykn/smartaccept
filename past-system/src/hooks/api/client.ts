import type { ApiResponses } from './types'

import { supabase } from '~/util/supabase/client'

const API_URL = import.meta.env.DEV
    ? import.meta.env['API_URL_DEV'] || 'http://localhost:8787'
    : import.meta.env['API_URL'] || 'https://api.smartaccept.jp'

export const useApi = () => {
    const fetcher = async <P extends keyof ApiResponses>(
        pathname: P,
        init: RequestInit & {
            query?: Record<string, string>
        } = {},
    ): Promise<ApiResponses[P]> => {
        const url = new URL(pathname, API_URL)

        if (init.query)
            for (const [key, value] of Object.entries(init.query)) url.searchParams.set(key, value)

        const { data } = await supabase.auth.getSession()
        const token = data.session?.access_token
        if (!token) throw new Error('AccessToken not found.')

        const headers = new Headers(init.headers)
        headers.set('Authorization', token)
        init.headers = headers

        const res = await fetch(url, init)
        return res.json()
    }

    return fetcher
}
