import { Layout } from 'antd'

import { Navbar, Footer } from '../ui/user'
export const ShopLayout = ({ children }) => {                                                   //eslint-disable-line
    return (
        <>
            <Layout style={{ minHeight: '100vh' }}>
                <Navbar />
                <Layout className="site-layout">

                    {children}
                    <Footer />
                </Layout>
            </Layout>
        </>
    )
}
