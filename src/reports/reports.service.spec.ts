import { Test, TestingModule } from "@nestjs/testing";
import { ReportsService } from "./reports.service";
import { PrismaService } from "prisma/prisma.service";

describe("ReportsService", () => {
	let service: ReportsService;
	let prisma: PrismaService;

	const mockPrisma = {
		order: { findMany: jest.fn() },
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				ReportsService,
				{ provide: PrismaService, useValue: mockPrisma },
			],
		}).compile();

		service = module.get<ReportsService>(ReportsService);
		prisma = module.get<PrismaService>(PrismaService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	it("generateDailyReport should call prisma.order.findMany with correct dates", async () => {
		const mockOrders = [
			{ id: 1, orderItems: [], payment: {} },
			{ id: 2, orderItems: [], payment: {} },
		];
		(prisma.order.findMany as jest.Mock).mockResolvedValue(mockOrders);

		const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});

		await service.generateDailyReport();

		const today = new Date();
		today.setHours(0, 0, 0, 0);
		const tomorrow = new Date(today);
		tomorrow.setDate(today.getDate() + 1);

		expect(prisma.order.findMany).toHaveBeenCalledWith({
			where: {
				createdAt: {
					gte: today,
					lt: tomorrow,
				},
			},
			include: {
				orderItems: true,
				payment: true,
			},
		});

		expect(logSpy).toHaveBeenCalledWith(
			`Relatório diário gerado: ${mockOrders.length} pedidos encontrados.`,
		);

		logSpy.mockRestore();
	});
});
