import { Schema, Document, model } from "mongoose";
import { hashPassword } from "../../utils/helpers"


export interface IUser extends Document {
    username: string,
    email: string,
    name: string,
    password: string,
    country: string,
    createdAt: Date
}

export const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        index: true,
        required: true
    },
    email: {
        type: String,
        index: true,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    country: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date
    }
}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.password
        }
    }
})

UserSchema.pre<IUser>("save", function (next) {
    this.password = hashPassword(this.password)
    this.createdAt = new Date();
    next();
})



export const User = model<IUser>("user", UserSchema)