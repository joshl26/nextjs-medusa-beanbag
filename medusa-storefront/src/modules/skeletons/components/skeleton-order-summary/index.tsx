import SkeletonButton from "@modules/skeletons/components/skeleton-button"
import SkeletonCartTotals from "@modules/skeletons/components/skeleton-cart-totals"

const SkeletonOrderSummary = () => {
  return (
    <div >
      <SkeletonCartTotals header={false} />
      <div >
        <SkeletonButton />
      </div>
    </div>
  )
}

export default SkeletonOrderSummary
