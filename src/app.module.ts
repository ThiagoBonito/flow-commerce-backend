import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { EventsModule } from "./events/events.module";
import { UsersModule } from "./users/users.module";
import { OrdersModule } from "./orders/orders.module";
import { StockModule } from "./stock/stock.module";
import { PaymentModule } from "./payment/payment.module";
import { ReportsModule } from "./reports/reports.module";

@Module({
	imports: [
		EventsModule,
		UsersModule,
		OrdersModule,
		StockModule,
		PaymentModule,
		ReportsModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
