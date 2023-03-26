import { Request, Response } from 'express';
import { itemModel } from '../models/item';
import { userModel } from '../models/user';

export const itemControllers = {

    getItems: async (req: Request, res: Response) => {
        try {
            if (!req.session.user) {
                return res.status(401).json({ 'error': 'forbidden' });
            }

            const user = await userModel.findOne({ login: req.session.user }).populate('items');

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            return res.json({ items: user.items });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },

    addItem: async (req: Request, res: Response) => {
        try {
            if (!req.session.user) {
                return res.status(401).json({ 'error': 'forbidden' });
            }

            const { text } = await req.body;
            const user = await userModel.findOne({ login: req.session.user }).populate('items');

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const newItem = new itemModel({ text: text, checked: false });
            newItem.id = newItem._id;
            await newItem.save();
            user.items.push(newItem._id);
            await user.save();

            return res.status(200).json({ id: newItem._id });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },

    editItem: async (req: Request, res: Response) => {
        try {
            if (!req.session.user) {
                return res.status(401).json({ 'error': 'forbidden' });
            }

            const { id, text, checked } = await req.body;
            const updateItem = await itemModel.findOneAndUpdate(
                { _id: id },
                { $set: { text: text, checked: checked } },
                { new: false }
            )

            if (updateItem) {
                res.status(200).json({ "ok": true });
            } else {
                res.status(404).json({ message: 'Item not found' });
            }

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },

    deleteItem: async (req: Request, res: Response) => {
        if (!req.session.user) {
            return res.status(401).json({ 'error': 'forbidden' });
        }

        const { id } = req.body;
        const deleteItem = await itemModel.findByIdAndDelete(id);
        
        if (deleteItem) {
            res.status(200).json({ "ok": true });
        } else {
            res.status(404).json({ message: 'Item not found' });
        }
    },

}


