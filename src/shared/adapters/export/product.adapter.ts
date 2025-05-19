import type { ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk'
import { categoryStore } from '@/entities/category/model/category.store'
import { transformAttrsFromArrayToObj } from '@/shared/utils/attributes-from-array-to-obj'
import { convertPriceByFractionDigit } from '@/shared/utils/convert-price-by-fraction-digit'

export function exportProductAdapter(dirtyData: ProductProjectionPagedQueryResponse['results']) {
  return dirtyData.map((product) => {
    const { prices, images, attributes: attrsArray } = product?.masterVariant ?? {}

    const priceObj = prices?.map(price => price.value)[0]
    const discountObj = prices?.map(price => price.discounted)[0]

    if (priceObj?.centAmount === undefined) {
      throw new Error('Price is not defined')
    }

    if (product.description === undefined) {
      throw new Error('Description is not defined')
    }

    if (attrsArray === undefined) {
      throw new Error('Attributes is not defined')
    }

    const priceAmount = priceObj?.centAmount
    const priceFractionDigit = priceObj?.fractionDigits
    const amount = `$${convertPriceByFractionDigit(priceAmount, priceFractionDigit)}`

    const discountAmount = discountObj?.value.centAmount
    const discountFractionDigit = discountObj?.value.fractionDigits
    const discount = typeof discountAmount === 'number' && Number.isFinite(discountAmount)
      ? `$${convertPriceByFractionDigit(discountAmount, discountFractionDigit)}`
      : null

    const attrsObj = transformAttrsFromArrayToObj(attrsArray)

    return {
      category: categoryStore.getCategoryNameById(product.categories?.[0].id),
      title: product.name['en-US'],
      description: product.description['en-US'],
      slug: product.slug['en-US'],
      id: product.id,
      key: product.key,
      price: {
        amount,
        discount,
      },
      images,
      ...attrsObj,
    }
  })
}
