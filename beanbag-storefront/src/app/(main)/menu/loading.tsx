"use client"

import SkeletonMenuPage from "@modules/skeletons/templates/skeleton-menu-page"
import { useEffect, useState } from "react"

/* <SkeletonHomepageProducts count={CardData.length} /> */

const delayMilliSeconds = 2000

export default function Loading() {
  const [show, setShow] = useState(false)

  useEffect(
    () => {
      let timer1 = setTimeout(() => setShow(true), delayMilliSeconds)

      // this will clear Timeout
      // when component unmount like in willComponentUnmount
      // and show will not change to true
      return () => {
        clearTimeout(timer1)
      }
    },
    // useEffect will run only one time with empty []
    // if you pass a value to array,
    // like this - [data]
    // than clearTimeout will run every time
    // this value changes (useEffect re-run)
    []
  )

  // You can add any UI inside Loading, including a Skeleton.
  //   return !show ? (
  //     <div style={{ background: "red", width: "100%", height: "100%" }}>
  //       show is true, {delayMilliSeconds}seconds passed
  //     </div>
  //   ) : (
  //     <SkeletonMenuPage />
  //   )

  return <SkeletonMenuPage />
}
