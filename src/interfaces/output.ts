
export interface Driver {
    id: number
    companyId: number
    driverId: number
    status: number
    comment: string
    createdAt: string
    updatedAt: string
    company: {
      id: number
      userId: number
      name: string
      address: string
      city: string
      phone: string
      photo: string
    }
    driver: {
      id: 1
      userId: 2
      identification: string
      name: string
      gender: string
      photoDriverLicenseBack: string
      photoDriverLicenseFront: string
      photoIdentificationBack: string
      photoIdentificationFront: string
      city: string
      phone: string
      photo: null
    }
  }