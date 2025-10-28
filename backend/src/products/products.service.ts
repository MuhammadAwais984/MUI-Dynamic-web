import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(data: { name: string; img: string }) {
    return this.prisma.product.create({ data });
  }

  async findLatest() {
    return this.prisma.product.findMany({
      orderBy: { updatedAt: 'desc' },
    });
  }

  async findAll() {
    return this.prisma.product.findMany({
      orderBy: { id: 'desc' },
    });
  }

  async updateName(id: number, name: string) {
    await this.prisma.product.update({
      where: { id },
      data: { name },
    });
    return this.prisma.product.findUnique({ where: { id } });
  }

  async delete(id: number) {
    return this.prisma.product.delete({ where: { id } });
  }
}
