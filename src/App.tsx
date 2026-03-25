/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  ShieldCheck, 
  PhoneCall, 
  Info, 
  ChevronRight,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  Calendar
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { FINANCIAL_DATA } from './constants';
import { FinancialItem } from './types';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const StatCard = ({ title, amount, icon: Icon, type }: { 
  title: string; 
  amount: number; 
  icon: React.ElementType; 
  type: 'income' | 'expense' | 'balance' 
}) => {
  const isNegative = amount < 0;
  
  const colorClass = useMemo(() => {
    if (type === 'income') return 'text-blue-600 bg-blue-50';
    if (type === 'expense') return 'text-amber-600 bg-amber-50';
    if (type === 'balance') return isNegative ? 'text-red-600 bg-red-50' : 'text-emerald-600 bg-emerald-50';
    return 'text-gray-600 bg-gray-50';
  }, [type, isNegative]);

  const borderClass = useMemo(() => {
    if (type === 'income') return 'border-blue-100';
    if (type === 'expense') return 'border-amber-100';
    if (type === 'balance') return isNegative ? 'border-red-100' : 'border-emerald-100';
    return 'border-gray-100';
  }, [type, isNegative]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "p-3 rounded-xl border bg-white shadow-sm flex flex-col justify-between h-full",
        borderClass
      )}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-medium text-gray-500 truncate mr-1">{title}</span>
        <div className={cn("p-1.5 rounded-lg shrink-0", colorClass)}>
          <Icon size={14} />
        </div>
      </div>
      <div>
        <div className="flex items-baseline gap-0.5 flex-wrap">
          <span className="text-[10px] font-semibold text-gray-400">¥</span>
          <span className={cn(
            "text-sm font-bold tracking-tight break-all",
            type === 'balance' ? (isNegative ? 'text-red-600' : 'text-emerald-600') : 'text-gray-900'
          )}>
            {amount.toLocaleString('zh-CN', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
          </span>
        </div>
        <div className="mt-1 flex items-center gap-1 text-[8px] text-gray-400">
          {type === 'income' && <ArrowUpRight size={10} className="text-blue-500" />}
          {type === 'expense' && <ArrowDownRight size={10} className="text-amber-500" />}
          <span className="truncate">本期累计</span>
        </div>
      </div>
    </motion.div>
  );
};

interface CategoryItemProps {
  item: FinancialItem;
  depth?: number;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ item, depth = 0 }) => {
  return (
    <div className={cn(
      "border-b border-gray-50 last:border-0",
      depth > 0 ? "bg-gray-50/30" : "bg-white"
    )}>
      <div className={cn(
        "flex items-center justify-between py-4 px-4",
        depth > 0 ? "pl-8" : "pl-4"
      )}>
        <div className="flex items-center gap-2">
          {depth === 0 && <div className="w-1 h-4 bg-blue-500 rounded-full" />}
          <span className={cn(
            "text-sm",
            depth === 0 ? "font-semibold text-gray-800" : "text-gray-600"
          )}>{item.name}</span>
        </div>
        <span className={cn(
          "text-sm font-mono",
          item.amount > 0 ? "text-gray-900" : "text-gray-400"
        )}>
          ¥{item.amount.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}
        </span>
      </div>
      {item.subItems && item.subItems.map((sub, idx) => (
        <CategoryItem key={idx} item={sub} depth={depth + 1} />
      ))}
    </div>
  );
};

