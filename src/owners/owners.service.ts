import { Injectable } from '@nestjs/common';
import { CreateOwnerInput } from './dto/create-owner.input';
import { UpdateOwnerInput } from './dto/update-owner.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Owner } from './entities/owner.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OwnersService {
  constructor(@InjectRepository(Owner) private readonly ownerRepo:Repository<Owner>){}
  create(createOwnerInput: CreateOwnerInput):Promise<Owner> {
    const newOwner=this.ownerRepo.create(createOwnerInput)
    return this.ownerRepo.save(newOwner)
  }

  findAll():Promise<Owner[]> {
    const owners=this.ownerRepo.find()
        return owners
  }

  async findOne(id: number) {
    return await this.ownerRepo.findOneOrFail({where:{id}});
  }

  update(id: number, updateOwnerInput: UpdateOwnerInput) {
  const up=this.ownerRepo.update(id,updateOwnerInput)
  return up
  }

  remove(id: number) {
    return this.ownerRepo.delete(id)
  }
}
