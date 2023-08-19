const BottomFooterColumn = () => {
  return (
    <div className = "text-center p-4 text-white" style = {{ backgroundColor: "rgb(0, 0, 0)" }}>
    Copyright © {new Date().getFullYear()}
      <a  href = "/" className = "text-reset fw-bold" style = {{ textDecoration: "none" }}> MaroonMedic</a>
    </div>
  )
}

export default BottomFooterColumn
