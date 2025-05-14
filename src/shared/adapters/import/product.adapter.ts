import type { ICleanProduct } from '@/entities/product/model/product.types'
import type { ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk'
import { getAllCategories } from '@/entities/category/api/get-all-categories'
import { categoryStore } from '@/entities/category/model/category.store'
import { transformAttrsFromArrayToObj } from '@/shared/utils/attributes-from-array-to-obj'
import { convertPriceByFractionDigit } from '@/shared/utils/convert-price-by-fraction-digit'
import { useEffect } from 'react'

export function useCategories() {
  useEffect(() => {
    getAllCategories()
      .then(response => categoryStore.setCategories(response.body.results))
      .catch(() => console.error('categories fetch error:'))
  }, [])
}

/**
 * importProductAdapter:
 * очищаем и формируем нужные нам данные о продуктах из большого объхекта коммерстулза, который принимаем как dirtyData
 ___________________
    1. из masterVariant заюираем prices, images и массив наших кастомных аттрибутов, которые вручную были добавлены
    2. priceObj и discountObj - забираем цену (value) и скидку (discounted) из prices
    3. если чего-то нет - выбрасывааем ошибку
    4. convertPriceByFractionDigit — конвертируем стоимость в гужный формат + приклеиваем $, аналогично считаем скидку, если она есть
    5. transformAttrsFromArrayToObj - преобразуем кастомные аттрибуты
    6. возвращаем объект товара с нужными для нас полями
 */
export function importProductAdapter(dirtyData: ProductProjectionPagedQueryResponse['results']): ICleanProduct[] {
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
      ABV: attrsObj.ABV,
      IBU: attrsObj.IBU,
      brewery: attrsObj.brewery,
      country: attrsObj.country,
    }
  })
}
