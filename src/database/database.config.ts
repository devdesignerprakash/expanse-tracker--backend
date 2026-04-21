import { registerAs } from "@nestjs/config"


export const dbConfig = registerAs('db', () => ({
  uri: process.env.MONGO_URI,
}))