import { Module } from "@nestjs/common";
import { StockWorker } from "./stock.worker";
import { StockService } from "src/stock/stock.service";
import { PrismaModule } from "prisma/prisma.module";

@Module({
	imports: [PrismaModule],
	providers: [StockWorker, StockService],
})
export class StockWorkerModule {}
