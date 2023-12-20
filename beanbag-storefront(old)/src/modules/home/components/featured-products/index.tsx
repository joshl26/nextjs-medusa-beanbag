"use client"

import React from "react"
import clsx from "clsx"
import { CardType } from "../../../../types/types"
import { CldImage } from "next-cloudinary"
import styles from "./featured-products.module.css"
import RoundButton from "@modules/common/components/round-button"

const LandingCard = ({ card }: CardType) => {
  const imageTernary =
    card.className === "landing_card_one"
      ? "BeanbagCoffee/expresso_jn47nr"
      : card.className === "landing_card_two"
      ? "BeanbagCoffee/coldbrew_mt3tia"
      : card.className === "landing_card_three"
      ? "BeanbagCoffee/bagbean_pm95hy"
      : ""

  return (
    <div className={styles.flex_container}>
      <div className={styles.spacer} />
      <div className={styles.left_column}>
        <div
          className={clsx({
            [styles.landing_card_one]: card.className === "landing_card_one",
            [styles.landing_card_two]: card.className === "landing_card_two",
            [styles.landing_card_three]:
              card.className === "landing_card_three",
          })}
        >
          <div className={styles.spacer_large} />
          <h2 className={styles.card_title}>{card.title}</h2>
          <div className={styles.spacer} />
          <h4 className={styles.card_text_body}>{card.textBody}</h4>
          <div className={styles.spacer} />
          <RoundButton
            href=""
            buttonText={card.buttonText}
            className={clsx({
              [styles.button_card_one]: card.className === "landing_card_one",
              [styles.button_card_two]: card.className === "landing_card_two",
              [styles.button_card_three]:
                card.className === "landing_card_three",
            })}
          />
        </div>
      </div>
      <div className={styles.right_column}>
        <div>
          <CldImage
            crop="thumb"
            alt={imageTernary}
            width="600"
            height="600"
            src={imageTernary}
          />
        </div>
      </div>
      <div className={styles.spacer} />
    </div>
  )
}

export default LandingCard
