import { Container } from "@medusajs/ui"
import RoundButton from "@modules/common/components/round-button"
import styles from "./skeleton-product-preview.module.css"

const SkeletonProductPreview = () => {
  return (
    <div>
      <Container />
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
            {/* <CldImage
              crop="thumb"
              alt={imageTernary}
              width="600"
              height="600"
              src={imageTernary}
            /> */}
          </div>
        </div>
        <div className={styles.spacer} />
      </div>
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
            {/* <CldImage
              crop="thumb"
              alt={imageTernary}
              width="600"
              height="600"
              src={imageTernary}
            /> */}
          </div>
        </div>
        <div className={styles.spacer} />
      </div>
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
            {/* <CldImage
              crop="thumb"
              alt={imageTernary}
              width="600"
              height="600"
              src={imageTernary}
            /> */}
          </div>
        </div>
        <div className={styles.spacer} />
      </div>
    </div>
  )
}

export default SkeletonProductPreview
