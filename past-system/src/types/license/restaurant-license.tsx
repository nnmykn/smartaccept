export type TRestaurantLicense = {
  type: 'new' | 'continuation'
  date: string // 日付
  healthCentre: {
    // 保健所の情報
    name: string
    postalCode: string
    phoneNumber: string
  }
  applicant: {
    // 申請者の情報
    address: string
    ruby: string
    fullname: string
    birthday: string
  }
  salesOffice: {
    // 営業所の情報
    address: string
    phoneNumber: string
    name: string
    sales: {
      // 申請する業種
      type: string
      remarks: string
    }[]
  }
  disqualification: {
    // 欠格事項
    1: string | undefined
    2: string | undefined
  }
  foodSanitationSupervisor: {
    // 食品衛生責任者
    fullname: string
    qualifications: {
      type:
        | 'nutritionist' // 栄養士
        | 'cook' // 調理師
        | 'licensedConfectioner' // 製菓衛生師
        | 'poultryProcessingHygieneManager' // 食鳥処理衛生管理者
        | 'shipCook' // 船舶料理士
        | 'foodHygieneManager' // 食品衛生管理者
        | 'foodSanitationInspector' // 食品衛生監視員
        | 'trainingClassParticipants' // 養成講習会受講者
        | 'replenishmentClassAttendees' // 補充講習会受講者
        | 'others'
      others: string
      date: string
      number: string
    }
  }
}
