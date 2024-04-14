export class FixedTransaction {
    id: number | null = null;
    type: 'Monthly' | 'Annual' | 'Weekly' | 'Amount of Years' | 'Amount of Months' | 'Amount of Weeks' | 'Amount of Days' = 'Monthly';
    amountTime: number | null = null;
    startDate: Date = new Date();
    endDate: Date | null = null;
    isInstallment: boolean = false;
    amountInstallment: number | null = null;
    value: number = 0;
}