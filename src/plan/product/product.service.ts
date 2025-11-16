import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Product } from './entities/product.entity';
import { LeatherBatch } from 'src/leather_batch/entities/leather_batch.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { OtherMeterial } from 'src/other_meterial/entities/other_meterial.entity';
import { Meterial } from 'src/meterials/entities/meterial.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
    @InjectRepository(LeatherBatch) private readonly leatherBatchRepository: Repository<LeatherBatch>,
    @InjectRepository(OtherMeterial) private readonly otherMeterialRepository: Repository<OtherMeterial>,
    @InjectRepository(Meterial) private readonly meterialRepository: Repository<Meterial>,
  ) {}

  async create(createProductDto: CreateProductDto) {

    if (!createProductDto) throw new BadRequestException('Missing body');

    let meterialCost = 0;
    let totalOtherMeterialCost = 0;
    let totalCost = 0;

    //find meterials id
    const meterials = await this.meterialRepository.find({
      where: { id: createProductDto.meterials }
    });

    meterialCost = meterials[0].one_Cost * createProductDto.area;

    //other meterial cost calculation
     // other material cost calculation — await all promises and sum
    const otherItems = Array.isArray(createProductDto.otherLetherMeterial) ? createProductDto.otherLetherMeterial : [];
    const otherCosts = await Promise.all(otherItems.map(async (other) => {
      const found = await this.otherMeterialRepository.find({
        where: { other_Meterial_Id: other.other_Meterial_TypeId }
      });
      if (!found.length) throw new BadRequestException(`OtherMeterial id ${other.other_Meterial_TypeId} not found`);
      return (found[0].unit_cost ?? 0) * (other.quantity ?? 0);
    }));
    totalOtherMeterialCost = otherCosts.reduce((s, c) => s + c, 0);

    console.log('totalOtherMeterialCost', totalOtherMeterialCost);

    
    //labor, meterial cost, other meterial cost calculation
    totalCost = meterialCost + totalOtherMeterialCost + (createProductDto.laborCost??0);

    const lbIds = Array.isArray(createProductDto.leatherBatch) ? createProductDto.leatherBatch : [];
    const product = await this.productRepository.create({ ...createProductDto, 
      otherLetherMeterial:(createProductDto.otherLetherMeterial).map(otherMeterial=>({
        other_Meterial_Id:otherMeterial.other_Meterial_TypeId,
        quantity: otherMeterial.quantity
      })),
      otherMeterialCost: totalOtherMeterialCost ,
      meterialCost: meterialCost,
      totalCost: totalCost
   });

  return this.productRepository.save(product);


    // if (lbIds.length) {
    //   const batches = await this.leatherBatchRepository.find({ where: { id: In(lbIds) } });
    //   if (batches.length !== lbIds.length) {
    //     throw new BadRequestException('One or more leatherBatch ids not found');
    //   }
    //   product.leatherBatches = batches;
    // }

//use map function
//**other meterial calculation */
//get othermeterial ids 
//check availability in other meterials
//calculate the total cost
// othermeterial cost = unit cost * quentityused
// save cost in othermeterial

//not use map function
//**calcutaet the meterial cost  */
// get meterial id from meterials
// check availability in meterials
//calculate the  total cost = onecost * total area used
// save the cost in meterials


    return this.productRepository.save(product);
  }

  //** Update the quentity calculation */
  //get the meterial id and updated quentity
  // update the quentity
  findAll() {
    return this.productRepository.createQueryBuilder('product')
      .leftJoinAndSelect('product.leatherBatches','leatherBatch')
      .leftJoinAndSelect('product.otherLetherMeterial','otherMeterial')
      .getMany();
  }

  findOne(id: number) {
    return this.productRepository.createQueryBuilder('product')
      .leftJoinAndSelect('product.leatherBatches','leatherBatch')
      .where('product.id = :id',{id})
      .getOne()
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.productRepository.update(id, updateProductDto);
  }

  remove(id: number) {
    return this.productRepository.delete(id);
  }
}
