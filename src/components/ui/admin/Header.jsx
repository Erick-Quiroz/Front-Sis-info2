import { Layout } from 'antd'
import { HomeFilled, EditFilled } from '@ant-design/icons'
import { Link } from 'react-router-dom'

export const Header = () => {
    const { Header } = Layout

    return (
        <Header
            style={{
                paddingRight: '2vw',
                textAlign: 'right',
                color: 'white',
                fontSize: '3vh',
                height: '12vh',
                maxheight: '12vh'
            }}>
            <Link to={'/'} >
                <HomeFilled />
                <h1 style={{
                    textAlign: 'right',
                    color: 'white',
                    fontSize: '2vh'
                }}>Salir</h1>
            </Link>
        </Header>
    )
}
