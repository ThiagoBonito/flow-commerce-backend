import { Module } from "@nestjs/common";
import { PaymentWorker } from "./payment.worker";
import { PrismaModule } from "prisma/prisma.module";
import { PaymentService } from "src/payment/payment.service";

@Module({
	imports: [PrismaModule],
	providers: [PaymentWorker, PaymentService],
})
export class PaymentWorkerModule {}
