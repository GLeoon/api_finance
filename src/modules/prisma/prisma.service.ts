import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  /**
   * This method is called when the module is initialized.
   * It connects to the Prisma client to establish a database connection.
   */
  async onModuleInit() {
    await this.$connect();
  }
  /**
   * This method is called when the module is destroyed.
   * It disconnects the Prisma client to clean up resources.
   */
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
