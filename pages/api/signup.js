import connection from "../../database/connection";
import userModel from "../../database/userSchema";
import bcryptjs from "bcryptjs"
connection()
export default function handler(req, res) {
    console.log(req.method);
    if (req.method == "GET") {
        res.send("Hello Welcome")
    }else if (req.method == "POST") {
        const newUser = req.body
        const email = newUser.email
        userModel.findOne({ email: email }, (err, result) => {
            if (err) {
                console.log(err);
                res.status(501).send({ message: "Internal server error", status: false })
            } else {
                if (result) {
                    res.send({ message: "Email already exists in our database", status: false })
                } else {
                    const form = new userModel(newUser)
                    form.save((err) => {
                        if (err) {
                            console.log("an error occured");
                            res.send({ message: "user signup failed", status: false })
                        } else { res.send({ message: "registration successful", status: true }) }
                    })
                }
            }
        })
    }
}