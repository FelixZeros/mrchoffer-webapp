import { useState } from 'react'

const useRegister = () => {
  const [step, setStep] = useState<number>(1)
  const [company, setCompany] = useState<any>(null)
  const [name, setName] = useState<any>(null)
  const [username, setUsername] = useState<any>(null)
  const [phone, setPhone] = useState<any>(null)
  const [address, setAddress] = useState<any>(null)
  const [department, setDepartment] = useState<any>('Cesar')
  const [city, setCity] = useState<any>(null)
  const [photo, setPhoto] = useState<any>(null)
  const [email, setEmail] = useState<any>(null)
  const [password, setPassword] = useState<any>(null)
  const [confirmPassword, setConfirmPassword] = useState<any>(null)
  const [visible, setVisible] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [typePerson, setTypePerson] = useState<any>(null)
  const [typeDocument, setTypeDocument] = useState<any>(null)
  const [document, setDocument] = useState<any>(null)
  const [visibleError, setVisibleError] = useState<boolean>(false)

  const handleForms = async (e: any, stepForm?: any) => {
    e.preventDefault()
    if (stepForm === 1) {
      setCompany({
        name,
        username,
        phone,
        address,
        department,
        city,
        photo,
        document,
        typeDocument,
        typePerson
      })
      setStep(2)
    }
    if (stepForm === 2) {
      if (password === confirmPassword) {
        setCompany({
          ...company,
          type: 'company',
          email,
          password
        })
        await fetch((process.env.NEXT_PUBLIC_API as string) + 'create-user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ ...company, type: 'company', email, password })
        }).then(res => {
          if (res.status === 201) {
            setVisible(true)
          } else {
            setVisibleError(true)
          }
        })
      }
    }
  }
  return {
    step,
    setStep,
    handleForms,
    name,
    setName,
    username,
    setUsername,
    phone,
    setPhone,
    address,
    setAddress,
    department,
    setDepartment,
    city,
    setCity,
    photo,
    setPhoto,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    visible,
    setVisible,
    error,
    setError,
    visibleError,
    document,
    setDocument,
    typeDocument,
    setTypeDocument,
    typePerson,
    setTypePerson,
    setVisibleError
  }
}

export default useRegister
