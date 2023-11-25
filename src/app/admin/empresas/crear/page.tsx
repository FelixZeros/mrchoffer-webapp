'use client'
import React, { useState } from 'react'
import { Input, Modal, Select } from 'antd'
import { Slide } from 'react-awesome-reveal'
import useRegister from './useRegister'
import { useRouter } from 'next/navigation'
const CreateCompany = () => {
  const router = useRouter()
  const {
    step,
    setStep,
    handleForms,
    name,
    setName,
    setUsername,
    setPhone,
    setAddress,
    setDepartment,
    setCity,
    setPhoto,
    setEmail,
    password,
    setPassword,
    setConfirmPassword,
    error,
    setError,
    visible,
    setVisible,
    visibleError,
    setDocument,
    setTypeDocument,
    setTypePerson,
    setVisibleError
  } = useRegister()

  return (
    <>
      <Modal
        visible={visible}
        onCancel={() => {
          setVisible(false)
          router.push('/admin/empresas')
        }}
        footer={null}
      >
        <div className='flex flex-col justify-center items-center'>
          <h2 className='text-2xl font-bold'>Creación Exitosa</h2>
          <p className='text-lg mt-5'>
            La empresa {name} ha sido creada exitosamente
          </p>
          <button
            className='bg-[#FFB800] uppercase font-bold px-5 py-2 rounded-lg shadow-md mt-5'
            onClick={() => {
              setVisible(false)
              router.push('/admin/empresas')
            }}
          >
            <p>Continuar</p>
          </button>
        </div>
      </Modal>

      <Modal
        visible={visibleError}
        onCancel={() => {
          setVisibleError(false)
          router.push('/admin/empresas')
        }}
        footer={null}
      >
        <div className='flex flex-col justify-center items-center'>
          <h2 className='text-2xl font-bold'>¡Ha ocurrido un error!</h2>
          <p className='text-lg mt-5'>
            La empresa {name} no ha sido creada, por favor intente de nuevo
          </p>
          <button
            className='bg-[#FFB800] uppercase font-bold px-5 py-2 rounded-lg shadow-md mt-5'
            onClick={() => {
              setVisibleError(false)
              router.push('/admin/empresas')
            }}
          >
            <p>Continuar</p>
          </button>
        </div>
      </Modal>

      <section>
        <h1 className='text-2xl font-bold uppercase mt-14'>Crear empresa</h1>
        {step === 1 && (
          <Slide direction='right'>
            <form
              className='flex flex-col'
              onSubmit={e => {
                handleForms(e, 1)
              }}
            >
              <div className='flex flex-row mt-14 justify-center gap-32'>
                <div className='flex flex-col w-1/3 gap-4'>
                  <Input
                    placeholder='Nombre'
                    className='w-full uppercase font-bold shadow-md placeholder:text-black'
                    size='large'
                    onChange={(e: any) => {
                      setName(e.target.value)
                    }}
                    required
                  />
                  <Input
                    placeholder='Link de carreras'
                    className='w-full uppercase font-bold shadow-md placeholder:text-black'
                    size='large'
                    onChange={(e: any) => {
                      setUsername(e.target.value)
                    }}
                    required
                  />
                  <Input
                    placeholder='WhatsApp'
                    className='w-full uppercase font-bold shadow-md placeholder:text-black'
                    size='large'
                    type='number'
                    onChange={(e: any) => {
                      setPhone(e.target.value)
                    }}
                    required
                  />
                  <Input
                    placeholder='Dirección'
                    className='w-full uppercase font-bold shadow-md placeholder:text-black'
                    size='large'
                    onChange={(e: any) => {
                      setAddress(e.target.value)
                    }}
                    required
                  />
                  <Input
                    size='large'
                    placeholder='URL Foto de Perfil'
                    onChange={(e: any) => {
                      setPhoto(e.target.value)
                    }}
                    required
                    className='w-full uppercase font-bold shadow-md placeholder:text-black'
                  />
                </div>
                <div className='flex flex-col w-1/3 gap-4'>
                  <Select
                    placeholder='Departamento'
                    className='w-full uppercase font-bold shadow-md'
                    size='large'
                    onChange={(e: any) => {
                      setDepartment(e)
                    }}
                    options={[
                      { label: 'Cesar', value: 'Cesar' },
                      { label: 'Guajira', value: 'Guajira' }
                    ]}
                  />
                  <Select
                    placeholder='Tipo de persona'
                    className='w-full uppercase font-bold shadow-md'
                    size='large'
                    onChange={(e: any) => {
                      setTypePerson(e)
                    }}
                    options={[
                      { label: 'Natural', value: 'Natural' },
                      { label: 'Juridica', value: 'Juridica' }
                    ]}
                  />
                  <Select
                    placeholder='Ciudad'
                    size='large'
                    className='w-full uppercase font-bold shadow-md'
                    onChange={(e: any) => {
                      setCity(e)
                    }}
                    options={[
                      { label: 'Valledupar', value: 'Valledupar' },
                      { label: 'La Jagua', value: 'La Jagua' }
                    ]}
                  />
                  <Select
                    placeholder='Tipo de documento'
                    className='w-full uppercase font-bold shadow-md'
                    size='large'
                    onChange={(e: any) => {
                      setTypeDocument(e)
                    }}
                    options={[
                      { label: 'Cédula', value: 'Cédula' },
                      { label: 'Nit', value: 'Nit' },
                      {
                        label: 'Cedúla de extranjería',
                        value: 'Cedúla de extranjería'
                      }
                    ]}
                  />
                  <Input
                    size='large'
                    placeholder='N° de documento'
                    onChange={(e: any) => {
                      setDocument(e.target.value)
                    }}
                    required
                    className='w-full uppercase font-bold shadow-md placeholder:text-black'
                  />
                </div>
              </div>
              <div className='flex flex-row justify-center gap-24 items-center mt-10'>
                <button
                  className='bg-[#D9D9D9] uppercase font-bold px-5 py-2 rounded-lg shadow-md'
                  onClick={(e: any) => {
                    e.preventDefault()
                    router.push('/admin/empresas')
                  }}
                >
                  Cancelar
                </button>
                <button className='bg-[#FFB800] uppercase font-bold px-5 py-2 rounded-lg shadow-md'>
                  <p>Siguiente</p>
                </button>
              </div>
            </form>
          </Slide>
        )}
        {step === 2 && (
          <Slide direction='right'>
            <div className='w-full flex justify-center'>
              <form
                className='flex flex-col w-1/2  mt-14 justify-center gap-4'
                onSubmit={e => {
                  handleForms(e, 2)
                }}
              >
                <Input
                  placeholder='CORREO ELECTRÓNICO'
                  className='w-full uppercase font-bold shadow-md placeholder:text-black'
                  size='large'
                  onChange={(e: any) => {
                    setEmail(e.target.value)
                  }}
                  required
                />
                <Input
                  placeholder='CONTRASEÑA'
                  size='large'
                  className='w-full uppercase font-bold shadow-md placeholder:text-black'
                  type='password'
                  onChange={(e: any) => {
                    setPassword(e.target.value)
                  }}
                  required
                />
                {error && (
                  <p className='text-red-500'>
                    Las contraseñas no coinciden, por favor verifique
                  </p>
                )}
                <Input
                  placeholder='CONFIRMAR CONTRASEÑA'
                  size='large'
                  className='w-full uppercase font-bold shadow-md placeholder:text-black'
                  type='password'
                  onChange={(e: any) => {
                    setConfirmPassword(e.target.value)
                    if (e.target.value !== password) {
                      setError(true)
                    } else {
                      setError(false)
                    }
                  }}
                  required
                />
                <div className='flex flex-row justify-center gap-10 items-center mt-10'>
                  <button
                    className='bg-[#D9D9D9] uppercase font-bold px-7 py-2 rounded-lg shadow-md'
                    onClick={() => {
                      setStep(1)
                    }}
                  >
                    Atrás
                  </button>
                  <button className='bg-[#FFB800] uppercase font-bold px-7 py-2 rounded-lg shadow-md'>
                    <p>Crear</p>
                  </button>
                </div>
              </form>
            </div>
          </Slide>
        )}
      </section>
    </>
  )
}

export default CreateCompany
