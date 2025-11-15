import { Injectable } from '@nestjs/common';
import { CreateCreatedProductDto } from './dto/create-created.product.dto';
import { UpdateCreatedProductDto } from './dto/update-created.product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatedProduct } from './entities/created.product.entity';
import { Repository } from 'typeorm';
import { Product } from 'src/plan/product/entities/product.entity';
import { Meterial } from 'src/meterials/entities/meterial.entity';
import { LeatherBatch } from 'src/leather_batch/entities/leather_batch.entity';
import { log } from 'console';
import { MeterialsService } from 'src/meterials/meterials.service';
import { OtherMeterial } from 'src/other_meterial/entities/other_meterial.entity';

@Injectable()
export class CreatedProductsService {
  constructor(
    @InjectRepository(CreatedProduct)
    private readonly createdProductRepository: Repository<CreatedProduct>,

    @InjectRepository(Product)
    private readonly productPlanRepository: Repository<Product>,


    @InjectRepository(LeatherBatch)
    private readonly leatherBatchRepository: Repository<LeatherBatch>,


    @InjectRepository(OtherMeterial)
    private readonly otherMeterialRepository: Repository<OtherMeterial>,

    @InjectRepository(Meterial)
    private readonly meterialRepository: Repository<Meterial>,

    private readonly meterialsService: MeterialsService,
  ) {}

 async create(createCreatedProductDto: CreateCreatedProductDto) {

  // product plan getting
     const productPlan = await this.productPlanRepository.createQueryBuilder('products')
     .leftJoinAndSelect('products.leatherBatches','leatherBatch')
     .where('products.id = :id',{id:createCreatedProductDto.product_PlanId})
     .getOne();
     log('productPlan',productPlan);

     const leatherBatches = productPlan?.leatherBatches;

    //  meterial getting
     const metrial_Id = createCreatedProductDto.leatherMeterialIds;
     const meterials = await this.meterialRepository.createQueryBuilder('meterial')
    .leftJoinAndSelect('meterial.user', 'user')
    .leftJoinAndSelect('meterial.leatherBatch','leatherBatch')
    .where('meterial.id = :id', { id: metrial_Id })
    .getOne();
     log('meterials',meterials);

    // total area and total cost calculation
     const totalArea = (productPlan?.area ?? 0) * createCreatedProductDto.count;
     const curretArea = ( meterials?.available_Area ?? 0) - totalArea;
     log('totalArea',totalArea);
      const totalCost = (productPlan?.totalCost ?? 0) * (productPlan?.totalCost??0);
      log('totalCost',totalCost);

    //update meterialas available area
      const updateMeterial = await this.meterialsService.updateMeterialsData((meterials?.id ?? 0), curretArea);
      console.log(updateMeterial);

     // get other meterials
     const other_Meterial_Ids = createCreatedProductDto.other_Meterial_TypeId;

     other_Meterial_Ids?.map(async (id)=>{
     const otherMeterial = await this.otherMeterialRepository.createQueryBuilder('otherMeterial')
    .leftJoinAndSelect('otherMeterial.typeOtherMeterial', 'typeOtherMeterial')
    .leftJoinAndSelect('otherMeterial.user', 'user')
    .where('otherMeterial.other_Meterial_Id = :id', { id })
    .getOne();

    const totalOtherMeterialCost = 
    console.log(otherMeterial);


     })
     
    


      

     // created product instance creation save
       const createdProduct = await this.createdProductRepository.create({
      ...createCreatedProductDto,
      product_Plan: { id: createCreatedProductDto.product_PlanId },
      total_cost: totalCost,
     });
    return this.createdProductRepository.save(createdProduct);
  }

  findAll() {
    return `This action returns all createdProducts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} createdProduct`;
  }

  update(id: number, updateCreatedProductDto: UpdateCreatedProductDto) {
    return `This action updates a #${id} createdProduct`;
  }

  remove(id: number) {
    return `This action removes a #${id} createdProduct`;
  }
}
