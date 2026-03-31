<script setup lang="ts">
import { ref, computed } from 'vue';
import { Motion, Presence } from '@motionone/vue';
import { ChevronRight, ChevronDown } from 'lucide-vue-next';
import type { FinancialCategory } from '../types';

const props = defineProps<{
  item: FinancialCategory;
  depth?: number;
}>();

const isExpanded = ref(false);
const currentDepth = computed(() => props.depth || 0);

const formatCurrency = (amount: number) => {
  return amount.toLocaleString('zh-CN', { minimumFractionDigits: 2 });
};

const toggleExpand = () => {
  if (props.item.children && props.item.children.length > 0) {
    isExpanded.value = !isExpanded.value;
  }
};
</script>

<template>
  <div class="border-b border-gray-100 last:border-0">
    <button 
      @click="toggleExpand"
      :class="[
        'w-full flex items-center justify-between p-4 transition-all duration-300 group',
        isExpanded ? 'bg-gray-50' : 'hover:bg-gray-50/50',
        depth && depth > 0 ? 'pl-' + (depth * 4 + 4) : ''
      ]"
      :style="{ paddingLeft: depth ? `${depth * 1.5 + 1}rem` : '1rem' }"
    >
      <div class="flex items-center gap-3">
        <div v-if="item.children && item.children.length > 0" 
          :class="[
            'p-1 rounded-md transition-all duration-300',
            isExpanded ? 'bg-blue-100 text-blue-600 rotate-180' : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200'
          ]"
        >
          <ChevronDown :size="14" />
        </div>
        <div v-else class="w-6 h-6 flex items-center justify-center">
          <div class="w-1.5 h-1.5 rounded-full bg-gray-300" />
        </div>
        <span :class="[
          'text-sm font-semibold transition-colors',
          isExpanded ? 'text-blue-600' : 'text-gray-700'
        ]">
          {{ item.name }}
        </span>
      </div>
      <div class="flex items-center gap-3">
        <span :class="[
          'font-mono font-bold text-sm',
          isExpanded ? 'text-blue-700' : 'text-gray-900'
        ]">
          ¥{{ formatCurrency(item.amount) }}
        </span>
        <ChevronRight v-if="!item.children || item.children.length === 0" :size="14" class="text-gray-300" />
      </div>
    </button>

    <Presence>
      <Motion 
        v-if="isExpanded && item.children && item.children.length > 0"
        :initial="{ height: 0, opacity: 0 }"
        :animate="{ height: 'auto', opacity: 1 }"
        :exit="{ height: 0, opacity: 0 }"
        :transition="{ duration: 0.3, easing: 'ease-in-out' }"
        class="overflow-hidden bg-white/50"
      >
        <CategoryItem 
          v-for="(child, idx) in item.children" 
          :key="idx" 
          :item="child" 
          :depth="currentDepth + 1" 
        />
      </Motion>
    </Presence>
  </div>
</template>
