import { Layout } from 'antd'
import { ShopLayout } from '../components/layouts/ShopLayout'
import { CarouselAdds } from '../components/ui/user'
import { SliderMotion } from '../components/ui/user/sliders/SliderMotion'
import './HomePage.css'

export const HomePage = () => {
    const { Content } = Layout

    return (
        <ShopLayout>
            <Content
                className='fondo'
                style={{
                    height: '100%',
                    minHeight: '84vh',
                    lineHeight: '100vh',
                    textAlign: 'center'
                }}
            >
                <CarouselAdds style={{ position: 'absolute', zIndex: '1' }} />
                <SliderMotion style={{ position: 'absolute', zIndex: '2' }} />
            </Content >
        </ShopLayout>
    )
}
