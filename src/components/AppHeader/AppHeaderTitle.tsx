import React from 'react'
import { useNavigate } from 'react-router-dom'
import { AppTitle } from '@/components/AppTitle/AppTitle'
import { appName, ROUTES } from '@/shared/constants'

export const AppHeaderTitle = React.memo(() => {
  const navigate = useNavigate()

  return <AppTitle style={{ margin: 0, cursor: 'pointer' }} onClick={() => navigate(ROUTES.main)}>{appName}</AppTitle>
})
