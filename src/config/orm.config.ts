import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { LeatherBatch } from "src/leather_batch/entities/leather_batch.entity";
import { Meterial } from "src/meterials/entities/meterial.entity";
import { User } from "src/user/entities/user.entity";

export default():TypeOrmModuleOptions=>{
     return{
          type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [  User, Meterial,LeatherBatch],
    synchronize: true,
     }
}