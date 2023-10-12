'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useMutation } from '@tanstack/react-query'
import React, { type FC } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import Image from "next/image";
import logo from "@/assets/logo.png";
import Link from "next/link";

const schema = z
  .object({
    password: z
      .string()
      .min(8, 'La contraseña debe tener al menos 8 caracteres'),
    confirmPassword: z
      .string()
      .min(8, 'La contraseña debe tener al menos 8 caracteres')
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword']
  })

type PasswordResetFormValues = z.infer<typeof schema>

const PasswordResetPage: FC = () => {
  const {register, handleSubmit, formState} =
    useForm<PasswordResetFormValues>({
      resolver: zodResolver(schema)
    })

  const client = useSupabaseClient()

  const {mutate} = useMutation(
    async (data: PasswordResetFormValues) => {
      const {data: result, error} = await client.auth.updateUser({
        password: data.password
      })

      if (error != null) {
        throw error
      }

      return result
    },
    {
      onSuccess: () => {
        alert('Contraseña actualizada')
      }
    }
  )

  const onSubmit: SubmitHandler<PasswordResetFormValues> = data => {
    mutate(data)
  }

  return (
    <div className='min-h-screen flex justify-center items-center'>
      <div className='w-full max-w-lg p-6 bg-white rounded-lg '>
        <div className='flex justify-center mb-5'>
          <Image src={logo} alt='logo'/>
        </div>
        <h1 className='w-full font-bold text-center mb-5 text-3xl'>RESTABLECER CONTRASEÑA</h1>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>

          <div className=''>
            <label htmlFor='password' className='block text-gray-700'></label>
            <input
              type='password'
              id='password'
              className='input-style w-full px-4 py-2 border rounded-xl drop-shadow outline-none text-xl'
              {...register('password')}
              disabled={formState.isSubmitting}
              placeholder='NUEVA CONTRASEÑA'
            />
            {formState.errors.password && (
              <span className='text-red-500 text-sm mt-1'>
              {formState.errors.password.message}
            </span>
            )}
          </div>

          <div className=''>
            <label htmlFor='confirmPassword' className='block text-gray-700'></label>
            <input
              type='password'
              id='confirmPassword'
              className='input-style w-full px-4 py-2 border rounded-xl drop-shadow outline-none text-xl'
              {...register('confirmPassword')}
              disabled={formState.isSubmitting}
              placeholder='CONFIRMAR CONTRASEÑA'
            />
            {formState.errors.confirmPassword && (
              <span className='text-red-500 text-sm mt-1'>
              {formState.errors.confirmPassword.message}
            </span>
            )}
          </div>

          <div className='mb-5'>
            <Link href=''>
              <strong>
              <p>INICIAR SESSION</p>
              </strong>
            </Link>
          </div>

          <div className='text-center flex justify-center'>
            <button
              type='submit'
              className='w-full block bg-yellow-400 text-sm text-black px-4 py-3 mt-2 rounded-lg focus:bg-blue-700 focus:ring-0 focus:ring-blue-300 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-neutral-800 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed'
              disabled={formState.isSubmitting}
            >
              <strong>RESTABLECER CONTRASEÑA</strong>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PasswordResetPage
