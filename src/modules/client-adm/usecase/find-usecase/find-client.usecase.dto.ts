import Address from "../../../@shared/domain/value-object/address.value-object";

export interface FindClientInputDto {
    id: string;
}

export interface FindClientOutputDto {
    id: string;
    name: string;
    email: string;
    address: Address;
    createdAt: Date;
    updatedAt: Date;
}