import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
        unique: true,
    },
    user: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: false,
    },
    read: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

export default mongoose.model("Notification", NotificationSchema);