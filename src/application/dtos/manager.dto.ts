export class ManagerDto {
  id: string;
  fullname: string;
  customers: string[];
  constructor(manager) {
    this.id = manager.getId();
    this.fullname = manager.getFullName();
    this.customers = manager.getCustomers();
  }
}
