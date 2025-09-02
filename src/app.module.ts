import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { EventsModule } from "./events/events.module";
import { UsersModule } from "./users/users.module";
import { OrdersModule } from './orders/orders.module';

@Module({
	imports: [EventsModule, UsersModule, OrdersModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
