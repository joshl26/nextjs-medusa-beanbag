import SkeletonProductPreview from "../skeleton-product-preview"

const SkeletonHomepageProducts: React.FC<{
  count: number
}> = ({ count = 3 }) => {
  return (
    <div>
      <SkeletonProductPreview />
    </div>
  ) 
}

export default SkeletonHomepageProducts
