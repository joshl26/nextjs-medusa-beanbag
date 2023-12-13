import repeat from "@lib/util/repeat"
import { Heading, Table } from "@medusajs/ui"
import RoundButton from "@modules/common/components/round-button"
import SkeletonCartItem from "@modules/skeletons/components/skeleton-cart-item"
import SkeletonCodeForm from "@modules/skeletons/components/skeleton-code-form"
import SkeletonOrderSummary from "@modules/skeletons/components/skeleton-order-summary"

const SkeletonCartPage = () => {
  return (
    <div className="loading">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div className="spacer_small" />
          <div className="spacer_small" />
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "800px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "75%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      width: "70%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <h1 style={{ width: "100%" }}></h1>
                    <h2 style={{ width: "100%" }}></h2>
                  </div>
                  <div
                    style={{
                      width: "30%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {" "}
                    <div
                      style={{
                        width: "100%",
                        margin: "0 auto",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <RoundButton
                        href=""
                        className="signin-button"
                        buttonText="Sign In"
                      />
                    </div>
                  </div>
                </div>

                <div className="spacer_small" />
                <div className="spacer_small" />
                <div className="divider" />

                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <table>
                    <thead style={{ borderBottom: "black 2px solid" }}>
                      <tr style={{ textAlign: "left" }}>
                        <th>
                          <h2 style={{ width: "50%" }}></h2>
                        </th>
                        <th></th>
                        <th>
                          <h2 style={{ width: "100%" }}></h2>
                        </th>
                        <th>
                          <h2 style={{ width: "100%" }}></h2>
                        </th>
                        <th>
                          <h2 style={{ width: "100%" }}></h2>
                        </th>
                      </tr>
                      <div className="spacer_small"></div>
                    </thead>
                    <tbody>
                      {repeat(4).map((index) => (
                        <SkeletonCartItem key={index} />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="spacer_small" />
          <div className="spacer" />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <SkeletonOrderSummary />
        </div>
      </div>
    </div>
  )
}

export default SkeletonCartPage
{
  /* <div>
        
        <SkeletonCodeForm />
      </div> */
}
