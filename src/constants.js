import dotenv from "dotenv";
dotenv.config({ path: ".env" });

export const googleClienId=process.env.CLIENT_ID
export const googleClientSecrect=process.env.CLIENT_SECRET
export const googleCallBackUrl=process.env.GOOGLE_CALLBACK_URL
