'use client'
import { Table, Rate, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { EyeIcon } from '@/components/icons/eye'
import { useRouter } from 'next/navigation'

const Page = () => {
  const router = useRouter()
  const [active, setActive] = useState<string>('Activas')
  const [trips, setTrips] = useState<any>([])
  const [activeTrips, setActiveTrips] = useState<any>([])
  const [closedTrips, setClosedTrips] = useState<any>([])
  const [current, setCurrent] = useState<number>(1)
  const [filteredTrips, setFilteredTrips] = useState<any>([])
  const [filter, setFilter] = useState<any>(null)

  const getRequestTrips = async () => {
    const response = await fetch(
      (process.env.NEXT_PUBLIC_API as string) + 'get-trips'
    )
    const trips = await response.json()
    const activeTrips = trips.filter((trip: any) => trip.status === 2)
    const closedTrips = trips.filter((trip: any) => trip.status === 3)

    setActiveTrips(activeTrips)
    setClosedTrips(closedTrips)
    setTrips(trips)
  }

  const handleFilter = () => {
    let filteredTrips = [...trips]

    const filters = {
      state: filter
    }

    Object.keys(filters).forEach(filterKey => {
      console.log(filters[filterKey])
      const filterValue = filters[filterKey]
      if (filterValue) {
        filteredTrips = filteredTrips.filter(
          trip => trip.status === filterValue
        )
      }
    })
    setFilteredTrips(filteredTrips)
    if (filter === null) {
      setActive('Activas')
    } else {
      setActive('Filtro')
    }
  }

  useEffect(() => {
    getRequestTrips()
  }, [])

  return (
    <section className='w-full flex flex-col justify-center items-center'>
      <>
        <BarActive active={active} setActive={setActive} />
        <div className='self-end w-full flex flex-row items-center justify-end gap-5 mt-10'>
          <Select
            className='w-1/5 uppercase'
            popupClassName='font-bold uppercase'
            placeholder='Estado'
            size='large'
            options={[
              { label: 'Todos', value: null },
              { label: 'Activo', value: 1 },
              { label: 'En curso', value: 2 },
              { label: 'Finalizado', value: 3 },
              { label: 'Cancelado', value: 4 },
              { label: 'Ignorado', value: 5 }
            ]}
            onChange={e => {
              setFilter(e)
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
            active === 'Activas'
              ? activeTrips
              : active === 'Cerradas'
              ? closedTrips
              : active === 'Filtro'
              ? filteredTrips
              : trips
          }
          className='shadow-md rounded-2xl uppercase font-semibold w-full mt-10'
          pagination={{
            total:
              active === 'Activas'
                ? activeTrips.length
                : active === 'Cerradas'
                ? closedTrips.length
                : active === 'Filtro'
                ? filteredTrips.length
                : trips.length,
            pageSize: 5,
            current,
            onChange: (page: number) => {
              setCurrent(page)
            },
            showSizeChanger: false
          }}
        >
          <Table.Column title='ID' dataIndex='id' key='id' />
          <Table.Column
            title='Hora de Solicitud'
            dataIndex='startTime'
            key='startTime'
          />
          <Table.Column title='Pasajero' dataIndex='name' key='name' />
          <Table.Column
            title='Conductor'
            key='driver'
            render={(text, record: any) => <p>{record?.driver?.name}</p>}
          />
          {active !== 'Activas' && (
            <Table.Column
              title='Calificación'
              key='rating'
              render={(text, record: any) => (
                <Rate disabled value={record?.rating ?? 1} />
              )}
            />
          )}
          <Table.Column
            title='Estado'
            key='status'
            render={(text, record: any) => (
              <p>
                {record?.status === 1
                  ? 'Activo'
                  : record?.status === 2
                  ? 'En curso'
                  : record?.status === 3
                  ? 'Finalizado'
                  : record?.status === 4
                  ? 'Cancelado'
                  : 'Ignorado'}
              </p>
            )}
          />
          <Table.Column
            render={(text, record) => (
              <button
                className='flex flex-row items-center gap-2'
                onClick={() => {
                  router.push(`/company/solicitudes/${record?.id}`)
                }}
              >
                <EyeIcon />
              </button>
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
          if (active !== 'Activas') setActive('Activas')
        }}
      >
        <p className='text-xl font-bold'>Activas</p>
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
          if (active !== 'Cerradas') setActive('Cerradas')
        }}
      >
        <p className='text-xl font-bold'>Cerradas</p>
        {
          <div
            className={`p-0 m-0 w-full h-1 bg-[#FFD057] rounded-lg transition-all ease-in-out duration-75 ${
              active === 'Cerradas' ? 'block' : 'hidden'
            }`}
          ></div>
        }
      </div>
      <div
        className='cursor-pointer'
        onClick={() => {
          if (active !== 'Historial') setActive('Historial')
        }}
      >
        <p className='text-xl font-bold'>Historial</p>
        {
          <div
            className={`p-0 m-0 w-full h-1 bg-[#FFD057] rounded-lg transition-all ease-in-out duration-75 ${
              active === 'Historial'
                ? 'block'
                : active === 'Filtro'
                ? 'block'
                : 'hidden'
            }`}
          ></div>
        }
      </div>
    </div>
  )
}
