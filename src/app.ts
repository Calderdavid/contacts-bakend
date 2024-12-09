import dotenv from "dotenv";
import Server from "./models/server";
import {engine} from 'express-handlebars';
import authRoutes from './routes/authRoutes';
import contactRoutes from './routes/contactRoutes'
import viewRoutes from './routes/viewRoutes';
import express from "express";
import path from "path";



dotenv.config();

const server = new Server();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurar Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.use('/', viewRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/contacts', contactRoutes);



server.listen();