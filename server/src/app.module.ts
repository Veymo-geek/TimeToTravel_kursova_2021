import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TourModule } from './tour/tour.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_URI),
    AuthModule,
    UsersModule,
    TourModule,
    OrderModule,
  ],
})
export class AppModule {}
