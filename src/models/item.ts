import { ObjectId } from 'mongodb';
import { Schema, model } from 'mongoose';

const item = new Schema({
    id: ObjectId,
    text: String,
    checked: { type: Boolean, default: false },
});

export const itemModel = model('Item', item);
