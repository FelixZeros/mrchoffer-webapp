'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React, { type FC, useEffect, useState, useContext } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import Image from 'next/image'
import logo from '@/assets/logo.png'
import { CloseEye, Eyes } from '@/components/icons/eyes'
import Link from 'next/link'
import { AuthContext } from '@/auth/Auth-context'
const HomePage: FC = () => {
  const router = useRouter()
  const SignInSchema = z.object({
    email: z.string().email('El email no es válido'),
    password: z
      .string()
      .min(5, 'La contraseña debe tener al menos 5 caracteres')
  })

  type SignInFormValues = z.infer<typeof SignInSchema>

  const { loginUser } = useContext(AuthContext)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<any>(null)
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<SignInFormValues>({
    resolver: zodResolver(SignInSchema)
  })

  const onSubmit: SubmitHandler<SignInFormValues> = async data => {
    try {
      setIsLoading(true)
      const IsValidLogin = await loginUser(data.email, data.password)

      if (!IsValidLogin) {
        setError('Correo y/o contraseña incorrectos')
        return
      }
      if (IsValidLogin.isLogged) {
        if (IsValidLogin.userSave.type === 'company') {
          router.push('/company/solicitudes')
        }
        if (IsValidLogin.userSave.type === 'admin') {
          router.push('/admin/empresas')
        }
      }
    } catch (err) {
      setError(err)
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    setTimeout(() => setError(null), 5000)
  }, [error])

  const isDisabled = isSubmitting || isLoading

  return (
    <main className='h-screen p-0 m-0'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex w-full justify-center h-full'
      >
        <Image
          src='/images/hero-img.png'
          alt='hero'
          className='object-cover w-1/2'
          width={600}
          height={600}
        />
        <div className='w-1/2 flex flex-col justify-center px-28 xl:px-44'>
          <div className='mb-4'>
            <div className='flex justify-center mb-11'>
              <Image src={logo} alt='logo' />
            </div>
            <h1 className='flex justify-center text-4xl mb-4'>
              <strong>INICIAR SESION</strong>
            </h1>
            <div className='text-center mb-3'>
              {error !== null && <span className='text-red-600'>{error}</span>}
            </div>

            <div>
              <input
                type='text'
                className='w-full px-4 py-2 border rounded-xl drop-shadow outline-none text-xl'
                {...register('email')}
                disabled={isDisabled}
                placeholder='EMAIL'
              />
              {errors.email !== undefined && (
                <p className='text-red-700 font-medium mt-2'>
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div className='mb-4 relative flex'>
            <div className='w-full'>
              <input
                className=' pr-12 pl-3 w-full py-2 border  rounded-xl drop-shadow outline-none text-lg'
                {...register('password')}
                disabled={isDisabled}
                placeholder='CONTRASEÑA'
                type={showPassword ? 'text' : 'password'}
                id='password'
              />
              <button
                type='button'
                className='absolute right-0 px-3 py-2 h-11 bg-transparent border-l border-gray-300 border-none '
                onClick={handleTogglePasswordVisibility}
              >
                {showPassword ? <Eyes /> : <CloseEye />}
              </button>
            </div>
          </div>
          {errors.password !== undefined && (
            <p className='text-red-700 font-medium mt-2'>
              {errors.password.message}
            </p>
          )}
          <div className='mb-5'>
            <Link href='password-reset'>
              <strong>
                <p>OLVIDE MI CONTRASEÑA</p>
              </strong>
            </Link>
          </div>
          <div className='w-full flex justify-center'>
            <button
              type='submit'
              disabled={isDisabled}
              className='block text-lg px-4 py-3 mt-2 rounded-lg bg-yellow-400 text-black hover:bg-blue-700 focus:bg-blue-700 focus:ring-0 outline-none disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed w-4/12'
            >
              <strong>{!isLoading ? 'Ingresar' : 'Ingresando...'}</strong>
            </button>
          </div>
        </div>
      </form>
    </main>
  )
}

export default HomePage
