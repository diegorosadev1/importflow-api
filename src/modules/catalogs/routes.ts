import { Router } from 'express'
import { prisma } from '../../lib/prisma'

export const catalogRoutes = Router()

// CRIAR CATALOGO
catalogRoutes.post('/', async (req, res) => {
  try {
    const {
      supplier_id,
      name,
      file_url,
      original_filename
    } = req.body

    const catalog = await prisma.catalog.create({
      data: {
        supplier_id,
        name,
        file_url,
        original_filename
      }
    })

    return res.json(catalog)
  } catch (error) {
    console.log(error)

    return res.status(500).json({
      error: 'Erro ao criar catálogo'
    })
  }
})

// LISTAR CATALOGOS
catalogRoutes.get('/', async (req, res) => {
  const catalogs = await prisma.catalog.findMany({
    include: {
      supplier: true
    },
    orderBy: {
      created_at: 'desc'
    }
  })

  return res.json(catalogs)
})