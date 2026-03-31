<script setup lang="ts">
import { ref } from 'vue';
import { Motion, Presence } from '@motionone/vue';
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  ShieldCheck, 
  PhoneCall, 
  Info, 
  ChevronRight,
  ChevronDown,
  Calendar
} from 'lucide-vue-next';
import { FINANCIAL_DATA } from './constants';
import StatCard from './components/StatCard.vue';
import CategoryItem from './components/CategoryItem.vue';

const isIncomeExpanded = ref(false);
const isExpenseExpanded = ref(false);

const formatCurrency = (amount: number) => {
  return amount.toLocaleString('zh-CN', { minimumFractionDigits: 2 });
};
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex justify-center">
    <div class="w-full max-w-[480px] bg-[#F8FAFC] min-h-screen shadow-2xl relative">
      <!-- Header -->
      <header class="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div class="px-4 py-4 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="bg-blue-600 p-2 rounded-xl shadow-blue-200 shadow-lg">
              <ShieldCheck class="text-white" :size="24" />
            </div>
            <div>
              <h1 class="text-lg font-bold text-gray-900 leading-tight">城建小区</h1>
              <p class="text-xs text-gray-500 font-medium">信托制物业收支公示v1.0</p>
            </div>
          </div>
          <div class="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full">
            <Calendar :size="14" class="text-gray-500" />
            <span class="text-xs font-semibold text-gray-600">截止 {{ FINANCIAL_DATA.date }}</span>
          </div>
        </div>
      </header>

      <main class="px-4 py-8 space-y-8 pb-12">
        <!-- Overview Section -->
        <section>
          <div class="flex items-center gap-2 mb-4">
            <div class="w-1.5 h-6 bg-blue-600 rounded-full" />
            <h2 class="text-xl font-bold text-gray-800">财务总览</h2>
          </div>
          <div class="grid grid-cols-3 gap-2">
            <StatCard 
              title="本期总收入" 
              :amount="FINANCIAL_DATA.totalIncome" 
              :icon="TrendingUp" 
              type="income" 
            />
            <StatCard 
              title="本期总支出" 
              :amount="FINANCIAL_DATA.totalExpense" 
              :icon="TrendingDown" 
              type="expense" 
            />
            <StatCard 
              title="本期结余" 
              :amount="FINANCIAL_DATA.balance" 
              :icon="Wallet" 
              type="balance" 
            />
          </div>
        </section>

        <div class="grid grid-cols-1 gap-8">
          <!-- Income Details -->
          <section class="space-y-4">
            <button 
              @click="isIncomeExpanded = !isIncomeExpanded"
              class="flex items-center justify-between w-full group"
            >
              <div class="flex items-center gap-2">
                <div class="w-1.5 h-6 bg-emerald-500 rounded-full" />
                <h2 class="text-xl font-bold text-gray-800">收入汇总</h2>
              </div>
              <div :class="[
                'p-1 rounded-lg transition-all duration-300',
                isIncomeExpanded ? 'bg-emerald-100 text-emerald-600 rotate-180' : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200'
              ]">
                <ChevronDown :size="20" />
              </div>
            </button>
            
            <Presence>
              <Motion 
                v-if="isIncomeExpanded"
                :initial="{ height: 0, opacity: 0 }"
                :animate="{ height: 'auto', opacity: 1 }"
                :exit="{ height: 0, opacity: 0 }"
                :transition="{ duration: 0.3, easing: 'ease-in-out' }"
                class="overflow-hidden"
              >
                <div class="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                  <CategoryItem v-for="(cat, idx) in FINANCIAL_DATA.incomeCategories" :key="idx" :item="cat" />
                  <div class="bg-emerald-50 p-4 flex justify-between items-center border-t border-emerald-100">
                    <span class="font-bold text-emerald-800">总计收入</span>
                    <span class="font-mono font-bold text-emerald-800 text-lg">
                      ¥{{ formatCurrency(FINANCIAL_DATA.totalIncome) }}
                    </span>
                  </div>
                </div>
              </Motion>
            </Presence>
          </section>

          <!-- Expense Details -->
          <section class="space-y-4">
            <button 
              @click="isExpenseExpanded = !isExpenseExpanded"
              class="flex items-center justify-between w-full group"
            >
              <div class="flex items-center gap-2">
                <div class="w-1.5 h-6 bg-amber-500 rounded-full" />
                <h2 class="text-xl font-bold text-gray-800">支出汇总</h2>
              </div>
              <div :class="[
                'p-1 rounded-lg transition-all duration-300',
                isExpenseExpanded ? 'bg-amber-100 text-amber-600 rotate-180' : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200'
              ]">
                <ChevronDown :size="20" />
              </div>
            </button>
            
            <Presence>
              <Motion 
                v-if="isExpenseExpanded"
                :initial="{ height: 0, opacity: 0 }"
                :animate="{ height: 'auto', opacity: 1 }"
                :exit="{ height: 0, opacity: 0 }"
                :transition="{ duration: 0.3, easing: 'ease-in-out' }"
                class="overflow-hidden"
              >
                <div class="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                  <CategoryItem v-for="(cat, idx) in FINANCIAL_DATA.expenseCategories" :key="idx" :item="cat" />
                  <div class="bg-amber-50 p-4 flex justify-between items-center border-t border-amber-100">
                    <span class="font-bold text-amber-800">总计支出</span>
                    <span class="font-mono font-bold text-amber-800 text-lg">
                      ¥{{ formatCurrency(FINANCIAL_DATA.totalExpense) }}
                    </span>
                  </div>
                </div>
              </Motion>
            </Presence>
          </section>
        </div>

        <!-- Explanations -->
        <div class="grid grid-cols-1 gap-6">
          <Motion 
            :whileHover="{ y: -5 }"
            class="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-3xl text-white shadow-xl shadow-blue-100"
          >
            <div class="flex items-center gap-3 mb-4">
              <div class="p-2 bg-white/20 rounded-lg backdrop-blur-md">
                <ShieldCheck :size="24" />
              </div>
              <h3 class="text-lg font-bold">资金说明</h3>
            </div>
            <p class="text-sm leading-relaxed text-blue-50 opacity-90">
              本小区严格执行信托制物业管理，所有收支实行专户管理、专款专用、逐笔公示，物业费与公共收益归全体业主所有，按照业主共同决定使用。
            </p>
          </Motion>

          <Motion 
            :whileHover="{ y: -5 }"
            class="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm"
          >
            <div class="flex items-center gap-3 mb-4">
              <div class="p-2 bg-gray-100 rounded-lg text-gray-600">
                <Info :size="24" />
              </div>
              <h3 class="text-lg font-bold text-gray-800">监督说明</h3>
            </div>
            <p class="text-sm leading-relaxed text-gray-600 mb-6">
              业主可向业委会申请查阅原始凭证，本公示数据真实可查，接受全体业主共同监督。
            </p>
            <div class="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <div class="flex items-center gap-3">
                <div class="p-2 bg-blue-100 text-blue-600 rounded-full">
                  <PhoneCall :size="18" />
                </div>
                <div>
                  <p class="text-xs text-gray-400 font-medium">监督电话</p>
                  <p class="text-lg font-bold text-gray-800">0471-666888</p>
                </div>
              </div>
              <Motion 
                :whileTap="{ scale: 0.95 }"
                class="bg-white text-gray-400 p-2 rounded-xl border border-gray-200 hover:text-blue-600 hover:border-blue-200 transition-colors"
              >
                <ChevronRight :size="20" />
              </Motion>
            </div>
          </Motion>
        </div>

        <!-- Footer info -->
        <footer class="pt-8 text-center space-y-2">
          <p class="text-xs text-gray-400 font-medium uppercase tracking-widest">
            Transparency • Trust • Community
          </p>
          <p class="text-[10px] text-gray-300">
            为您服务小钥匙
          </p>
        </footer>
      </main>
    </div>
  </div>
</template>
