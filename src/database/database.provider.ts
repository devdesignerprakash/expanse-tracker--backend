import { ConfigService } from "@nestjs/config";
import mongoose from "mongoose";
export const databaseProviders= [
    {
        provide:'DATABASE_CONNECTION',
        inject:[ConfigService],
        useFactory:async(configService:ConfigService)=>{
            const uri= configService.get<string>('db.uri');
            if (!uri) throw new Error('DATABASE_URI is not defined');
            return await mongoose.connect(uri).then(()=>{
                console.log('Connected to database');
            }).catch((err)=>{
                console.error('Database connection error:', err);
                throw err;
            });

        }
    }  
]