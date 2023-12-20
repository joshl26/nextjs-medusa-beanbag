import { Container } from "@medusajs/ui"
import RoundButton from "@modules/common/components/round-button"
import styles from "./skeleton-product-preview.module.css"
import repeat from "@lib/util/repeat"

const SkeletonProductPreview = () => {
  return (
    <div>
      <Container />
      {repeat(3).map((index) => (
        <div key={index}>
          <div className="spacer"></div>
          <div className={styles.flex_container}>
            <div className={styles.spacer} />
            <div className={styles.left_column}>
              <div className={styles.landing_card}>
                <div className={styles.spacer_large} />
                <div className={styles.spacer} />
                <div className={styles.spacer} />
              </div>
            </div>
            <div className={styles.right_column}>
              <div>
                <h1></h1>
              </div>
            </div>
            <div className={styles.spacer} />
          </div>
        </div>
      ))}
    </div>
  )
}

export default SkeletonProductPreview
