'use client'
import React, { useEffect, useState } from 'react'
import { Table } from 'antd'
import Image from 'next/image'
import { EyeIcon } from '@/components/icons/eye'
import Link from 'next/link'

const Page = () => {
  const [trips, setTrips] = useState([])
  const [current, setCurrent] = useState(1)

  useEffect(() => {
    async function getTrips() {
      const res = await fetch(process.env.NEXT_PUBLIC_API + '/get-trips')
      const data = await res.json()
      setTrips(data)
    }
    getTrips()
  }, [])

  return (
    <>
      <div>
        <h1 className='font-bold text-3xl uppercase'>Historial de viajes</h1>
      </div>
      <Table
        dataSource={trips}
        className='shadow-md rounded-2xl uppercase font-semibold w-full mt-10'
        pagination={{
          total: trips?.length > 0 ? trips?.length : 0,
          pageSize: 5,
          current,
          onChange: (page: number) => {
            setCurrent(page)
          },
          showSizeChanger: false
        }}
      >
        <Table.Column
          render={record => (
            <Link href={`/company/solicitudes/${record?.id}`} key={record?.id}>
              Solicitud #{record?.id}
            </Link>
          )}
        />
        <Table.Column
          title='Acciones'
          render={(text, record) => (
            <div
              className='flex flex-row items-center gap-4'
              // onClick={() => {
              //   router.push(`/admin/empresas/${record?.username}`)
              // }}
            >
              <Link href={`https://wa.me/+57${record?.driver?.phone}`}>
                <Image
                  src='/images/whatsapp.png'
                  width={17}
                  height={17}
                  alt='whatsapp'
                  className='cursor-pointer'
                />
              </Link>
              <Image
                alt='phone'
                src='/images/phone.png'
                width={18}
                height={18}
                className='cursor-pointer'
              />
            </div>
          )}
        />
      </Table>
    </>
  )
}

export default Page
