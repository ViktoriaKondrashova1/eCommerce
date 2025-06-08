import { commerceApi } from '@/shared/configs/commerce-client'

function isCommerceToolsError(error: unknown): error is { statusCode: number } {
  return typeof error === 'object' && error !== null && 'statusCode' in error
}

export async function checkCartExists(cartId: string): Promise<boolean> {
  try {
    await commerceApi.client
      .carts()
      .withId({ ID: cartId })
      .head()
      .execute()

    return true
  }
  catch (error) {
    if (isCommerceToolsError(error) && error.statusCode === 404) {
      return false
    }
    throw new Error('Failed to check cart existence')
  }
}
