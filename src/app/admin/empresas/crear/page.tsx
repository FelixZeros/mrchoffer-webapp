'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as z from 'zod'
export default function CreateCompanyPage() {
  const validationSchema = z
    .object({
      name: z.string().refine(value => value.trim() !== '', {
        message: 'Este campo es requerido'
      }),
      department: z.string().refine(value => value.trim() !== '', {
        message: 'Este campo es requerido'
      }),
      phone: z.string().refine(value => value.trim() !== '', {
        message: 'Este campo es requerido'
      }),
      NIT: z.string().refine(value => value.trim() !== '', {
        message: 'Este campo es requerido'
      }),
      city: z.string().refine(value => value.trim() !== '', {
        message: 'Este campo es requerido'
      }),
      whatsapp: z.string().refine(value => value.trim() !== '', {
        message: 'Este campo es requerido'
      }),
      email: z
        .string()
        .email('Ingrese un correo válido')
        .refine(value => value.trim() !== '', {
          message: 'Este campo es requerido'
        }),
      password: z.string().refine(value => value.trim() !== '', {
        message: 'Este campo es requerido'
      }),
      confirm_password: z.string().refine(value => value.trim() !== '', {
        message: 'Este campo es requerido'
      })
    })
    .refine(data => data.password === data.confirm_password, {
      message: 'Las contraseñas no coinciden',
      path: ['confirm_password']
    })

  type schema = z.infer<typeof validationSchema>
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<schema>({
    resolver: zodResolver(validationSchema)
  })

  const [userCreated, setUserCreated] = useState<any>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<any>()

  const onSubmit: SubmitHandler<schema> = async data => {
    setIsLoading(true)
    await axios
      .post(`${process.env.NEXT_PUBLIC_API + 'create-user'}`, {
        email: data.email,
        password: data.password,
        type: 'company',
        name: data.name,
        address: 'TV 27 # 19 A 60',
        city: 'Valledupar',
        phone: data.phone,
        photo:
          'https://cu.epm.com.co/Portals/institucional/EasyDNNnews/105/img-ejercicio9.jpg'
      })
      .then(response => {
        if (!response.data.isOk) return
        console.log(response.data)
        setUserCreated(response.data.user)
        setIsLoading(false)
      })
      .catch(error => setError(error))
      .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    setTimeout(() => {
      setUserCreated(null)
      setError(null)
    }, 6000)
  }, [userCreated])

  const isDisable = isLoading || !!userCreated

  return (
    <main>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='grid justify-center'>
          <div className='grid grid-cols-2 gap-6'>
            <div className='col-span-1 grid gap-11'>
              <div className='flex gap-2'>
                <input
                  {...register('name')}
                  type='text'
                  className='w-full rounded-lg bg-white shadow p-2'
                  placeholder='Nombre'
                />
                {errors.name !== undefined && (
                  <p className='text-red-700 font-medium mt-2'>
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div className='flex gap-2'>
                <select
                  {...register('department')}
                  className='w-full shadow p-2 rounded-lg bg-white text-black'
                >
                  <option value=''>Departamento</option>
                  <option value='cesar'>Cesar</option>
                </select>
                {errors.department !== undefined && (
                  <p className='text-red-700 font-medium mt-2'>
                    {errors.department.message}
                  </p>
                )}
              </div>
              <div className='flex gap-2'>
                <input
                  {...register('phone')}
                  type='text'
                  className='w-full rounded-lg bg-white shadow p-2'
                  placeholder='Teléfono'
                />
                {errors.phone !== undefined && (
                  <p className='text-red-700 font-medium mt-2'>
                    {errors.phone.message}
                  </p>
                )}
              </div>
              <div className='flex gap-2'>
                <input
                  {...register('email')}
                  type='text'
                  className='w-full rounded-lg bg-white shadow p-2'
                  placeholder='Correo'
                />
                {errors.email !== undefined && (
                  <p className='text-red-700 font-medium mt-2'>
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>
            <div className='col-span-1 grid gap-10'>
              <div className='flex gap-2'>
                <input
                  {...register('NIT')}
                  type='text'
                  className='w-full rounded-lg bg-white shadow p-2'
                  placeholder='NIT'
                />
                {errors.NIT !== undefined && (
                  <p className='text-red-700 font-medium mt-2'>
                    {errors.NIT.message}
                  </p>
                )}
              </div>
              <div className='flex gap-2'>
                <select
                  {...register('city')}
                  className='w-full shadow p-2 rounded-lg bg-white text-black'
                >
                  <option value=''>Ciudad</option>
                  <option value='valledupar'>valledupar</option>
                </select>
                {errors.city !== undefined && (
                  <p className='text-red-700 font-medium mt-2'>
                    {errors.city.message}
                  </p>
                )}
                <input
                  {...register('whatsapp')}
                  type='text'
                  className='w-full rounded-lg bg-white shadow p-2'
                  placeholder='Whatsapp'
                />
                {errors.whatsapp !== undefined && (
                  <p className='text-red-700 font-medium mt-2'>
                    {errors.whatsapp.message}
                  </p>
                )}
              </div>
              <div className='flex gap-2'>
                <input
                  {...register('password')}
                  type='password'
                  className='w-full rounded-lg bg-white shadow p-2'
                  placeholder='Contraseña'
                />
                {errors.password !== undefined && (
                  <p className='text-red-700 font-medium mt-2'>
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className='flex gap-2'>
                <input
                  {...register('confirm_password')}
                  type='password'
                  className='w-full rounded-lg bg-white shadow p-2'
                  placeholder='Confirmar contraseña'
                />
                {errors.confirm_password !== undefined && (
                  <p className='text-red-700 font-medium mt-2'>
                    {errors.confirm_password.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className='flex justify-center gap-2 my-5'>
            <Link href={'admin/empresas'}>
              <button
                type='button'
                className='bg-gray-300 px-5 py-2 py rounded-lg font-bold shadow text-black'
              >
                Cancelar
              </button>
            </Link>

            <button
              disabled={isDisable}
              type='submit'
              className='bg-[--main-yellow] disabled:bg-gray-400 px-5 py-2 py rounded-lg font-bold shadow text-black'
            >
              {!isLoading ? 'Continuar' : 'Creando...'}
            </button>
          </div>
        </div>
      </form>

      {userCreated && (
        <div className='p-5 my-1 rounded-lg bg-white shadow-lg'>
          Usuario creado con exito!
        </div>
      )}
      {error && (
        <div className='p-5 my-1 rounded-lg bg-white shadow-lg'>
          {JSON.stringify(error.message)}
        </div>
      )}
    </main>
  )
}
