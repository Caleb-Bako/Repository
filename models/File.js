import mongoose from 'mongoose';
const {Schema} = mongoose;

const fileSchema = new Schema({
    owner: {type:mongoose.Schema.Types.ObjectId, ref:'User'},
    filenam: Object,
    check:String,
});

const FileModel = mongoose.model('File', fileSchema);
export default FileModel;