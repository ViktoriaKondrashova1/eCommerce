import { CatalogSearch } from '@/modules/Catalog/filters/CatalogSearch/CatalogSearch.tsx'
import { CatalogSidebar } from '@/modules/Catalog/filters/CatalogSidebar/CatalogSidebar.tsx'
import { CategoriesNavigation } from '@/modules/Catalog/filters/CategoriesNavigation/CategoriesNavigation.tsx'
import { CatalogPagination } from './CatalogPagination/CatalogPagination.tsx'
import { useCatalogPage } from './hooks/use-catalog-page.ts'
import { useCategoriesNav } from './hooks/use-categories-nav.ts'
import { useFilterForm } from './hooks/use-filter-form.ts'
import { useProducts } from './hooks/use-products.ts'
import { useSearch } from './hooks/use-search.ts'
import { ProductList } from './ProductList/ProductList.tsx'

export {
  CatalogPagination,
  CatalogSearch,
  CatalogSidebar,
  CategoriesNavigation,
  ProductList,

  useCatalogPage,
  useCategoriesNav,
  useFilterForm,
  useProducts,
  useSearch,
}
