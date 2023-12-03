import repeat from "@lib/util/repeat"
import Divider from "@modules/common/components/divider"
import SkeletonButton from "@modules/skeletons/components/skeleton-button"

const SkeletonProductPage = () => {
  return (
    <div>
      <div>
        <div>
          <div id="product-info">
            <div>
              <div></div>
              <div></div>
              <div>
                {repeat(4).map((index) => (
                  <div key={index}></div>
                ))}
              </div>
              <div>
                {repeat(2).map((index) => (
                  <div key={index}></div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>
            {repeat(2).map((index) => {
              return <div key={index}></div>
            })}
          </div>
        </div>
        <div>
          <div>
            <div>
              <div>
                <div>
                  <div>
                    <div></div>
                    <div>
                      {repeat(4).map((v) => {
                        return <div key={v}></div>
                      })}
                    </div>
                    <Divider />
                    <div></div>
                    <SkeletonButton />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SkeletonProductPage
