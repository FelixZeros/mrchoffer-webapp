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
      name: z.string(),
      department: z.string(),
      phone: z.string(),
      NIT: z.string(),
      city: z.string(),
      whatsapp: z.string(),
      email: z.string().email(),
      password: z.string(),
      confirm_password: z.string()
    })
    .superRefine(({ confirm_password, password }, ctx) => {
      if (confirm_password !== password) {
        ctx.addIssue({
          code: 'custom',
          message: 'The passwords did not match'
        })
      }
    })

  type schema = z.infer<typeof validationSchema>
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<schema>({
    resolver: zodResolver(validationSchema)
  })

  const [userCreated, setUserCreated] = useState<any>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

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
      .catch(error => console.log(error))
  }

  useEffect(() => {
    setTimeout(() => setUserCreated(null), 6000)
  }, [userCreated])

  const isDisable = isLoading || !!userCreated

  return (
    <main>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='grid justify-center'>
          <div className='grid grid-cols-2 gap-6'>
            <div className='col-span-1 grid gap-11'>
              <input
                {...register('name')}
                type='text'
                className='w-full rounded-lg bg-white shadow p-2'
                placeholder='Nombre'
              />
              <select
                {...register('department')}
                className='w-full shadow p-2 rounded-lg bg-white text-black'
              >
                <option value=''>Departamento</option>
                <option value='cesar'>Cesar</option>
              </select>
              <input
                {...register('phone')}
                type='text'
                className='w-full rounded-lg bg-white shadow p-2'
                placeholder='Teléfono'
              />
              <input
                {...register('email')}
                type='text'
                className='w-full rounded-lg bg-white shadow p-2'
                placeholder='Correo'
              />
            </div>
            <div className='col-span-1 grid gap-10'>
              <input
                {...register('NIT')}
                type='text'
                className='w-full rounded-lg bg-white shadow p-2'
                placeholder='NIT'
              />
              <select
                {...register('city')}
                className='w-full shadow p-2 rounded-lg bg-white text-black'
              >
                <option value=''>Ciudad</option>
                <option value='valledupar'>valledupar</option>
              </select>
              <input
                {...register('whatsapp')}
                type='text'
                className='w-full rounded-lg bg-white shadow p-2'
                placeholder='Whatsapp'
              />
              <input
                {...register('password')}
                type='password'
                className='w-full rounded-lg bg-white shadow p-2'
                placeholder='Contraseña'
              />
              <input
                {...register('confirm_password')}
                type='password'
                className='w-full rounded-lg bg-white shadow p-2'
                placeholder='Confirmar contraseña'
              />
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
        <div className='p-5 rounded-lg bg-white shadow-lg'>
          Usuario creado con exito!
        </div>
      )}
    </main>
  )
}
