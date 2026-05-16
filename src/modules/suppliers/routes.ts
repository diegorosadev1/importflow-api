import { Router } from 'express'
import { prisma } from '../../lib/prisma'

export const supplierRoutes = Router()

supplierRoutes.post('/', async (req, res) => {
  try {
    const { name, code, contact, notes } = req.body

    const supplier = await prisma.supplier.create({
      data: {
        name,
        code,
        contact,
        notes
      }
    })

    return res.json(supplier)
  } catch (error) {
    console.error(error)

    return res.status(500).json({
      error: 'Erro ao criar fornecedor'
    })
  }
})

supplierRoutes.get('/', async (req, res) => {
  const suppliers = await prisma.supplier.findMany({
    orderBy: {
      created_at: 'desc'
    }
  })

  return res.json(suppliers)
})