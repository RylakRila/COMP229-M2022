// Step 1 - import mongoose
import mongoose from "mongoose";
const Schema = mongoose.Schema;

//Step 2 - Create a Schema that matches the data
const UserSchema = new Schema({
    DisplayName: String,
    username: String,
    EmailAddress: String,
    Created:{
        type: Date,
        default: Date.now()
    },
    Updated:{
        type: Date,
        default: Date.now()
    }
}, {
    collection: "users"
});

// Step 3 - Create a Model using the Schema
const Model = mongoose.model("User", UserSchema);

// Step 4 - Export Model -> this makes the file a modules
export default Model;