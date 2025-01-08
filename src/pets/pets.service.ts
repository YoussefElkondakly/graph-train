import { Injectable } from '@nestjs/common';
import { Pet } from './pet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePetInput } from './dto/create-pet.input';
import { OwnersService } from 'src/owners/owners.service';
import { Owner } from 'src/owners/entities/owner.entity';

@Injectable()
export class PetsService {
    constructor(@InjectRepository(Pet)private petsRepo:Repository<Pet>,private ownerService:OwnersService) {}
    //Query for the pet 
    async createPet(createPetInput:CreatePetInput):Promise<Pet>{
const newPet= this.petsRepo.create(createPetInput)
        return this.petsRepo.save(newPet)
    }
    async findAll():Promise<Pet[]>{

return this.petsRepo.find() 
    }
    async findOne(id:number):Promise<Pet>{
        const pet =this.petsRepo.findOneOrFail({where:{id}})
        return pet
    }
 getOwner(id:number):Promise<Owner>{
    return this.ownerService.findOne(id)
 }   
}
