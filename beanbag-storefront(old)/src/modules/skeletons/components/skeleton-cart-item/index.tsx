const SkeletonCartItem = () => {
  return (
    <tr>
      <td>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column" }}
            className="menu-image"
          ></div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h1 style={{ width: "200px" }}></h1>
          </div>
        </div>
      </td>
      <td></td>
      <td>
        <h1 style={{ width: "100%" }}></h1>
      </td>
      <td>
        <h1 style={{ width: "100%" }}></h1>
      </td>
      <td>
        <h1 style={{ width: "100%" }}></h1>
      </td>
    </tr>
  )
}

export default SkeletonCartItem
