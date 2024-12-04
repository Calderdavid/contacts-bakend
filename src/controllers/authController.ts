import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user";


export const register = async(req: Request, res: Response) =>{

    try {
        const { username, email, password } = req.body; 
        const user = await User.create({username, email, password});

        const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET as string, {expiresIn: "1h"});

        res.status(201).json({token});

    } catch (error) {
        res.status(500).json({message: "Error registering user"});
    }
}

export const login = async(req: Request, res: Response) =>{

    try {
        const { email, password } = req.body;
        const user = await User.findOne({where: {email}});

        if(!user || !(await user.comparePassword(password))) {
            return res.status(401).json({message: "Invalid credentials"});
        }

        const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET as string, {expiresIn: "1h"});

        res.status(200).json({token});
    } catch (error) {
        res.status(500).json({message: "Error logging in"});
    }
}