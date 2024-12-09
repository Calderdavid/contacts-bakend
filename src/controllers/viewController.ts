import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Contact from '../models/contact';
import User from '../models/user';

export const renderHome = (req: Request, res: Response) => {
  res.render('home', { user: req.user });
};

export const renderLogin = (req: Request, res: Response) => {
  res.render('login');
};

export const renderRegister = (req: Request, res: Response) => {
  res.render('register');
};

export const renderContacts = async (req: Request, res: Response) => {
  try {
    const contacts = await Contact.find({ user: req.user?.userId });
    res.render('contacts', { user: req.user, contacts });
  } catch (error) {
    res.status(500).render('error', { message: 'Error al obtener contactos' });
  }
};

export const renderContactForm = async (req: Request, res: Response) => {
  const { id } = req.params;
  let contact = null;

  if (id) {
    try {
      contact = await Contact.findOne({ _id: id, user: req.user?.userId });
      if (!contact) {
        return res.status(404).render('error', { message: 'Contacto no encontrado' });
      }
    } catch (error) {
      return res.status(500).render('error', { message: 'Error al obtener el contacto' });
    }
  }

  res.render('contact-form', { user: req.user, contact });
};

export const handleLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user || !(await user.comparePassword(password))) {
      return res.render('login', { error: 'Credenciales inválidas' });
    }
    
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true });
    res.redirect('/contacts');
  } catch (error) {
    res.status(500).render('error', { message: 'Error al iniciar sesión' });
  }
};

export const handleRegister = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    await user.save();
    
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true });
    res.redirect('/contacts');
  } catch (error) {
    res.status(500).render('error', { message: 'Error al registrar usuario' });
  }
};

export const handleLogout = (req: Request, res: Response) => {
  res.clearCookie('token');
  res.redirect('/login');
};

