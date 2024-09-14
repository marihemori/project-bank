import { Module } from '@nestjs/common';
import { RouterModule, Routes } from '@nestjs/core';
import { ClientModule } from '../modules/client.module';

const routes: Routes = [
  {
    path: '/',
    module: ClientModule,
  },
];

@Module({
  imports: [RouterModule.register(routes)],
})
export class ClientRoutingModule {}
