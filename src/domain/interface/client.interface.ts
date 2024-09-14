import { ClientEntity } from '../entity/client.entity';

export interface IClientRepository {
  getAllClients(): Promise<ClientEntity[]>;
  getClientById(id: string): Promise<ClientEntity> | null;
  createClient(client: ClientEntity): Promise<ClientEntity>;
  updateClient(id: string, client: ClientEntity): Promise<ClientEntity>;
  deleteClientById(id: string): Promise<boolean>;
}
