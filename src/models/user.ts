import { Schema, model} from 'mongoose';


const user = new Schema({
    login: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    items: [{
        type: Schema.Types.ObjectId,
        ref: 'Item'
    }]
});

export const userModel = model('User', user);
