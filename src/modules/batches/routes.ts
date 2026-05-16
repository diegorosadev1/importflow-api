import { Router } from 'express'
import { prisma } from '../../lib/prisma'

export const batchRoutes = Router()

batchRoutes.post('/', async (req, res) => {
  try {
    const {
      catalog_id,
      supplier_id,
      batch_number
    } = req.body

    const batch = await prisma.batch.create({
      data: {
        catalog_id,
        supplier_id,
        batch_number
      }
    })

    return res.json(batch)

  } catch (error) {
    console.log(error)

    return res.status(500).json({
      error: 'Erro ao criar batch'
    })
  }
})

batchRoutes.get('/', async (req, res) => {
  const batches = await prisma.batch.findMany({
    include: {
      supplier: true,
      catalog: true
    },
    orderBy: {
      created_at: 'desc'
    }
  })

  return res.json(batches)
})