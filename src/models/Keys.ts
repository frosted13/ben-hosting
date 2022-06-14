import { Schema, Model, model } from "mongoose";

interface Key {
  _id: string;
  used: boolean;
  robloxId: string;
  discordId: string;
  createdAt: Date;
}

const KeySchema = new Schema({
    _id: String,
    used: { type: Boolean, default: false },
    robloxId: { type: String, required: true },
    discordId: { type: String, default: null },
    createdAt: { type: Date, default: Date.now },
});

export const Key: Model<Key> = model("keys", KeySchema);
