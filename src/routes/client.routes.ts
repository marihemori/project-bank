import { Module } from '@nestjs/common';
import { RouterModule, Routes } from '@nestjs/core';
import { CustomerModule } from '../modules/customer.module';

const routes: Routes = [
  {
    path: '/',
    module: CustomerModule,
  },
];

@Module({
  imports: [RouterModule.register(routes)],
})
export class ClientRoutingModule {}
