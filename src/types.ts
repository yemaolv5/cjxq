export interface FinancialItem {
  name: string;
  amount: number;
  subItems?: FinancialItem[];
}

export interface FinancialData {
  date: string;
  totalIncome: number;
  totalExpense: number;
  balance: number;
  incomeCategories: FinancialItem[];
  expenseCategories: FinancialItem[];
}
