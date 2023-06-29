export const setupChannelTalk = () => {
  if (window['ChannelIOInitialized']) return
  const ch = {
    q: [
      [
        'boot',
        {
          pluginKey: import.meta.env['VITE_CHANNELTALK_PUBLIC_KEY'], //please fill with your plugin key
        },
      ],
    ],
  }
  window['ChannelIO'] = ch

  window['ChannelIOInitialized'] = true
  const script = document.createElement('script')
  script.type = 'text/javascript'
  script.async = true
  script.src = 'https://cdn.channel.io/plugin/ch-plugin-web.js'

  const body = document.getElementsByTagName('body')[0]
  body?.appendChild(script)
}
