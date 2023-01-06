import connection from "../../database/connection";
import userModel from "../../database/userSchema";
import NextCors from 'nextjs-cors';
import bcryptjs from "bcryptjs"
connection()
export default async function handler(req, res) {
    await NextCors(req, res, {
        // Options
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200,
    });
    console.log(req.method);
    if (req.method == "GET") {
        res.send("Hello Welcome")
    } else if (req.method == "POST") {
        let password = req.body.password
        let email = req.body.email
        userModel.findOne({ email: email }, (err, user) => {
            if (err) {
                console.log(err);
                res.status(501).send({ message: "Internal server error. Please try again", status: false })
            } else {
                if (!user) {
                    res.send({ message: "Invalid email", status: false })
                } else {
                    bcryptjs.compare(password, user.password, (err, same) => {
                        if (err) {
                            console.log(err);
                            res.send({ message: "Internal server error. Please try again", status: false })
                        } else if (same) {
                            res.send({ message: "welcome", status: true, result: { fullName: user.fullName, email: user.email, } })
                        } else if (!same) {
                            res.send({ message: "Invalid log in details", status: false })
                        }
                    })
                }
            }
        })
    }
}
