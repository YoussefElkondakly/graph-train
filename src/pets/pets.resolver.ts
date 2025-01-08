import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { PetsService } from './pets.service';
import { Pet } from './pet.entity';
import { CreatePetInput } from './dto/create-pet.input';
import { Owner } from 'src/owners/entities/owner.entity';

@Resolver(of =>Pet)
export class PetsResolver {
    constructor(private readonly petService:PetsService){}
    @Query(returns=>[Pet])
    pets(){
        return this.petService.findAll();
    }
    @Query(returns=>Pet)
    findPet(@Args('id',{type:()=>Int})  id:number){
        return this.petService.findOne(id);
    }
    @Mutation(returns=>Pet)
    createPet(@Args('createPetInput') createPetInput:CreatePetInput):Promise<Pet>{
        return this.petService.createPet(createPetInput);
    }
    @ResolveField(()=>Owner)
    owner(@Parent() pet:Pet):Promise<Owner>{
        return this.petService.getOwner(pet.ownerId);
        }
}
