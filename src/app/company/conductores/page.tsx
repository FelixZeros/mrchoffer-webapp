'use client'
import { Table, Rate, Select } from 'antd'
import React, { useEffect, useState, useContext } from 'react'
import { useRouter } from 'next/navigation'
import { EyeIcon } from '@/components/icons/eye'
import { AuthContext } from '@/auth/Auth-context'
import Image from 'next/image'
import Link from 'next/link'

const Page = () => {
  const { user } = useContext(AuthContext)
  const router = useRouter()
  const [active, setActive] = useState<string>('Solicitudes')
  const [requests, setRequests] = useState<any>([])
  const [request, setRequest] = useState<any>(null)
  const [requestActive, setRequestActive] = useState<any>(null)
  const [requestRejected, setRequestRejected] = useState<any>(null)
  const [requestDisabled, setRequestDisabled] = useState<any>(null)
  const [requestBlocked, setRequestBlocked] = useState<any>(null)
  const [current, setCurrent] = useState<number>(1)
  const [filterRequest, setFilterRequest] = useState<any>(null)
  const [rating, setRating] = useState<any>(null)
  const [city, setCity] = useState<any>(null)
  const [gender, setGender] = useState<any>(null)
  const [numberTrips, setNumberTrips] = useState<any>(null)

  const getRequestDriverCompany = async () => {
    const response = await fetch(
      (process.env.NEXT_PUBLIC_API as string) +
        'request-driver-company/' +
        user?.company?.id
    )

    const requestDriverCompany = await response.json()
    setRequests(requestDriverCompany)
    const rq = requestDriverCompany?.filter(
      (request: any) => request.status === 1
    )
    const rqActive = requestDriverCompany?.filter(
      (request: any) => request.status === 2
    )
    const rqRejected = requestDriverCompany?.filter(
      (request: any) => request.status === 3
    )
    const rqDisabled = requestDriverCompany?.filter(
      (request: any) => request.status === 4
    )
    const rqBlocked = requestDriverCompany?.filter(
      (request: any) => request.status === 5
    )
    setRequest(rq)
    setRequestActive(rqActive)
    setRequestRejected(rqRejected)
    setRequestDisabled(rqDisabled)
    setRequestBlocked(rqBlocked)
  }

  useEffect(() => {
    getRequestDriverCompany()
  }, [])

  const handleFilter = () => {
    let filtered = [...requests]

    const filters = {
      city,
      rating,
      gender,
      numberTrips
    }

    Object.keys(filters).forEach(filterKey => {
      const filterValue = filters[filterKey]
      if (filterValue) {
        filtered = requests.filter(request => {
          request?.driver[filterKey] === filterValue
        })
        console.log(filtered)
      }
    })

    setActive('Filtro')
    setFilterRequest(filtered)
  }

  return (
    <section className='w-full flex flex-col justify-center items-center'>
      <>
        <BarActive active={active} setActive={setActive} />
        <div className='self-end w-full flex flex-row items-center justify-end gap-5 mt-10'>
          <Select
            className='w-1/5 uppercase'
            popupClassName='font-bold uppercase'
            placeholder='Ciudad'
            size='large'
            options={[
              { label: 'Todos', value: null },
              { label: 'Valledupar', value: 'Valledupar' },
              { label: 'Becerril', value: 'Becerril' }
            ]}
            onChange={e => {
              setCity(e)
            }}
          />
          <Select
            className='w-1/5 uppercase'
            popupClassName='font-bold uppercase'
            placeholder='Calificación'
            size='large'
            options={[
              { label: 'Todos', value: null },
              { label: '1 Estrella', value: 1 },
              { label: '2 Estrellas', value: 2 },
              { label: '3 Estrellas', value: 3 },
              { label: '4 Estrellas', value: 4 },
              { label: '5 Estrellas', value: 5 }
            ]}
            onChange={e => {
              setRating(e)
            }}
          />
          <Select
            className='w-1/5 uppercase'
            popupClassName='font-bold uppercase'
            placeholder='Género'
            size='large'
            options={[
              { label: 'Todos', value: null },
              { label: 'Masculino', value: 'Masculino' },
              { label: 'Femenino', value: 'Femenino' }
            ]}
            onChange={e => {
              setGender(e)
            }}
          />
          <Select
            className='w-1/5 uppercase'
            popupClassName='font-bold uppercase'
            placeholder='Número de carreras'
            size='large'
            options={[
              { label: 'Todos', value: null },
              { label: '1 carrera', value: 1 },
              { label: '5 o más', value: 5 },
              { label: '10 o más', value: 10 },
              { label: '20 o más', value: 20 },
              { label: '50 o más', value: 50 }
            ]}
            onChange={e => {
              setNumberTrips(e)
              console.log(e)
            }}
          />
          <button
            className='font-bold bg-[#FFD057] rounded-lg shadow-md uppercase px-4 py-2'
            onClick={() => {
              handleFilter()
            }}
          >
            Filtrar
          </button>
        </div>

        <Table
          dataSource={
            active === 'Solicitudes'
              ? request
              : active === 'Activas'
              ? requestActive
              : active === 'Rechazados'
              ? requestRejected
              : active === 'Inhabilitados'
              ? requestDisabled
              : active === 'Bloqueados'
              ? requestBlocked
              : active === 'Filtro'
              ? filterRequest
              : request
          }
          className='shadow-md rounded-2xl uppercase font-semibold w-full mt-10'
          pagination={{
            total:
              active === 'Solicitudes'
                ? request
                : active === 'Activas'
                ? requestActive
                : active === 'Rechazados'
                ? requestRejected
                : active === 'Inhabilitados'
                ? requestDisabled
                : active === 'Bloqueados'
                ? requestBlocked
                : active === 'Filtro'
                ? filterRequest
                : request,
            pageSize: 5,
            current,
            onChange: (page: number) => {
              setCurrent(page)
            },
            showSizeChanger: false
          }}
        >
          <Table.Column
            title='Nombre'
            dataIndex='name'
            key='name'
            render={(text, record) => <p>{record?.driver?.name}</p>}
          />
          <Table.Column
            title='Ciudad'
            dataIndex='city'
            key='city'
            render={(text, record) => <p>{record?.driver?.city}</p>}
          />
          <Table.Column
            title='Calificación'
            key='rating'
            render={(text, record: any) => (
              <Rate disabled value={record?.rating ?? 1} />
            )}
          />
          <Table.Column
            title='Número de carreras'
            dataIndex='name'
            key='name'
            render={(text, record) => <p>{record?.trips?.length}</p>}
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
                    className='cursor-pointer'
                  />
                </Link>
                <Image
                  src='/images/phone.png'
                  width={18}
                  height={18}
                  className='cursor-pointer'
                />
                <Link
                  href={{
                    pathname: '/company/conductores/' + record?.driver?.id,
                    query: { requestInfo: JSON.stringify(record) }
                  }}
                  className='cursor-pointer w-[17px] h-[17px] mb-1'
                >
                  <EyeIcon />
                </Link>
              </div>
            )}
          />
        </Table>
      </>
    </section>
  )
}

