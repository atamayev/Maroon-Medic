interface Props {
  carouselIndex: number
  setCarouselIndex: React.Dispatch<React.SetStateAction<number>>
}

export default function RenderPicturesSection(props: Props) {
  const { carouselIndex, setCarouselIndex } = props
  const images = [
    "../../Images/ProfileImage.jpg",
    "../../Images/ProfileImage.jpg",
    // Add more image paths as needed
  ]

  const captions = [
    "First slide label",
    "Second slide label",
    // Add more captions as needed
  ]

  const handleNext = () => {
    setCarouselIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const handlePrev = () => {
    setCarouselIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  return (
    <>
      Edit Pictures:
      <div className="relative w-full">
        <img className="d-block w-100" src={images[carouselIndex]} alt={captions[carouselIndex]} />
        <div className="absolute top-1/2 left-4 transform -translate-y-1/2 cursor-pointer" onClick={handlePrev}>
          {/* Previous button, replace with icon or text as needed */}
          &lt;
        </div>
        <div className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer" onClick={handleNext}>
          {/* Next button, replace with icon or text as needed */}
          &gt;
        </div>
        <div className="absolute bottom-4 left-4">
          <h3 className="text-white">{captions[carouselIndex]}</h3>
          {/* Add additional caption text if needed */}
        </div>
      </div>
    </>
  )
}