export default function App() {
  const [isIncomeExpanded, setIsIncomeExpanded] = useState(false);
  const [isExpenseExpanded, setIsExpenseExpanded] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-[480px] bg-[#F8FAFC] min-h-screen shadow-2xl relative">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-xl shadow-blue-200 shadow-lg">
              <ShieldCheck className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900 leading-tight">城建小区</h1>
              <p className="text-xs text-gray-500 font-medium">信托制物业收支公示v1.0</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full">
            <Calendar size={14} className="text-gray-500" />
            <span className="text-xs font-semibold text-gray-600">截止 {FINANCIAL_DATA.date}</span>
          </div>
        </div>
      </header>

      <main className="px-4 py-8 space-y-8 pb-12">
        {/* Overview Section */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1.5 h-6 bg-blue-600 rounded-full" />
            <h2 className="text-xl font-bold text-gray-800">财务总览</h2>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <StatCard 
              title="本期总收入" 
              amount={FINANCIAL_DATA.totalIncome} 
              icon={TrendingUp} 
              type="income" 
            />
            <StatCard 
              title="本期总支出" 
              amount={FINANCIAL_DATA.totalExpense} 
              icon={TrendingDown} 
              type="expense" 
            />
            <StatCard 
              title="本期结余" 
              amount={FINANCIAL_DATA.balance} 
              icon={Wallet} 
              type="balance" 
            />
          </div>
        </section>

        <div className="grid grid-cols-1 gap-8">
          {/* Income Details */}
          <section className="space-y-4">
            <button 
              onClick={() => setIsIncomeExpanded(!isIncomeExpanded)}
              className="flex items-center justify-between w-full group"
            >
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-6 bg-emerald-500 rounded-full" />
                <h2 className="text-xl font-bold text-gray-800">收入汇总</h2>
              </div>
              <div className={cn(
                "p-1 rounded-lg transition-all duration-300",
                isIncomeExpanded ? "bg-emerald-100 text-emerald-600 rotate-180" : "bg-gray-100 text-gray-400 group-hover:bg-gray-200"
              )}>
                <ChevronDown size={20} />
              </div>
            </button>
            
            <AnimatePresence>
              {isIncomeExpanded && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                    {FINANCIAL_DATA.incomeCategories.map((cat, idx) => (
                      <CategoryItem key={idx} item={cat} />
                    ))}
                    <div className="bg-emerald-50 p-4 flex justify-between items-center border-t border-emerald-100">
                      <span className="font-bold text-emerald-800">总计收入</span>
                      <span className="font-mono font-bold text-emerald-800 text-lg">
                        ¥{FINANCIAL_DATA.totalIncome.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          {/* Expense Details */}
          <section className="space-y-4">
            <button 
              onClick={() => setIsExpenseExpanded(!isExpenseExpanded)}
              className="flex items-center justify-between w-full group"
            >
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-6 bg-amber-500 rounded-full" />
                <h2 className="text-xl font-bold text-gray-800">支出汇总</h2>
              </div>
              <div className={cn(
                "p-1 rounded-lg transition-all duration-300",
                isExpenseExpanded ? "bg-amber-100 text-amber-600 rotate-180" : "bg-gray-100 text-gray-400 group-hover:bg-gray-200"
              )}>
                <ChevronDown size={20} />
              </div>
            </button>
            
            <AnimatePresence>
              {isExpenseExpanded && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                    {FINANCIAL_DATA.expenseCategories.map((cat, idx) => (
                      <CategoryItem key={idx} item={cat} />
                    ))}
                    <div className="bg-amber-50 p-4 flex justify-between items-center border-t border-amber-100">
                      <span className="font-bold text-amber-800">总计支出</span>
                      <span className="font-mono font-bold text-amber-800 text-lg">
                        ¥{FINANCIAL_DATA.totalExpense.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        </div>

        {/* Explanations */}
        <div className="grid grid-cols-1 gap-6">
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-3xl text-white shadow-xl shadow-blue-100"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-md">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-lg font-bold">资金说明</h3>
            </div>
            <p className="text-sm leading-relaxed text-blue-50 opacity-90">
              本小区严格执行信托制物业管理，所有收支实行专户管理、专款专用、逐笔公示，物业费与公共收益归全体业主所有，按照业主共同决定使用。
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gray-100 rounded-lg text-gray-600">
                <Info size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-800">监督说明</h3>
            </div>
            <p className="text-sm leading-relaxed text-gray-600 mb-6">
              业主可向业委会申请查阅原始凭证，本公示数据真实可查，接受全体业主共同监督。
            </p>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 text-blue-600 rounded-full">
                  <PhoneCall size={18} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">监督电话</p>
                  <p className="text-lg font-bold text-gray-800">0471-666888</p>
                </div>
              </div>
              <motion.button 
                whileTap={{ scale: 0.95 }}
                className="bg-white text-gray-400 p-2 rounded-xl border border-gray-200 hover:text-blue-600 hover:border-blue-200 transition-colors"
              >
                <ChevronRight size={20} />
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Footer info */}
        <footer className="pt-8 text-center space-y-2">
          <p className="text-xs text-gray-400 font-medium uppercase tracking-widest">
            Transparency • Trust • Community
          </p>
          <p className="text-[10px] text-gray-300">
            为您服务小钥匙
          </p>
        </footer>
      </main>
    </div>
  </div>
);
}
