import { CatalogPagination } from './CatalogPagination/CatalogPagination.tsx'
import { CatalogSearch } from './CatalogSearch/CatalogSearch.tsx'
import { CatalogSidebar } from './CatalogSidebar/CatalogSidebar.tsx'
import { CategoriesNavigation } from './CategoriesNavigation/CategoriesNavigation.tsx'
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
