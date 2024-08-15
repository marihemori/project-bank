import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ManagerEntity } from 'src/domain/entity/manager.entity';
import { IManagerRepository } from 'src/domain/interface/manager.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ManagerRepository implements IManagerRepository {
  constructor(
    @InjectRepository(ManagerEntity)
    private readonly managerRepository: Repository<ManagerEntity>,
  ) {}

  async findAll(): Promise<ManagerEntity[]> {
    return this.managerRepository.find();
  }

  async findById(id: string): Promise<ManagerEntity> | null {
    // SELECT * FROM account WHERE id = ?
    return await this.managerRepository.findOneBy({ id });
  }

  async save(manager: ManagerEntity): Promise<ManagerEntity> {
    return this.managerRepository.save(manager);
  }

  async update(id: string, manager: ManagerEntity): Promise<ManagerEntity> {
    return this.managerRepository.save({ id, ...manager });
  }

  async delete(id: string): Promise<boolean> {
    // DELETE FROM customer WHERE id = ?
    const result = await this.managerRepository.delete(id);
    return result.affected > 0;
  }
}
