import { Request, Response } from 'express';
import { userModel } from '../models/user';

export const userControllers = {
    regUser: async (req: Request, res: Response) => {
        try {
            if (req.session.user) {
                return res.status(401).json({ 'error': 'forbidden' });
            }

            const { login, pass } = await req.body;
            const validateUser = await userModel.findOne({ login });

            if (validateUser) {
                return res.status(400).json({ message: "User already exist" })
            }

            await userModel.create(
                {
                    login: login,
                    password: pass
                });

            return res.status(200).json({ "ok": true });

        } catch (e) {
            console.log(e);
            return res.status(400).json({ message: "Registration error." })
        }
    },

    logInUser: async (req: Request, res: Response) => {
        try {
            if (req.session.user) {
                return res.status(401).json({ 'error': 'forbidden' });
            }

            const { login, pass } = await req.body;
            const user = await userModel.findOne({ login });

            if (!user) {
                return res.status(400).json({ message: "User not exist" });
            }

            const validPassword = pass == user.password;

            if (!validPassword) {
                return res.status(400).json({ message: "Incorrect password" });
            }

            req.session.user = req.body.login;

            return res.status(200).json({ "ok": true });

        } catch (e) {
            console.log(e);
            return res.status(400).json({ message: "Registration error." })
        }
    },

    logOutUser: async (req: Request, res: Response) => {
        if (!req.session.user) {
            return res.status(401).json({ 'error': 'forbidden' });
        }
        
        req.session.destroy((err) => console.log(err));
        return res.status(200).json({ "ok": true });
    }

}
