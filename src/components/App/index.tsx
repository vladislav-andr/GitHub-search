import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Dashbord } from '../Dashbord'
import { User } from '../User'
import { Routes as AppRoute } from '../../utils/routes'

export const App = () => (
  <Routes>
    <Route path={AppRoute.HOME} element={<Dashbord />} />
    <Route path={AppRoute.USER} element={<User />} />
  </Routes>
)
