import repeat from "@lib/util/repeat"
import SkeletonProductPreview from "@modules/skeletons/components/skeleton-product-preview"

const SkeletonCollectionPage = () => {
  return (
    <div>
      <div>
        <div></div>
      </div>
      <ul>
        {repeat(8).map((index) => (
          <li key={index}>
            <SkeletonProductPreview />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SkeletonCollectionPage
