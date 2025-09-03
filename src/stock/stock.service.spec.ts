import { Test, TestingModule } from "@nestjs/testing";
import { StockService } from "./stock.service";
import { PrismaService } from "prisma/prisma.service";
import { ItemDTO } from "src/orders/dto/create-order";

describe("StockService", () => {
	let service: StockService;
	let prisma: PrismaService;

	const mockPrisma = {
		product: { update: jest.fn() },
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				StockService,
				{ provide: PrismaService, useValue: mockPrisma },
			],
		}).compile();

		service = module.get<StockService>(StockService);
		prisma = module.get<PrismaService>(PrismaService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	it("update should call prisma.product.update with correct parameters", async () => {
		const item: ItemDTO = { productId: 1, quantity: 5 };

		(prisma.product.update as jest.Mock).mockResolvedValue({
			id: item.productId,
			stock: 95,
		});

		await service.update(item);

		expect(prisma.product.update).toHaveBeenCalledWith({
			where: { id: item.productId },
			data: { stock: { decrement: item.quantity } },
		});
	});
});
