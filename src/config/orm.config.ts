import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { LeatherBatch } from "src/leather_batch/entities/leather_batch.entity";
import { Meterial } from "src/meterials/entities/meterial.entity";
import { OtherMeterial } from "src/other_meterial/entities/other_meterial.entity";
import { Product } from "src/plan/product/entities/product.entity";
import { TypesOtherMeterial } from "src/types_other_meterial/entities/types_other_meterial.entity";
import { User } from "src/user/entities/user.entity";

export default():TypeOrmModuleOptions=>{
     return{
          type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    autoLoadEntities: true,
    entities: [  User, Meterial,LeatherBatch, OtherMeterial, TypesOtherMeterial, Product],
    synchronize: true,
     }
}