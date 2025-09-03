import { Test, TestingModule } from "@nestjs/testing";
import { PaymentService } from "./payment.service";
import { PrismaService } from "prisma/prisma.service";
import { PaymentStatusEnum } from "src/orders/domain/enums/payment-status.enum";

describe("PaymentService", () => {
	let service: PaymentService;
	let prisma: PrismaService;

	const mockPrisma = {
		payment: { update: jest.fn() },
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				PaymentService,
				{ provide: PrismaService, useValue: mockPrisma },
			],
		}).compile();

		service = module.get<PaymentService>(PaymentService);
		prisma = module.get<PrismaService>(PrismaService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	it("update should call prisma.payment.update with correct parameters", async () => {
		const orderId = 1;
		const status = PaymentStatusEnum.PAID;

		(prisma.payment.update as jest.Mock).mockResolvedValue({
			orderId,
			statusId: status,
		});

		await service.update(orderId, status);

		expect(prisma.payment.update).toHaveBeenCalledWith({
			where: { orderId },
			data: { statusId: status },
		});
	});
});
