import { Modal } from 'antd'
import Image from 'next/image'

export const ModalNice = ({ nice, setNice }: any) => {
  return (
    <Modal
      visible={nice}
      onCancel={() => setNice(false)}
      footer={null}
      width={400}
      centered
    >
      <div className='flex flex-col-reverse items-center gap-2'>
        <Image
          src='/images/nice.png'
          width={112}
          height={112}
          alt='nice'
          className='object-contain'
        />
        <h1 className='text-xl font-bold uppercase text-[#4AAE27]'>
          ¡Recarga exitosa!
        </h1>
      </div>
    </Modal>
  )
}

export const ModalError = ({ error, setError }: any) => {
  return (
    <Modal
      visible={error}
      onCancel={() => setError(false)}
      footer={null}
      centered
      width={400}
    >
      <div className='flex flex-col-reverse items-center gap-2'>
        <Image
          src='/images/bad.png'
          width={112}
          height={112}
          alt='bad'
          className='object-contain'
        />
        <h1 className='text-xl font-bold uppercase text-[#CE3E3E]'>
          ¡Ha ocurrido un error!
        </h1>
      </div>
    </Modal>
  )
}
