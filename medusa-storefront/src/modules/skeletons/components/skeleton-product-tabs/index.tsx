import repeat from "@lib/util/repeat"

const SkeletonProductTabs = () => {
  return (
    <div>
      <div>
        {repeat(2).map((index) => (
          <div key={index}></div>
        ))}
      </div>
      <div>
        <div>
          {repeat(2).map((index) => (
            <div key={index}>
              {repeat(3).map((index) => (
                <div key={index}>
                  <div></div>
                  <div></div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SkeletonProductTabs
