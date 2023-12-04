import { getCategoriesList, getCategoryByHandle } from "@lib/data"
import CategoryTemplate from "@modules/categories/templates"
import { Metadata } from "next"
import { notFound } from "next/navigation"

type Props = {
  params: { category: string[] }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { product_categories: product_category } = await getCategoryByHandle(
    params.category
  ).catch((err) => {
    notFound()
  })

  const category = product_category[0]

  if (!category) {
    notFound()
  }

  return {
    title: `${category.name} | Beanbag Coffee Co.`,
    description: `${category.name} category`,
  }
}

export default async function CategoryPage({ params }: Props) {
  const { product_categories: all_categories } = await getCategoriesList(0, 100)

  const { product_categories } = await getCategoryByHandle(
    params.category
  ).catch((err) => {
    notFound()
  })

  return (
    <CategoryTemplate
      all_categories={all_categories}
      categories={product_categories}
    />
  )
}
