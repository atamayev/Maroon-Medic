const BottomFooterRow = () => {
  return (
    <div className="text-center p-4 text-white bg-black">
      Copyright © {new Date().getFullYear()}{" "}
      <a href="/" className="text-reset font-bold text-amber-400 underline">
        MaroonMedic
      </a>
    </div>
  )
}

export default BottomFooterRow
