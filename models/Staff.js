import mongoose from 'mongoose';
const {Schema} = mongoose;

const staffSchema = new Schema({
    owner: {type:mongoose.Schema.Types.ObjectId, ref:'User'},
    name:String,
    profile:[String],
    form: String,
    location:[String],
    time : { type : String , default: Date.now }
});

const StaffModel = mongoose.model('Staff', staffSchema);

export default StaffModel;