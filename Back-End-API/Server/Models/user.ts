// Step 1 - import mongoose
import mongoose, { Mongoose, PassportLocalSchema } from "mongoose";
const Schema = mongoose.Schema;
import passportLocalMongoose from 'passport-local-mongoose';

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

declare global {
    export type UserDocument = mongoose.Document & {
        username: String,
        DisplayName: String,
        EmailAddress: String
    }
}

// Step 3 - plugin the passport-local-mongoose model
UserSchema.plugin(passportLocalMongoose);

// Step 4 - Create a Model using the Schema
const Model = mongoose.model("User", UserSchema as PassportLocalSchema);

// Step 5 - Export Model -> this makes the file a modules
export default Model;