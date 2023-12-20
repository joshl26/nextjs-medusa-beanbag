import React from "react"

type DetailProps = {
  title: string
}

type SubDetailProps = {
  title?: string
}

const Detail: React.FC<DetailProps> & {
  SubDetail: React.FC<SubDetailProps>
} = ({ title, children }) => {
  return (
    <div>
      <h2>{title}</h2>
      <div>{children}</div>
    </div>
  )
}

const SubDetail: React.FC<SubDetailProps> = ({ title, children }) => {
  return (
    <div className="flex flex-col">
      {title && <span className="text-base-semi">{title}</span>}
      <div className="text-small-regular">{children}</div>
    </div>
  )
}

Detail.SubDetail = SubDetail

export default Detail
