import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientEntity } from 'src/domain/entity/client.entity';
import { IClientRepository } from 'src/domain/interface/client.interface';
import { Repository } from 'typeorm';

@Injectable()
export class ClientRepository implements IClientRepository {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
  ) {}

  // Pega todos os clientes
  async getAllClients(): Promise<ClientEntity[]> {
    // SELECT * FROM clients
    return await this.clientRepository.find({
      relations: ['accounts', 'manager'],
    });
  }

  // Pega um cliente por id
  async getClientById(id: string): Promise<ClientEntity> | null {
    // SELECT * FROM clients WHERE id = ?
    return await this.clientRepository.findOne({
      where: { id },
      relations: ['accounts', 'manager'],
    });
  }

  // Cria um cliente
  async createClient(client: ClientEntity): Promise<ClientEntity> {
    // INSERT INTO clients (...) VALUES (...)
    return await this.clientRepository.save(client);
  }

  // Atualiza um cliente
  async updateClient(id: string, client: ClientEntity): Promise<ClientEntity> {
    // UPDATE clients SET ... WHERE id = ?
    await this.clientRepository.update(id, client);
    return this.getClientById(id);
  }

  // Deleta um cliente
  async deleteClientById(id: string): Promise<boolean> {
    // DELETE FROM clients WHERE id = ?
    const result = await this.clientRepository.delete({ id });
    return result.affected > 0;
  }
}
