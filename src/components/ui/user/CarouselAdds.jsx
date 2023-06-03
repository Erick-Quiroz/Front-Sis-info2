import { Carousel } from 'antd'
import { image1, image2, image3 } from '../../../helpers/imageAdds'

export const CarouselAdds = () => {
    return (
        <Carousel autoplay dots={false} draggable>
            <div style={{
                padding: 14,
                minHeight: '84vh',
                position: 'relative'
            }}>
                <div className="contenedorTodo">
                    <section className='imagenSuperMercado'>
                        <div className="contenedorPantalla">
                            <img className="fondoPantalla"
                                src={image1}
                                alt="Foto_de_fondo" />
                        </div>
                    </section>
                </div>
            </div>

            <div>
                <div className="contenedorTodo">
                    <section className='imagenSuperMercado'>
                        <div className="contenedorPantalla">
                            <img className="fondoPantalla"
                                src={image2}
                                alt="Foto_de_fondo" />
                        </div>
                    </section>
                </div>
            </div>

            <div>
                <div className="contenedorTodo">
                    <section className='imagenSuperMercado'>
                        <div className="contenedorPantalla">
                            <img className="fondoPantalla"
                                src={image3}
                                alt="Foto_de_fondo" />
                        </div>
                    </section>
                </div>
            </div>
        </Carousel>
    )
}
