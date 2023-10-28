import { RequestTrip } from '@/interfaces/input'
import axios from 'axios'
import { useState } from 'react'

interface Props {
  values: {
    pickUpLocation: string
    destinationLocation: string
    distance: number
    cellphone: string
    offeredPrice: string
    gender: string
    comments: string
    paymentMethod: string
    name: string
  }
  setErrors: React.Dispatch<unknown>
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  setRequestMade: React.Dispatch<React.SetStateAction<boolean>>
}

const ahora = new Date()
const hora = ahora.getHours()
const minutos = ahora.getMinutes()
const segundos = ahora.getSeconds()

export const CreateTrip = async ({
  values,
  setErrors,
  setLoading,
  setRequestMade
}: Props) => {
  setLoading(true)
  await axios
    .post<RequestTrip>(process.env.NEXT_PUBLIC_API + 'request-trip', {
      date: new Date(),
      status: 1,
      origin: values.pickUpLocation,
      name: values.name,
      destination: values.destinationLocation,
      distance: values.distance || 0,
      phoneNumber: values.cellphone,
      price: Number(values.offeredPrice),
      genderPassenger: values.gender,
      comment: values.comments,
      paymentMethod: values.paymentMethod,
      startTime: `${hora}:${minutos}:${segundos}`
    })
    .then(res => {
      if (res.status) setRequestMade(true)
    })
    .catch(err => setErrors(err))
    .finally(() => {
      setLoading(false)
    })
}
