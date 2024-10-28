import mongoose from 'mongoose';
const {Schema} = mongoose;

const shareSchema = new Schema({
    sender : {type:mongoose.Schema.Types.ObjectId},
    receiver :{type:mongoose.Schema.Types.ObjectId},
    folder : {type:Schema.Types.ObjectId, ref:'Staff'},
});

const ShareModel = mongoose.model('Folder', shareSchema);
export default ShareModel;