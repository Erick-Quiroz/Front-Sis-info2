import { Layout } from 'antd'
import { Footer } from '../ui/admin'

// eslint-disable-next-line
export const AdminLayout = ({ children }) => {                                                   //eslint-disable-line
    return (
        <>
            <Layout style={{ minHeight: '50vh' }}>
                
                <Layout className="site-layout">
                    
                    {children}
                    <Footer />
                </Layout>
            </Layout>
        </>
    )
}
