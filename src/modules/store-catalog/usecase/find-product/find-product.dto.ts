export interface FindProductsInputDto {
        id: string;
}

export interface FindProductsOutputDto {
        id: string;
        name: string;
        description: string;
        salesPrice: number;
}