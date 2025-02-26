import mongoose, {Schema} from "mongoose";

mongoose.connect(process.env.MONGODB_URI)
mongoose.Promise=global.Promise

const UserSchema=new Schema({
    name:String,
    email:String,
    password:String,
    residence:String
},{
    timestamps:true
})

const User= mongoose.models.User || mongoose.model("User",UserSchema)
export default User;