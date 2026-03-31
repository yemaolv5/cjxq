<script setup lang="ts">
import { computed } from 'vue';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ArrowUpRight, ArrowDownRight } from 'lucide-vue';

const props = defineProps<{
  title: string;
  amount: number;
  icon: any;
  type: 'income' | 'expense' | 'balance';
}>();

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const isNegative = computed(() => props.amount < 0);

const colorClass = computed(() => {
  if (props.type === 'income') return 'text-blue-600 bg-blue-50';
  if (props.type === 'expense') return 'text-amber-600 bg-amber-50';
  if (props.type === 'balance') return isNegative.value ? 'text-red-600 bg-red-50' : 'text-emerald-600 bg-emerald-50';
  return 'text-gray-600 bg-gray-50';
});

const borderClass = computed(() => {
  if (props.type === 'income') return 'border-blue-100';
  if (props.type === 'expense') return 'border-amber-100';
  if (props.type === 'balance') return isNegative.value ? 'border-red-100' : 'border-emerald-100';
  return 'border-gray-100';
});
</script>

<template>
  <div 
    :class="cn(
      'p-3 rounded-xl border bg-white shadow-sm flex flex-col justify-between h-full transition-all duration-500',
      borderClass
    )"
  >
    <div class="flex items-center justify-between mb-2">
      <span class="text-[10px] font-medium text-gray-500 truncate mr-1">{{ title }}</span>
      <div :class="cn('p-1.5 rounded-lg shrink-0', colorClass)">
        <component :is="icon" :size="14" />
      </div>
    </div>
    <div>
      <div class="flex items-baseline gap-0.5 flex-wrap">
        <span class="text-[10px] font-semibold text-gray-400">¥</span>
        <span :class="cn(
          'text-sm font-bold tracking-tight break-all',
          type === 'balance' ? (isNegative ? 'text-red-600' : 'text-emerald-600') : 'text-gray-900'
        )">
          {{ amount.toLocaleString('zh-CN', { minimumFractionDigits: 0, maximumFractionDigits: 2 }) }}
        </span>
      </div>
      <div class="mt-1 flex items-center gap-1 text-[8px] text-gray-400">
        <ArrowUpRight v-if="type === 'income'" :size="10" class="text-blue-500" />
        <ArrowDownRight v-if="type === 'expense'" :size="10" class="text-amber-500" />
        <span class="truncate">本期累计</span>
      </div>
    </div>
  </div>
</template>
