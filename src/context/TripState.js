'use client'
import React, { useReducer, useEffect } from 'react'
import TripContext from './TripContext'
import TripReducer from './TripReducer'
import toast from 'react-hot-toast'
import io from 'socket.io-client'
import { randomUUID } from 'crypto'

const TripState = ({ children }) => {
  const initialState = {
    companyId: '',
    name: '',
    phone: '',
    gender: '',
    origin: '',
    destination: '',
    paymentMethod: '',
    comment: '',
    socket: null,
    price: 0,
    priceModified: false,
    distance: null,
    amountPassanger: null,
    originCoords: null,
    destinationCoords: null,
    selected: null
  }

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_SOCKET_KEY)
    setSocket(socket)
  }, [])

  const [state, dispatch] = useReducer(TripReducer, initialState)

  const setName = name => {
    dispatch({
      type: 'SET_NAME',
      payload: name
    })
  }

  const setSocket = socket => {
    dispatch({
      type: 'SET_SOCKET',
      payload: socket
    })
  }
  const setPhone = phone => {
    dispatch({
      type: 'SET_PHONE',
      payload: phone
    })
  }

  const setGender = gender => {
    dispatch({
      type: 'SET_GENDER',
      payload: gender
    })
  }

  const setOrigin = origin => {
    dispatch({
      type: 'SET_ORIGIN',
      payload: origin
    })
  }

  const setDestination = destination => {
    dispatch({
      type: 'SET_DESTINATION',
      payload: destination
    })
  }

  const setOriginCoords = originCoords => {
    dispatch({
      type: 'SET_ORIGIN_COORDS',
      payload: originCoords
    })
  }

  const setDestinationCoords = destinationCoords => {
    dispatch({
      type: 'SET_DESTINATION_COORDS',
      payload: destinationCoords
    })
  }
  const setSelected = selected => {
    dispatch({
      type: 'SET_SELECTED',
      payload: selected
    })
  }
  const setPaymentMethod = paymentMethod => {
    dispatch({
      type: 'SET_PAYMENT_METHOD',
      payload: paymentMethod
    })
  }
  const setComment = comment => {
    dispatch({
      type: 'SET_COMMENT',
      payload: comment
    })
  }

  const setPrice = price => {
    dispatch({
      type: 'SET_PRICE',
      payload: price
    })
  }

  const setStatePrice = priceModified => {
    dispatch({
      type: 'SET_STATE_PRICE',
      payload: priceModified
    })
  }

  const setCompanyId = companyId => {
    dispatch({
      type: 'SET_COMPANY_ID',
      payload: companyId
    })
  }

  const setDistance = distance => {
    dispatch({
      type: 'SET_DISTANCE',
      payload: distance
    })
  }

  const setAmountPassanger = amountPassanger => {
    dispatch({
      type: 'SET_AMOUNT_PASSANGER',
      payload: amountPassanger
    })
  }

  const sendRequest = async () => {
    if (state.name === '' || state.origin === '' || state.price === 0) {
      toast.error(
        'Falta completar la información para poder enviar la solicitud de carrera.'
      )
    } else {
      const newTrip = {
        date: new Date().toLocaleDateString(),
        idFront: self.crypto.randomUUID(),
        status: 1,
        name: state.name.trim().toUpperCase(),
        companyId: state.companyId,
        textOrigin: state.origin,
        latitudeOrigin: state.originCoords.latitude,
        longitudeOrigin: state.originCoords.longitude,
        textDestination: state.destination,
        latitudeDestination: state.destinationCoords.latitude,
        longitudeDestination: state.destinationCoords.longitude,
        distance: state.distance,
        price: state.price,
        paymentMethod: state.paymentMethod,
        genderPassenger: state.gender,
        amountPassanger: state.amountPassanger,
        comment: state.comment,
        phoneNumber: state.phone,
        startTime: new Date().toLocaleTimeString(),
        attempt: 1
      }

      if (newTrip.attempt === 1) {
        toast.success(
          'Se ha enviado una solicitud con éxito, espere su confirmación por favor.',
          {
            duration: 60 * 1000 * 5
          }
        )
        console.log(newTrip)
        state.socket.emit('client:request-trip', newTrip)
        setTimeout(() => {
          setStatePrice(true)
          state.socket.emit('client:request-trip', {
            ...newTrip,
            attempt: 2
          })
        }, 30000)
      }
      return newTrip
    }
  }

  return (
    <TripContext.Provider
      value={{
        name: state.name,
        amountPassanger: state.amountPassanger,
        phone: state.phone,
        gender: state.gender,
        origin: state.origin,
        destination: state.destination,
        originCoords: state.originCoords,
        distance: state.distance,
        destinationCoords: state.destinationCoords,
        selected: state.selected,
        paymentMethod: state.paymentMethod,
        comment: state.comment,
        price: state.price,
        socket: state.socket,
        setName,
        setAmountPassanger,
        setPhone,
        setGender,
        setOrigin,
        setDestination,
        setOriginCoords,
        setDestinationCoords,
        setPaymentMethod,
        setComment,
        setPrice,
        sendRequest,
        setDistance,
        setCompanyId,
        setSelected
      }}
    >
      {children}
    </TripContext.Provider>
  )
}

export default TripState
