import { Module } from "@nestjs/common";
import { StockService } from "./stock.service";
import { PrismaModule } from "prisma/prisma.module";

@Module({
	imports: [PrismaModule],
	providers: [StockService],
})
export class StockModule {}
