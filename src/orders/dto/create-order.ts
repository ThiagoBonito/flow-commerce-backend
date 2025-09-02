import { Type } from "class-transformer";
import { IsArray, IsNumber, ValidateNested } from "class-validator";

export class CreateOrderDTO {
	@IsNumber()
	userId: number;

	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => ItemDTO)
	orderItems: ItemDTO[];

	@IsNumber()
	payment: number;
}

export class ItemDTO {
	@IsNumber()
	productId: number;

	@IsNumber()
	quantity: number;
}
