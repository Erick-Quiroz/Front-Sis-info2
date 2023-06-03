import { AppstoreOutlined, PieChartOutlined, CarryOutOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

const getItem = (label, key, icon, children) => {
    return { key, icon, children, label }
}

export const admin = [
    getItem('Inicio', '1',
        <Link to={'/admin'}>
            <PieChartOutlined />
        </Link>
    ),
    getItem('Registro', 'sub2',
        <AppstoreOutlined />
        , [
            getItem('Producto', '3', <Link to={'/admin/productos'} />),
            getItem('Categoria', '4', <Link to={'/admin/categorias'} />),

            getItem('Proveedor', '5', <Link to={'/admin/proveedors'} />)

        ]
    ),
    getItem('Operaciones', 'sub3',
        <CarryOutOutlined />
        , [
            getItem('Ventas', '6', <Link to={'/admin/ventas'} />),
            getItem('Ofertas', '7', <Link to={'/admin/ofertas'} />),

            getItem('Inventario', '8', <Link to={'/admin/stock'} />)
            // getItem('Ventas', '8', <Link to={''} />)

        ]
    )
]

export const user = [
    getItem('Inicio', '15',
        <Link to={'/'}>
            <PieChartOutlined />
        </Link>
    )
]
