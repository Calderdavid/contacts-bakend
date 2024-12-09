import express from 'express';
import { renderHome, renderLogin, renderRegister, renderContacts, renderContactForm, handleLogin, handleRegister, handleLogout } from '../controllers/viewController';
import { authMiddleware } from '../middlewares/auth';


const router = express.Router();

router.get('/', renderHome);
router.get('/login', renderLogin);
router.get('/register', renderRegister);
router.post('/login', handleLogin);
router.post('/register', handleRegister);
router.get('/logout', handleLogout);

router.get('/contacts', authMiddleware, renderContacts);
router.get('/contacts/new', authMiddleware, renderContactForm);
router.get('/contacts/edit/:id', authMiddleware, renderContactForm);

export default router;