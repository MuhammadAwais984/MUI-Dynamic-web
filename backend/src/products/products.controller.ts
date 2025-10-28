import {
  Controller,
  UploadedFile,
  UseInterceptors,
  Body,
  Get,
  Delete,
  Param,
  NotFoundException,
  Post,
  Patch,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ProductsService } from './products.service';
import { Express } from 'express';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${unique}${ext}`);
        },
      }),
    }),
  )
  async createProduct(
    @UploadedFile() file: Express.Multer.File,
    @Body('name') name: string,
  ) {
    const img = `/uploads/${file.filename}`;
    return this.productsService.create({ name, img });
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${unique}${ext}`);
        },
      }),
    }),
  )
  async updateProduct(
    @Param('id') id: number,
    @Body() body: any,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const existing = await this.productsService.findAll();
    const product = existing.find(p => p.id === +id);
    if (!product) throw new NotFoundException('Product not found');

    let img = product.img;
    if (file) {
      img = '/uploads/' + file.filename;
    }
    return this.productsService.updateName(+id, body.name || product.name);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.productsService.delete(+id);
  }

  @Get('latest')
  getLatest() {
    return this.productsService.findLatest();
  }

  @Get()
  getAll() {
    return this.productsService.findAll();
  }
}
