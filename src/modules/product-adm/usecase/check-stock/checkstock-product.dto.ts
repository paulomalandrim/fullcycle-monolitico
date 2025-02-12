export interface CheckStockProductInputDto{
    id?: string;
}

export interface CheckStockProductOutputDto{
    id: string;
    stock: number;
}