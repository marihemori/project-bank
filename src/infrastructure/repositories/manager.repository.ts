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

  // Lista todos os gerentes
  async findAll(): Promise<ManagerEntity[]> {
    // SELECT * FROM manager
    return this.managerRepository.find();
  }

  // Lista um único gerente
  async findById(id: string): Promise<ManagerEntity> | null {
    // SELECT * FROM manager WHERE id = ?
    return await this.managerRepository.findOneBy({ id });
  }

  // Cria um gerente
  async create(manager: ManagerEntity): Promise<ManagerEntity> {
    // INSERT INTO manager (fullname) VALUES (?)
    return this.managerRepository.save(manager);
  }

  // Atualiza um gerente
  async update(id: string, manager: ManagerEntity): Promise<ManagerEntity> {
    // UPDATE manager SET fullname = ? WHERE id = ?
    return this.managerRepository.save({ id, ...manager });
  }

  // Deleta um gerente
  async delete(id: string): Promise<boolean> {
    // DELETE FROM customer WHERE id = ?
    const result = await this.managerRepository.delete(id);
    return result.affected > 0;
  }
}
