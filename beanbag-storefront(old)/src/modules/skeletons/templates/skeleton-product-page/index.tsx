import RoundButton from "@modules/common/components/round-button"
import styles from "./skeleton-product-page.module.css"

const SkeletonProductPage = () => {
  return (
    <div className="loading">
      <div>
        <div className="root-container">
          <section className={styles.row}>
            <h2 className={styles.path} />
          </section>
        </div>
        <section>
          <div
            style={{
              position: "absolute",
              left: "0px",
              width: "100vw",
              height: "40vh",
              background: "rgb(3, 87, 57)",
              margin: "0 auto",
              zIndex: "-100",
            }}
          >
            <div className="root-container">
              <div
                style={{
                  alignItems: "center",
                }}
                className="row"
              >
                <div
                  style={{
                    display: "flex",
                    width: "800px",
                    height: "40vh",
                  }}
                  className="product-image"
                />
                <div
                  style={{
                    height: "auto",
                    display: "flex",
                    width: "100%",
                    padding: "5rem",
                  }}
                >
                  <h1
                    style={{
                      height: "40px",
                    }}
                  ></h1>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              height: "40vh",
              width: "200vw",
              left: "0px",
              top: "40vh",
              position: "relative",
            }}
          ></div>
        </section>
        {/* <ProductInfo product={product} /> */}
        {/* <ProductTabs product={product} /> */}
      </div>
      <div
        style={{
          position: "relative",
          left: "0px",
          top: "0px",
          width: "100%",
          height: "40vh",
          margin: "0 auto",
        }}
      >
        <div>
          <div className="spacer"></div>
          <h1></h1>
          <div className="spacer_med"></div>
          <RoundButton href="" buttonText="" className="size-button" />
          <RoundButton href="" buttonText="" className="size-button" />
          <RoundButton href="" buttonText="" className="size-button" />
          <RoundButton href="" buttonText="" className="size-button" />
          <div className="spacer_med"></div>
          <div className="divider"></div>
          <div className="spacer_small"></div>
          <h1></h1>
        </div>
      </div>
      <RoundButton
        href=""
        buttonText=""
        className={`${styles.select_button} select-button`}
      />
    </div>
  )
}

export default SkeletonProductPage
