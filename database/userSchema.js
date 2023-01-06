import mongoose from "mongoose"
import bcryptjs from "bcryptjs"
let userSchema = mongoose.Schema({
    fullName:String,
    email:String,
    password:String
})

let saltRound = 15
userSchema.pre("save", function (next) {
    bcryptjs.hash(this.password, saltRound, (err, hashedPassword)=>{
        if (err) {
            console.log(err, "error occured");
        }else{
            this.password = hashedPassword
            next()
        }
    })
})

let userModel = mongoose.models.user_tbs || mongoose.model("user_tbs", userSchema)
export default userModel