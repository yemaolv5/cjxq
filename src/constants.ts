import { FinancialData } from "./types";

export const FINANCIAL_DATA: FinancialData = {
  date: "2026年3月31日",
  totalIncome: 0,
  totalExpense: 26535.00,
  balance: -26535.00,
  incomeCategories: [
    { name: "物业费收入", amount: 0 },
    {
      name: "公共收益收入",
      amount: 0,
      subItems: [
        { name: "电梯广告", amount: 0 },
        { name: "车位管理", amount: 0 },
        { name: "公共设施经营", amount: 0 },
        { name: "其他公共收入", amount: 0 },
      ],
    },
    { name: "其他收入（滞纳金、利息等）", amount: 0 },
  ],
  expenseCategories: [
    {
      name: "人员费用",
      amount: 18500.00,
      subItems: [
        { name: "保安工资社保", amount: 8000.00 },
        { name: "保洁工资社保", amount: 5000.00 },
        { name: "维修工资社保", amount: 3000.00 },
        { name: "客服工资社保", amount: 2500.00 },
      ],
    },
    {
      name: "公共设施维护",
      amount: 5800.00,
      subItems: [
        { name: "电梯维保 / 年检", amount: 1200.00 },
        { name: "消防设施维护", amount: 800.00 },
        { name: "公共照明电费", amount: 1500.00 },
        { name: "绿化养护", amount: 1300.00 },
        { name: "垃圾清运", amount: 1000.00 },
      ],
    },
    { name: "行政办公费用", amount: 1235.00 },
    { name: "设备物资采购", amount: 1000.00 },
    { name: "其他合规支出", amount: 0 },
  ],
};
