import express from 'express'
import { getUser, getUsers, deleteUser, updateUser } from './user.controller.js'
import { requireAdmin } from '../../middlewares/requireAuth.middleware.js'

const router = express.Router()

router.get('/', getUsers)
router.get('/:id', getUser)
router.put('/:id', requireAdmin, updateUser)
router.delete('/:id', requireAdmin, deleteUser)

export const userRoutes = router