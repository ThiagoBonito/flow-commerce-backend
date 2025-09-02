import { Product } from "generated/prisma";
import { ItemDTO } from "src/orders/dto/create-order";

export function checkStock(orderItems: ItemDTO[], products: Product[]) {
	for (const item of orderItems) {
		const product = products.find((p) => p.id === item.productId);

		if (!product) throw new Error(`Produto ${item.productId} não encontrado`);

		if (product.stock < item.quantity) {
			throw new Error(`Estoque insuficiente para ${product.name}`);
		}
	}
}
