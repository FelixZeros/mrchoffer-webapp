import { AvatarIcon } from "@/components/icons/avatar";
import { BillIcon } from "@/components/icons/bill";
import { GroupIcon } from "@/components/icons/group";
import { DocumentCheckIcon } from "@/components/icons/document-check";
import { CompanyIcon } from "@/components/icons/company";
import { CashIcon } from "@/components/icons/cash";



interface Route {
    href: string,
    name: string,
    Icon: () => JSX.Element;
}
export const Routes: Route[] = [
    {
        href: 'admin/rides',
        name: 'solicitudes',
        Icon: DocumentCheckIcon
    },
    {
        href: 'admin/passengers',
        name: 'Pasajeros',
        Icon: AvatarIcon
    },
    {
        href: 'admin/',
        name: 'Conductores',
        Icon: GroupIcon
    },
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
]
