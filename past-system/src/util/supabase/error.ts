import { AuthError, isAuthError } from '@supabase/supabase-js'

type TranslatedSupabaseError = {
    title: string
    message: string
}

export const translateError = (error: Error): TranslatedSupabaseError => {
    if (isAuthError(error)) return translateAuthError(error)
    return {
        title: error.name,
        message: error.message,
    }
}

const translateAuthError = (error: AuthError): TranslatedSupabaseError => {
    switch (error.message) {
        case 'Unable to validate email address: invalid format':
            return {
                title: 'メールアドレスを検証できません',
                message: '形式が無効です',
            }
        case 'For security purposes, you can only request this once every 60 seconds':
            return {
                title: 'ログインに失敗しました',
                message:
                    'セキュリティ上の理由から、これをリクエストできるのは 60 秒ごとに 1 回だけです',
            }
        default:
            return {
                title: error.name,
                message: error.message,
            }
    }
}
