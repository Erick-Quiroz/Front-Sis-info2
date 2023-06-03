import { Layout } from 'antd'
import { Footer, Header, AdminSidebar } from '../ui/admin'

// eslint-disable-next-line
export const AdminLayout = ({ children }) => {                                                   //eslint-disable-line
    return (
        <>
            <Layout style={{ minHeight: '100vh' }}>
                <AdminSidebar />
                <Layout className="site-layout">
                    <Header />
                    {children}
                    <Footer />
                </Layout>
            </Layout>
        </>
    )
}
