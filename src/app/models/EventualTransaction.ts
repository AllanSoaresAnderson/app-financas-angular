export class EventualTransaction {
    id: number | null = null;
    name: string = '';
    value: number = 0;
    date: Date = new Date();
    type: 'Transaction' | 'Product' = 'Transaction';
}