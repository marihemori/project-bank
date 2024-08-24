export class ManagerDto {
  id: string;
  fullname: string;
  customers: string[];
  constructor(manager) {
    this.id = manager.id;
    this.fullname = manager.fullname;
    this.customers = manager.customers;
  }
}
