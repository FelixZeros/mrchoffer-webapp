import React from 'react'
import { Dropdown } from 'antd'
import Image from 'next/image'

export const DropdownDepartment = ({ department, setDepartment }: any) => {
  const items = [
    {
      key: '0',
      label: 'Todos',
      onClick: () => setDepartment(null)
    },
    {
      key: '1',
      label: 'Cesar',
      onClick: () => setDepartment('Cesar')
    }
  ]

  return (
    <>
      <Dropdown menu={{ items }}>
        <div className='ml-4 w-[140px] flex flex-row px-3 py-2 gap-2 shadow-md items-center rounded-lg uppercase justify-between'>
          <span className='text-xs font-medium'>
            {department ? department : 'Departamento'}
          </span>
          <Image
            src='/images/arrow-down.png'
            width={10}
            className='object-contain'
            height={4}
            alt='arrow-down'
          />
        </div>
      </Dropdown>
    </>
  )
}

export const DropdownReference = ({ reference, setReference }: any) => {
  const items = [
    {
      key: '0',
      label: 'Todos',
      onClick: () => setReference(null)
    },
    {
      key: '1',
      label: 'Adición de vehículos',
      onClick: () => setReference('Adición de vehículos')
    },
    {
      key: '2',
      label: 'Pago de plan',
      onClick: () => setReference('Pago de plan')
    }
  ]

  return (
    <>
      <Dropdown menu={{ items }}>
        <div className='ml-4 w-[140px] flex flex-row px-3 py-2 gap-2 shadow-md items-center rounded-lg uppercase justify-between'>
          <span className='text-xs font-medium'>
            {reference ? reference : 'Referencia'}
          </span>
          <Image
            src='/images/arrow-down.png'
            width={10}
            className='object-contain'
            height={4}
            alt='arrow-down'
          />
        </div>
      </Dropdown>
    </>
  )
}

export const DropdownCity = ({ city, setCity }: any) => {
  const items = [
    {
      key: '0',
      label: 'Todos',
      onClick: () => setCity(null)
    },
    {
      key: '1',
      label: 'Valledupar',
      onClick: () => setCity('Valledupar')
    },
    {
      key: '2',
      label: 'La Jagua de Ibirico',
      onClick: () => setCity('La Jagua de Ibirico')
    }
  ]

  return (
    <>
      <Dropdown menu={{ items }}>
        <div className='w-[140px] flex flex-row px-3 py-2 gap-2 shadow-md items-center rounded-lg uppercase justify-between'>
          <span className='text-xs font-medium'>{city ? city : 'Ciudad'}</span>
          <Image
            src='/images/arrow-down.png'
            width={10}
            className='object-contain'
            height={4}
            alt='arrow-down'
          />
        </div>
      </Dropdown>
    </>
  )
}

export const DropdownPlan = ({ plan, setPlan }: any) => {
  const items = [
    {
      key: '1',
      label: 'Todos',
      onClick: () => setPlan(null)
    },
    {
      key: '2',
      label: 'Sin plan',
      onClick: () => setPlan('Sin plan')
    },
    {
      key: '3',
      label: 'Postpago',
      onClick: () => setPlan('Postpago')
    },
    {
      key: '4',
      label: 'Prepago',
      onClick: () => setPlan('Prepago')
    }
  ]

  return (
    <>
      <Dropdown menu={{ items }}>
        <div className='w-[140px] flex flex-row px-3 py-2 gap-2 shadow-md items-center rounded-lg uppercase justify-between'>
          <span className='text-xs font-medium'>
            {plan ? plan : 'Tipo de plan'}
          </span>
          <Image
            src='/images/arrow-down.png'
            width={10}
            className='object-contain'
            height={4}
            alt='arrow-down'
          />
        </div>
      </Dropdown>
    </>
  )
}

export const DropdownState = ({ state, setState }: any) => {
  const items = [
    {
      key: '0',
      label: 'Todos',
      onClick: () => setState(null)
    },
    {
      key: '1',
      label: 'Activo',
      onClick: () => setState(1)
    },
    {
      key: '2',
      label: 'Inactivo',
      onClick: () => setState(0)
    }
  ]

  return (
    <>
      <Dropdown menu={{ items }}>
        <div className='w-[140px] flex flex-row px-3 py-2 gap-2 shadow-md items-center rounded-lg uppercase justify-between'>
          <span className='text-xs font-medium'>
            {state === 1 ? 'Activo' : state === 0 ? 'Inactivo' : 'Estado'}
          </span>
          <Image
            src='/images/arrow-down.png'
            width={10}
            className='object-contain'
            height={4}
            alt='arrow-down'
          />
        </div>
      </Dropdown>
    </>
  )
}
