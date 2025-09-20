import * as repo from '../repos/restaurant.repo.js'
export const getMenu = () => repo.listMenu()
export const makeOrder = (req, p) => repo.placeOrder(req, p)
