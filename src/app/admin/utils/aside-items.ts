import { AvatarIcon } from '@/components/icons/avatar'
import { BillIcon } from '@/components/icons/bill'
import { GroupIcon } from '@/components/icons/group'
import { DocumentCheckIcon } from '@/components/icons/document-check'
import { CompanyIcon } from '@/components/icons/company'
import { CashIcon } from '@/components/icons/cash'
import { CreditCardIcon } from '@/components/icons/credit-card'

export interface Route {
  href: string
  name: string
  Icon: () => JSX.Element
}
export const routes: Route[] = [
  {
    href: 'company/solicitudes',
    name: 'solicitudes',
    Icon: DocumentCheckIcon
  },
  {
    href: 'company/pasajeros',
    name: 'Pasajeros',
    Icon: AvatarIcon
  },
  {
    href: 'company/conductores',
    name: 'Conductores',
    Icon: GroupIcon
  },
  {
    href: 'company/facturacion',
    name: 'Facturación',
    Icon: BillIcon
  },
  {
    href: 'company/recargas',
    name: 'Recargas',
    Icon: CreditCardIcon
  }
]

export const routes_admin: Route[] = [
  {
    href: 'admin/empresas',
    name: 'Empresas',
    Icon: CompanyIcon
  },
  {
    href: 'admin/facturacion',
    name: 'Facturación',
    Icon: CashIcon
  },
  {
    href: 'admin/recargas',
    name: 'Recarga',
    Icon: CreditCardIcon
  }
]
