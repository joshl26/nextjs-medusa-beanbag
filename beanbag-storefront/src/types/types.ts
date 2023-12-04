export type CardDataType = {
  id: number
  title: string
  textBody: string
  className: string
  buttonText: string
  imgUrl: string
}

export type CardType = {
  card: CardDataType
}

export type MenuCardDataType = {
  id: number
  title: string
  imgUrl: string
  href: string
  category: string
}

export type MenuCardType = {
  menuCard: MenuCardDataType
}
