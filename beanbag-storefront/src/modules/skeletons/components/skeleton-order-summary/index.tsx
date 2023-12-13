import RoundButton from "@modules/common/components/round-button"
// import SkeletonButton from "@modules/skeletons/components/skeleton-button"
import SkeletonCartTotals from "@modules/skeletons/components/skeleton-cart-totals"

const SkeletonOrderSummary = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "250px" }}>
      <div className="spacer_med"></div>

      <SkeletonCartTotals header={true} />

      <RoundButton href="" className="signin-button" buttonText="Sign In" />
      {/* <SkeletonButton /> */}

      <div className="spacer_med"></div>
      <div className="divider"></div>
      <SkeletonCartTotals header={true} />
      <RoundButton href="" className="signin-button" buttonText="Sign In" />
    </div>
  )
}

export default SkeletonOrderSummary
