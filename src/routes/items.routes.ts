import { Router } from 'express';
import { itemControllers } from '../controllers/item.controllers';

export const itemRouter = Router();

itemRouter.route('/items')
    .get(itemControllers.getItems)
    .post(itemControllers.addItem)
    .put(itemControllers.editItem)
    .delete(itemControllers.deleteItem)

