import { Router } from 'express'
import { prisma } from '../../lib/prisma'

export const productRoutes = Router()

productRoutes.post('/', async (req, res) => {
  try {
    const product = await prisma.product.create({
      data: req.body
    })

    return res.json(product)

  } catch (error) {
    console.log(error)

    return res.status(500).json({
      error: 'Erro ao criar produto'
    })
  }
})

productRoutes.get('/', async (req, res) => {
  const products = await prisma.product.findMany({
    orderBy: {
      created_at: 'desc'
    },
    take: 100
  })

  return res.json(products)
})