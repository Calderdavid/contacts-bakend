import { Request, Response } from "express";
import Contact from "../models/contact";

export const getContacts = async(req: Request, res: Response) =>{


    
    try {
        const contacts = await Contact.findAll({where: {userId: req.user?.userId}})
        res.render('contacts', { user: req.user, contacts})
        res.render('contacts', {user: req.user, contacts});
    } catch (error) {
        res.status(500).json({message: "Error fetching contacts"});

    }
}

export const createContact = async(req: Request, res: Response) => {

    try {
        const {name, email, phone} = req.body;
        const contact = new Contact({user: req.user?.userId, name, email, phone});
        await contact.save();
        res.redirect('/contacts');
    } catch (error) {
        res.status(500).render('error', {message: 'Error al crear contacto'});
    }

}

// export const updateContact = async(req: Request, res: Response) => {
//     try {
//         const {id} = req.params;
//         const {name, email, phone} = req.body;
//         const contact = await Contact.findOneAndUpdate(
//             {_id: id, user: req.user?.userId},
//             {name, email, phone},
//             {new: true}
//         );
//         if(!contact) {
//             return res.status(404).render('error', {message: 'Contacto no encontrado'});
//         }
//         res.redirect('/contacts');
//     } catch(error) {
//         res.status(500).render('error', {message: 'Error al actualizar el contacto'})
//     }
// }

// export const deleteContact = async (req: Request, res: Response) => {
//     try {
//         const {id} = req.params;
//         const contact = await Contact.findOneAndDelete({_id: id, user: req.user?.userId})
//     }
// }
