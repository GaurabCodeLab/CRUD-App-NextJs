import mongoose from "mongoose";

const { Schema, models, model} = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true, 
        trim: true,
        unique: true
    }
});

const User = models.User || model("User", userSchema);

export default User;