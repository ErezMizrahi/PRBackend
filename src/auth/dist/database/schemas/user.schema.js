import mongoose, { Schema } from "mongoose";
const userSchema = new Schema({
    phoneNumber: { type: String, unique: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, {
    timestamps: true
});
export default mongoose.model("UserSchema", userSchema);
//# sourceMappingURL=user.schema.js.map