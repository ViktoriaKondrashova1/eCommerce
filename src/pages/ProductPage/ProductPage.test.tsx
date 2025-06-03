import type { ICleanProduct } from '@/entities/product/model/product.types'
import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter, useLocation, useNavigate, useParams } from 'react-router-dom'
import { vi } from 'vitest'
import { categoryStore } from '@/entities/category/model/category.store'
import { ProductPage } from './ProductPage'
import { useProductBySlug } from './use-product'

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: vi.fn(),
    useParams: vi.fn(),
    useLocation: vi.fn(),
  }
})

vi.mock('./use-product')

describe('productPage', () => {
  const mockNavigate = vi.fn()
  const mockProduct: ICleanProduct = {
    id: '1',
    title: 'Hoppy-Lager',
    category: 'Lager',
    description: 'Test description',
    price: {
      amount: '2.99',
      discount: null,
    },
    images: [],
    ABV: '5.0',
    IBU: '20',
    brewery: 'Lida',
    country: 'Belarus',
    slug: 'test-product',
  }

  const mockCategory = {
    id: '1',
    name: { 'en-US': 'Lager' },
    slug: { 'en-US': 'lager' },
    version: 1,
    createdAt: 'test',
    lastModifiedAt: 'test',
    ancestors: [],
    orderHint: 'test',
  }

  beforeEach(() => {
    vi.mocked(useNavigate).mockReturnValue(mockNavigate)
    vi.mocked(useParams).mockReturnValue({ slug: 'test-product' })
    vi.mocked(useLocation).mockReturnValue({
      pathname: '/product/test-product',
      search: '',
      hash: '',
      state: null,
      key: 'default',
    })
    vi.mocked(useProductBySlug).mockReturnValue({
      product: mockProduct,
      isLoading: false,
      isError: false,
      error: null,
    })
    vi.spyOn(categoryStore, 'getCategoryByName').mockReturnValue(mockCategory)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should render product data when loaded', () => {
    render(
      <MemoryRouter>
        <ProductPage />
      </MemoryRouter>,
    )

    const productTitles = screen.getAllByText(mockProduct.title)
    expect(productTitles).toHaveLength(2)
    expect(productTitles[0]).toBeInTheDocument()
    expect(productTitles[1]).toBeInTheDocument()
    expect(screen.getByText('Back To Catalog')).toBeInTheDocument()
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Catalog')).toBeInTheDocument()
  })

  it('should navigate to catalog when button is clicked', () => {
    render(
      <MemoryRouter>
        <ProductPage />
      </MemoryRouter>,
    )

    fireEvent.click(screen.getByText('Back To Catalog'))
    expect(mockNavigate).toHaveBeenCalledWith('/catalog/1')
  })
})
