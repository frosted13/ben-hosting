import "dotenv/config";
import app, {json} from "express";
import { connect } from "mongoose";
import { Key } from "./models/Keys";
import { generateRandomKey } from "./utils";
import { useAuth } from "./middlewares/useAuthenticated";

const server = app();

server.use(json());

const requiredEnvs = ["PORT", "API_KEY", "MONGO_URI"];
const missingEnvs = [];

for (const env of requiredEnvs) {
  if (!process.env[env]) {
    missingEnvs.push(env);
  }
}

if (missingEnvs.length > 0) {
  console.error(`Missing required env variables: ${missingEnvs.join(", ")}`);
  process.exit(1);
}

server.post("/generateKey", useAuth, async (req, res) => {
  const purchaser = req.body.robloxId;

  if (!purchaser) {
    return res.status(400).json({
      success: false,
      error: "Missing purchaser",
    });
  }

  try {
    const wlKey = await Key.create({
      _id: generateRandomKey(),
      robloxId: purchaser,
    });

    res.json({
      success: true,
      key: wlKey._id,
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      error,
    });
  }
});

server.listen(process.env.PORT!, () => {
  console.log("Server is listening on port 3000");

  connect(process.env.MONGO_URI!).catch((error) => {
    throw error;
  });
});
