// Step 1 - import mongoose
import mongoose from "mongoose";
const Schema = mongoose.Schema;

//Step 2 - Create a Schema that matches the data
const MovieSchema = new Schema({
    Name: String, 
    Year: String,
    Director: String,
    Rating: String
},
{
    collection: "movies"
});

// Step 3 - Create a Model using the Schema
const Model = mongoose.model("Movies", MovieSchema);

// Step 4 - Export Model -> this makes the file a modules
export default Model;