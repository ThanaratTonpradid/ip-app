import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { OwaUser } from '../../entities/owa_user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([OwaUser])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
