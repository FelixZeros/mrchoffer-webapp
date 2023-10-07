


interface Route {
    href: string,
    name: string,
}
export const Routes: Route[] = [
    {
        href: 'admin/passengers',
        name: 'Pasajeros',
    },
    {
        href: 'admin/rides',
        name: 'solicitudes',
    },
    {
        href: 'admin/',
        name: 'Conductores',
    },
]