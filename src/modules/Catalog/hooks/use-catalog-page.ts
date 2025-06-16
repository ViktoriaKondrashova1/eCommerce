import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export function useCatalogPage() {
  const { pageNumber } = useParams()
  const navigate = useNavigate()

  const defaultPageNumber = pageNumber !== undefined ? +pageNumber : 1
  const [currentPage, setCurrentPage] = useState<number>(defaultPageNumber)

  const handlePageChange = (page: number): void => {
    setCurrentPage(page)
    navigate(`/catalog/${page}`)
  }

  return { currentPage, handlePageChange }
}
