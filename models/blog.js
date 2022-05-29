const mangoose = require("mongoose");
const Schema = mangoose.Schema;

//create schema
const mangaSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    snippet: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

//store the schema in a model
const Blogs = mangoose.model("Blogs", mangaSchema);

//export the model
module.exports = Blogs;
