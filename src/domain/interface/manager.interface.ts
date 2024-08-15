import { ManagerEntity } from '../entity/manager.entity';
export interface IManagerRepository {
  findAll(): Promise<ManagerEntity[]>;
  findById(id: string): Promise<ManagerEntity> | null;
  save(manager: ManagerEntity): Promise<ManagerEntity>;
  update(id: string, manager: ManagerEntity): Promise<ManagerEntity>;
  delete(id: string): Promise<boolean>;
}
