import { Layout } from 'antd'
import './Footer.css'

export const Footer = () => {
    const { Footer } = Layout

    return (
        <Footer style={{ textAlign: 'center', height: "5vh" }} className='footer'>
            Dev Troyanos ©2023 Ing. de Software
        </Footer>
    )
}
