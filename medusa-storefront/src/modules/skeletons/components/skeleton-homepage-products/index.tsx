import SkeletonProductPreview from "../skeleton-product-preview"

const SkeletonHomepageProducts: React.FC<{
  count: number
}> = ({ count = 3 }) => {
  return (
    <div>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonProductPreview key={i} />
      ))}
    </div>
  )
}

export default SkeletonHomepageProducts
