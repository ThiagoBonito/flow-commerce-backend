import { Module } from "@nestjs/common";
import { ReportsService } from "./reports.service";
import { PrismaModule } from "prisma/prisma.module";

@Module({
	imports: [PrismaModule],
	providers: [ReportsService],
})
export class ReportsModule {}
