import { Manager } from 'src/domain/models/manager.model';

export class ManagerDto {
  id: string;
  fullname: string;
  customers: string[];
  constructor(manager: Manager) {
    this.id = manager.getId();
    this.fullname = manager.getFullname();
    this.customers = manager.getCustomers().map((customer) => customer.getId());
  }
}
