import fontkit from '@routex-hq/fontkit'
import { PDFDocument } from 'pdf-lib'

export const loadPDF = async (url: string) => {
    const res = await fetch(url)
    const pdf = await PDFDocument.load(await res.arrayBuffer())
    pdf.registerFontkit(fontkit)
    return pdf
}
