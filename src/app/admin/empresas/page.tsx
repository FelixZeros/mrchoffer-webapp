'use client'
import { useEffect, useState } from 'react'
import { EyeIcon } from '@/components/icons/eye'
import { Table, Input } from 'antd'
import {
  DropdownCity,
  DropdownDepartment,
  DropdownPlan,
  DropdownState
} from './components/Dropdowns'
import { useRouter } from 'next/navigation'

const { Search } = Input

export default function EnterprisePage() {
  const router = useRouter()
  const [companies, setCompanies] = useState<any>()
  const [initialCompanies, setInitialCompanies] = useState<any>()
  const [department, setDepartment] = useState<any>(null)
  const [city, setCity] = useState<any>(null)
  const [plan, setPlan] = useState<any>(null)
  const [state, setState] = useState<any>(null)
  const [current, setCurrent] = useState<number>(1)

  const getCompanies = async () => {
    const response = await fetch(
      (process.env.NEXT_PUBLIC_API as string) + 'get-companys'
    )
    const companies = await response.json()
    const modifiedCompanies = companies.map(company => {
      // Filtrar balance_companies para obtener el plan activo
      const activeBalance = company.balance_companies.find(
        balance => balance.active
      )

      // Crear un nuevo objeto con la información original y el atributo plan
      return {
        ...company,
        plan: activeBalance ? activeBalance.type : 'Sin plan' // Agregar el tipo de plan activo o null si no hay uno activo
      }
    })
    setCompanies(modifiedCompanies)
    setInitialCompanies(modifiedCompanies)
  }

  const handleFilter = () => {
    let filteredCompanies = [...initialCompanies]

    const filters = {
      department,
      city,
      plan,
      state // Asegúrate de cambiar "estado" por el nombre real de tu campo
    }

    Object.keys(filters).forEach(filterKey => {
      const filterValue = filters[filterKey]
      if (filterValue) {
        filteredCompanies = filteredCompanies.filter(
          company => company[filterKey] === filterValue
        )
      }
    })

    setCompanies(filteredCompanies)
  }

  useEffect(() => {
    getCompanies()
  }, [])

  return (
    <section>
      <h1 className='text-2xl font-bold uppercase'>Lista de empresas</h1>
      <div className='flex flex-row mt-14 items-center justify-between w-full'>
        <Search
          placeholder='Buscar'
          className='w-[260px] rounded-lg shadow-md font-semibold mt-2 '
        />
        <div className='flex flex-row items-center gap-8'>
          <div className='flex flex-row justify-center gap-4'>
            <>
              <DropdownDepartment
                setDepartment={setDepartment}
                department={department}
              />
              <DropdownCity setCity={setCity} city={city} />
              <DropdownPlan setPlan={setPlan} plan={plan} />
              <DropdownState setState={setState} state={state} />
            </>
          </div>
          <div className='flex flex-row justify-center gap-4 items-center'>
            <button
              className='bg-[#FFB800] uppercase font-bold px-5 py-3 rounded-lg shadow-md'
              onClick={handleFilter}
            >
              Filtrar
            </button>
            <button
              className='uppercase font-bold px-5 py-3 rounded-lg shadow-md flex items-center gap-2'
              onClick={() => {
                router.push('/admin/empresas/crear')
              }}
            >
              <span>+</span>
              <p>Crear</p>
            </button>
          </div>
        </div>
      </div>
      <div className='mt-5'>
        <Table
          dataSource={companies}
          className='shadow-md rounded-2xl uppercase font-semibold'
          pagination={{
            total: companies?.length ?? 0,
            pageSize: 5,
            current,
            onChange: (page: number) => {
              setCurrent(page)
            },
            showSizeChanger: false
          }}
        >
          <Table.Column title='ID' dataIndex='id' key='id' />
          <Table.Column title='Nombre' dataIndex='name' key='name' />
          <Table.Column
            title='Departamento'
            dataIndex='department'
            key='department'
          />
          <Table.Column title='Ciudad' dataIndex='city' key='city' />
          <Table.Column title='Whatsapp' dataIndex='phone' key='phone' />
          <Table.Column title='Tipo de plan' dataIndex='plan' key='plan' />
          <Table.Column
            render={(text, record) => (
              <button
                className='flex flex-row items-center gap-2'
                onClick={() => {
                  router.push(`/admin/empresas/${record?.username}`)
                }}
              >
                <EyeIcon />
              </button>
            )}
          />
        </Table>
      </div>
    </section>
  )
}
