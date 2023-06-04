import { Layout } from 'antd'
import './Footer.css'

export const Footer = () => {
    const { Footer } = Layout

    return (
        <Footer style={{ textAlign: 'center', height: '5vh' }} className='footer'>
            Devs UMSS ©2023 | Sistemas de informacion 2
        </Footer>
    )
}
