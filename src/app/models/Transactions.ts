import { Entities } from "./Entities";
import { EventualTransaction } from "./EventualTransaction";
import { FixedTransaction } from "./FixedTransaction";

export class Transactions {
    id: number | null = null;
    type: 'Expense' | 'Earning' = 'Expense';
    name: string = '';
    categoryType: 'Fixed' | 'Eventual' = 'Eventual';
    idCategory: number | null = null;
    idEntity: number | null = null;
    entity: Entities = new Entities();
    fixedTransaction: FixedTransaction = new FixedTransaction();
    eventualTransaction: EventualTransaction = new EventualTransaction();
}