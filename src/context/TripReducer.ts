export default (state: any, action: { type: string; payload: any }) => {
  switch (action.type) {
    case 'SET_NAME':
      return {
        ...state,
        name: action.payload
      }
    case 'SET_PHONE':
      return {
        ...state,
        phone: action.payload
      }
    case 'SET_GENDER':
      return {
        ...state,
        gender: action.payload
      }
    case 'SET_ORIGIN':
      return {
        ...state,
        origin: action.payload
      }
    case 'SET_DESTINATION':
      return {
        ...state,
        destination: action.payload
      }
    case 'SET_ORIGIN_COORDS':
      return {
        ...state,
        originCoords: action.payload
      }
    case 'SET_DESTINATION_COORDS':
      return {
        ...state,
        destinationCoords: action.payload
      }
    case 'SET_SELECTED':
      return {
        ...state,
        selected: action.payload
      }
    case 'SET_PAYMENT_METHOD':
      return {
        ...state,
        paymentMethod: action.payload
      }
    case 'SET_COMMENT':
      return {
        ...state,
        comment: action.payload
      }
    case 'SET_PRICE':
      return {
        ...state,
        price: action.payload
      }
    case 'SET_SOCKET':
      return {
        ...state,
        socket: action.payload
      }
    case 'SET_COMPANY_ID':
      return {
        ...state,
        companyId: action.payload
      }
    case 'SET_DISTANCE':
      return {
        ...state,
        distance: action.payload
      }
    case 'SET_AMOUNT_PASSANGER':
      return {
        ...state,
        amountPassanger: action.payload
      }
    default:
      return state
  }
}
