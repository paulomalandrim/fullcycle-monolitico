import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Id from "../../@shared/domain/value-object/id.value-object";

type InvoiceItemProps ={
    id?: Id // criada automaticamente
    name: string
    price: number
};

export default class InvoiceItem extends BaseEntity implements AggregateRoot {
  private _name: string;
  private _price: number;

  constructor(item: InvoiceItemProps) {
    super();
    this._name = item.name;
    this._price = item.price;
  }

  get name() {
    return this._name;
  }

  get price() {
    return this._price;
  }
}