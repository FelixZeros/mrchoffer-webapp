import React from 'react'
import { RequestDriver } from '@/app/carrera/components/RequestDriver'
import { PersonalInfoRequest } from './PersonalInfoRequest'
import { TripInfoRequest } from './TripInfoRequest'
import { MapInfoRequest } from './MapInfoRequest'
import { PaymentInfoRequest } from './PaymentInfoRequest'
import { CommentInfoRequest } from './CommentInfoRequest'

type RenderProps = {
  render: string
  handleRender?: any
}

const RenderComponent = ({ render, handleRender }: RenderProps) => {
  switch (render) {
    case 'StartRequest':
      return <RequestDriver handleRender={handleRender} />
    case 'PersonalInfoRequest':
      return <PersonalInfoRequest handleRender={handleRender} />
    case 'TripInfoRequest':
      return <TripInfoRequest handleRender={handleRender} />
    case 'MapInfoRequest':
      return <MapInfoRequest handleRender={handleRender} />
    case 'PaymentInfoRequest':
      return <PaymentInfoRequest handleRender={handleRender} />
    case 'CommentInfoRequest':
      return <CommentInfoRequest handleRender={handleRender} />

    default:
      return <RequestDriver handleRender={handleRender} />
  }
}

export default RenderComponent
