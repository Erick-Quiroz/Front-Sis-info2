import { Layout } from 'antd'

export const Navbar = () => {
    const { Header } = Layout

    return (
        <Header>
            <ul className="ulIzquierda">
                <li>MenuOutlined</li>
                <li><span>Sistema</span></li>
            </ul>
        </Header>
    )
}
