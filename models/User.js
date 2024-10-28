import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: String,
    surname: String,
    email: { type: String, unique: true },
    location: [String],
    pass: String,
    stats: String,
    role: String,
    view: String
});

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