export default Page

const BarActive = ({ active, setActive }: any) => {
  return (
    <div className='flex justify-center gap-[66px] rounded-lg shadow-md uppercase px-8 py-5'>
      <div
        className='cursor-pointer'
        onClick={() => {
          if (active !== 'Solicitudes') setActive('Solicitudes')
        }}
      >
        <p className='text-xl font-bold'>Solicitudes</p>
        {
          <div
            className={`p-0 m-0 w-full h-1 bg-[#FFD057] rounded-lg transition-all ease-in-out duration-75 ${
              active === 'Solicitudes' ? 'block' : 'hidden'
            }`}
          ></div>
        }
      </div>
      <div
        className='cursor-pointer'
        onClick={() => {
          if (active !== 'Activas') setActive('Activas')
        }}
      >
        <p className='text-xl font-bold'>Activos</p>
        {
          <div
            className={`p-0 m-0 w-full h-1 bg-[#FFD057] rounded-lg transition-all ease-in-out duration-75 ${
              active === 'Activas' ? 'block' : 'hidden'
            }`}
          ></div>
        }
      </div>
      <div
        className='cursor-pointer'
        onClick={() => {
          if (active !== 'Rechazados') setActive('Rechazados')
        }}
      >
        <p className='text-xl font-bold'>Rechazados</p>
        {
          <div
            className={`p-0 m-0 w-full h-1 bg-[#FFD057] rounded-lg transition-all ease-in-out duration-75 ${
              active === 'Rechazados' ? 'block' : 'hidden'
            }`}
          ></div>
        }
      </div>
      <div
        className='cursor-pointer'
        onClick={() => {
          if (active !== 'Inhabilitados') setActive('Inhabilitados')
        }}
      >
        <p className='text-xl font-bold'>Inhabilitados</p>
        {
          <div
            className={`p-0 m-0 w-full h-1 bg-[#FFD057] rounded-lg transition-all ease-in-out duration-75 ${
              active === 'Inhabilitados' ? 'block' : 'hidden'
            }`}
          ></div>
        }
      </div>
      <div
        className='cursor-pointer'
        onClick={() => {
          if (active !== 'Bloqueados') setActive('Bloqueados')
        }}
      >
        <p className='text-xl font-bold'>Bloqueados</p>
        {
          <div
            className={`p-0 m-0 w-full h-1 bg-[#FFD057] rounded-lg transition-all ease-in-out duration-75 ${
              active === 'Bloqueados' ? 'block' : 'hidden'
            }`}
          ></div>
        }
      </div>
    </div>
  )
}
