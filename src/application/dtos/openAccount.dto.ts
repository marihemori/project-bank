export class OpenAccountDto {
  fullname: string;
  address: string;
  phone: string;
  income: number;
  customerId: string;
  accountType: 'Corrente' | 'Poupança';
  managerId?: string;
}
