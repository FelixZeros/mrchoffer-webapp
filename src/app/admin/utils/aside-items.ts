import { AvatarIcon } from "@/components/icons/avatar";
import { BillIcon } from "@/components/icons/bill";
import { GroupIcon } from "@/components/icons/group";
import { DocumentCheckIcon } from "@/components/icons/document-check";



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
    {
        href: 'admin/facturacion',
        name: 'Facturacion',
        Icon: BillIcon,
    },
]
