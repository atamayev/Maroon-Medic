import { Carousel } from "react-bootstrap"
// import { handleSelectCarousel } from "../../../Custom Hooks/Hooks for Doctor Account Details/select"

interface Props {
  carouselIndex: number
  setCarouselIndex: React.Dispatch<React.SetStateAction<number>>
}
//Non-functional, just here for completion
export default function RenderPicturesSection (props: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { carouselIndex, setCarouselIndex } = props
  return (
    <>
      Edit Pictures:
      {/* <Carousel activeIndex = {carouselIndex} onSelect = {() =>handleSelectCarousel(carouselIndex, setCarouselIndex)}> */}
      <Carousel activeIndex = {carouselIndex}>
        <Carousel.Item>
          <img
            className = "d-block w-100"
            src = "../../Images/ProfileImage.jpg"
            // src = "holder.js/800x400?text = First slide&bg = 373940"
            alt = "First slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className = "d-block w-100"
            src = "../../Images/ProfileImage.jpg"
            alt = "Second slide"
          />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className = "d-block w-100"
            // src = "holder.js/800x400?text = Third slide&bg = 20232a"
            alt = "Third slide"
          />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  )
}