export const selectCarousel = (
  selectedIndex: number,
  setCarouselIndex: React.Dispatch<React.SetStateAction<number>>
): void => {
  setCarouselIndex(selectedIndex)
  // from React Bootstrap
}

export default selectCarousel
