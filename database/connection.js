const mongoose = require("mongoose")
let URI = process.env.MONGO_URI
let connection = async () => {
    await mongoose.connect(URI, (err) => {
        if (err) {
            console.log("Connection error");
            console.log(err);
        } else {
            console.log("Connection successful");

        }
    })
}
export default connection