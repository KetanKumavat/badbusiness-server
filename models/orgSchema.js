//not done yet just the schema

import mongoose from "mongoose";

const orgSchema = mongoose.Schema(
    {
        name: {
        type: String,
        required: [true, "Please Enter Organization Name"],
        },
        email: {
        type: String,
        required: [true, "Please Enter Email Address of Organization"],
        unique: [true, "Email Address Already Taken"],
        },
        password: {
        type: String,
        required: [true, "Please Enter the Password"],
        },
    },
    {
        timestamps: true,
    }
    );

const Organization = mongoose.model("Organization", orgSchema);
export default Organization;