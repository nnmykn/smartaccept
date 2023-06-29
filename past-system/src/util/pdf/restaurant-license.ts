import dayjs from 'dayjs'
import { PDFPage, rgb } from 'pdf-lib'

import { loadFont } from './load-font'
import { loadPDF } from './load-pdf'

import type { TRestaurantLicense } from '~/types/license/restaurant-license'

export const restaurantLicense = async (data: TRestaurantLicense) => {
    const pdf = await loadPDF('/assets/pdf/application-for-restaurant.pdf')
    const font = await pdf.embedFont(await loadFont('/assets/fonts/BIZUDMincho-Regular.ttf'), {
        subset: true,
    })

    const pages = pdf.getPages()
    const page = pages[0] as PDFPage

    const drawText = (text: string, x: number, y: number, size: number) =>
        page.drawText(text, {
            x,
            y,
            size,
            font,
            color: rgb(0, 0, 0),
        })

    drawText('○', data.type === 'new' ? 345 : 408, 563, 35)

    const date = dayjs(data.date)
    drawText(date.format('YYYY'), 445, 760, 10)
    drawText(date.format('MM').replace(/^0/, ''), 500, 760, 10)
    drawText(date.format('DD').replace(/^0/, ''), 545, 760, 10)

    drawText(data.healthCentre.name, 70, 740, 14)
    drawText(data.healthCentre.postalCode, 315, 728, 10)
    drawText(data.healthCentre.phoneNumber, 450, 728, 10)

    const applicantBirthday = dayjs(data.applicant.birthday)
    drawText(data.applicant.address, 180, 685, 12)
    drawText(data.applicant.ruby, 180, 655, 8)
    drawText(data.applicant.fullname, 180, 640, 12)
    drawText(applicantBirthday.format('YYYY'), 395, 625, 10)
    drawText(applicantBirthday.format('MM').replace(/^0/, ''), 455, 625, 10)
    drawText(applicantBirthday.format('DD').replace(/^0/, ''), 500, 625, 10)

    drawText(data.salesOffice.address, 200, 520, 12)
    drawText(data.salesOffice.phoneNumber || '', 410, 505, 10)
    drawText(data.salesOffice.name, 200, 490, 10)
    for (const sale of data.salesOffice.sales) {
        const offset = data.salesOffice.sales.indexOf(sale) * 27
        console.log({ ...sale }, sale.type, sale.remarks)
        drawText(sale.type, 200, 428 - offset, 12)
        drawText(sale.remarks, 433, 428 - offset, 10)
    }

    if (typeof data.disqualification[1] === 'string')
        drawText(data.disqualification[1], 300, 295, 10)
    else drawText('なし', 400, 275, 24)

    if (typeof data.disqualification[2] === 'string')
        drawText(data.disqualification[2], 300, 248, 10)
    else drawText('なし', 400, 230, 24)

    drawText(data.foodSanitationSupervisor.fullname, 165, 145, 12)

    const acquisitionDate = dayjs(data.foodSanitationSupervisor.qualifications.date)
    drawText(
        '○',
        data.foodSanitationSupervisor.qualifications.type === 'nutritionist'
            ? 328
            : data.foodSanitationSupervisor.qualifications.type === 'cook'
            ? 343
            : data.foodSanitationSupervisor.qualifications.type === 'licensedConfectioner'
            ? 358
            : data.foodSanitationSupervisor.qualifications.type ===
              'poultryProcessingHygieneManager'
            ? 377
            : data.foodSanitationSupervisor.qualifications.type === 'shipCook'
            ? 400
            : data.foodSanitationSupervisor.qualifications.type === 'foodHygieneManager'
            ? 423
            : data.foodSanitationSupervisor.qualifications.type === 'foodSanitationInspector'
            ? 446
            : data.foodSanitationSupervisor.qualifications.type === 'trainingClassParticipants'
            ? 469
            : data.foodSanitationSupervisor.qualifications.type === 'replenishmentClassAttendees'
            ? 492
            : 518,
        154,
        18,
    )
    if (data.foodSanitationSupervisor.qualifications.type === 'others')
        drawText(data.foodSanitationSupervisor.qualifications.others, 545, 158, 8)
    drawText(acquisitionDate.format('YYYY'), 338, 137, 12)
    drawText(acquisitionDate.format('MM').replace(/^0/, ''), 405, 137, 12)
    drawText(acquisitionDate.format('MM').replace(/^0/, ''), 450, 137, 12)
    drawText(data.foodSanitationSupervisor.qualifications.number, 515, 137, 10)

    return pdf
}
