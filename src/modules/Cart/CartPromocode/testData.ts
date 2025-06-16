import type { Cart, LineItem } from '@commercetools/platform-sdk'

export function createTestCart(overrides: Partial<Cart> = {}): Cart {
  const defaultCart: Cart = {
    id: 'test-cart-id',
    version: 1,
    key: 'test-cart-key',
    createdAt: '2023-01-01T00:00:00.000Z',
    lastModifiedAt: '2023-01-01T00:00:00.000Z',
    customerId: 'test-customer-id',
    customerEmail: 'test@example.com',
    anonymousId: 'test-anonymous-id',
    lineItems: [],
    customLineItems: [],
    discountCodes: [],
    cartState: 'Active',
    inventoryMode: 'None',
    taxMode: 'Platform',
    taxRoundingMode: 'HalfEven',
    taxCalculationMode: 'LineItemLevel',
    refusedGifts: [],
    origin: 'Customer',
    itemShippingAddresses: [],
    totalPrice: {
      type: 'centPrecision',
      currencyCode: 'USD',
      centAmount: 0,
      fractionDigits: 2,
    },
    taxedPrice: {
      totalNet: {
        type: 'centPrecision',
        currencyCode: 'USD',
        centAmount: 0,
        fractionDigits: 2,
      },
      totalGross: {
        type: 'centPrecision',
        currencyCode: 'USD',
        centAmount: 0,
        fractionDigits: 2,
      },
      taxPortions: [],
    },
    shippingMode: 'Single',
    shipping: [],
    shippingInfo: {
      shippingMethodName: 'Standard',
      price: {
        type: 'centPrecision',
        currencyCode: 'USD',
        centAmount: 0,
        fractionDigits: 2,
      },
      shippingRate: {
        price: {
          type: 'centPrecision',
          currencyCode: 'USD',
          centAmount: 0,
          fractionDigits: 2,
        },
        tiers: [],
      },
      taxCategory: {
        typeId: 'tax-category',
        id: 'test-tax-category-id',
      },
      taxRate: {
        name: 'Standard',
        amount: 0.2,
        includedInPrice: true,
        country: 'US',
        id: 'test-tax-rate-id',
      },
      deliveries: [],
      discountedPrice: {
        value: {
          type: 'centPrecision',
          currencyCode: 'USD',
          centAmount: 0,
          fractionDigits: 2,
        },
        includedDiscounts: [],
      },
      shippingMethodState: 'DoesNotMatchCart',
    },
    discountOnTotalPrice: {
      includedDiscounts: [],
      discountedAmount: {
        type: 'centPrecision',
        currencyCode: 'USD',
        centAmount: 0,
        fractionDigits: 2,
      },
    },
    directDiscounts: [],
    paymentInfo: {
      payments: [],
    },
    deleteDaysAfterLastModification: 90,
    locale: 'en-US',
    country: 'US',
    businessUnit: {
      typeId: 'business-unit',
      key: '',
    },
    store: {
      typeId: 'store',
      key: '',
    },
    custom: {
      type: {
        typeId: 'type',
        id: 'test-type-id',
      },
      fields: {},
    },
    createdBy: {
      clientId: 'test-client-id',
    },
    lastModifiedBy: {
      clientId: 'test-client-id',
    },
  }

  return {
    ...defaultCart,
    ...overrides,
  }
}

export function createTestLineItem(overrides: Partial<LineItem> = {}): LineItem {
  const defaultLineItem: LineItem = {
    id: 'test-line-item-id',
    productId: 'test-product-id',
    productType: {
      typeId: 'product-type',
      id: 'test-product-type-id',
    },
    name: { en: 'Test Product' },
    variant: {
      id: 1,
      sku: 'test-sku',
      key: 'test-variant-key',
      prices: [],
      attributes: [],
      assets: [],
    },
    price: {
      id: 'test-price-id',
      value: {
        type: 'centPrecision',
        currencyCode: 'USD',
        centAmount: 1000,
        fractionDigits: 2,
      },
      country: 'US',
      validFrom: '2023-01-01T00:00:00.000Z',
      validUntil: '2024-01-01T00:00:00.000Z',
      customerGroup: {
        typeId: 'customer-group',
        id: 'test-customer-group-id',
      },
      channel: {
        typeId: 'channel',
        id: 'test-channel-id',
      },
      discounted: {
        value: {
          type: 'centPrecision',
          currencyCode: 'USD',
          centAmount: 900,
          fractionDigits: 2,
        },
        discount: {
          id: 'test-discount-id',
          typeId: 'product-discount',
        },
      },
      custom: {
        type: {
          typeId: 'type',
          id: 'test-type-id',
        },
        fields: {},
      },
      tiers: [],
    },
    quantity: 1,
    totalPrice: {
      type: 'centPrecision',
      currencyCode: 'USD',
      centAmount: 1000,
      fractionDigits: 2,
    },
    discountedPricePerQuantity: [],
    taxedPricePortions: [],
    state: [],
    priceMode: 'Platform',
    lineItemMode: 'Standard',
    inventoryMode: 'None',
    shippingDetails: {
      targets: [],
      valid: true,
    },
    addedAt: '2023-01-01T00:00:00.000Z',
    lastModifiedAt: '2023-01-01T00:00:00.000Z',
    perMethodTaxRate: [],
  }

  return {
    ...defaultLineItem,
    ...overrides,
  }
}
