import { Router } from 'express';
import { userControllers } from '../controllers/user.controllers';
import { itemControllers } from '../controllers/item.controllers';


export const generalRouter = Router();

generalRouter.all('/router', (req, res) => {
    switch (req.query.action) {
        case 'login':
            userControllers.logInUser(req, res);
            break;
        case 'logout':
            userControllers.logOutUser(req, res);
            break;
        case 'register':
            userControllers.regUser(req, res);
            break;
        case 'getItems':
            itemControllers.getItems(req, res);
            break;
        case 'deleteItem':
            itemControllers.deleteItem(req, res);
            break;
        case 'createItem':
            itemControllers.addItem(req, res);
            break;
        case 'editItem':
            itemControllers.editItem(req, res);
            break;
        default:
            res.status(400).json({ message: 'Invalid action parameter' });
    }
});
