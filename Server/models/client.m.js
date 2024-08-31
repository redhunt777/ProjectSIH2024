import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  hashedPassword: {
    type: String,
    required: true,
  },
  publicAddress: {
    type: String,
    required: true,
  },
  mnemonics: {
    type: String,
    required: true,
  },
  // prefrences contains the list of the categories the user is interested in
  prefrences: {
    type: [String],
  },
});

const Client = mongoose.model("Client", clientSchema);

export default Client;
