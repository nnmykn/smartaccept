export const loadFont = async (url: string) => {
    const res = await fetch(url)
    return res.arrayBuffer()
}
