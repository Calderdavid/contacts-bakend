import express from 'express';
import { getContacts, createContact } from '../controllers/contactController';
import { authMiddleware } from '../middlewares/auth';

const router = express.Router();

router.use(authMiddleware);

router.get('/', getContacts)
router.get('/', createContact)

export default router;
