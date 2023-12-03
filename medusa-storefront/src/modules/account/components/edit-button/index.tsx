import React from "react"

const EditButton: React.FC<React.HTMLAttributes<HTMLButtonElement>> = (
  props
) => {
  return (
    <div>
      <button {...props}>Edit</button>
    </div>
  )
}

export default EditButton
