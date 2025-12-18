<script setup>
import { onMounted, ref } from 'vue';

const props = defineProps({
  widget: Object, // это self из amoCRM
});

const leadData = ref(null);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    document.querySelector('.widget-teratrade-statistics-right-panel').click(); // Сделать панель виджета открытой

    const leadId = props.widget?.data?.current_card.id;

    if (!leadId) {
      error.value = 'Не удалось определить ID сделки';
      loading.value = false;
      return;
    }

    const response = await fetch('https://tools.tera-trade.ru/teratrade/get-statistics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lead_id: leadId }),
    });

    if (!response.ok) throw new Error('Ошибка запроса');

    leadData.value = await response.json();
  } catch (error) {
    error.value = error.message;
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div v-if="loading">
    <p class="widget-teratrade-statistics-text">Загрузка...</p>
  </div>
  <div v-else-if="error">
    <p class="widget-teratrade-statistics-text">Ошибка: {{ error }}</p>
  </div>
  <div v-else-if="leadData.success">
    <ul class="widget-teratrade-statistics-items" v-if="Array.isArray(leadData.data)">
      <li class="widget-teratrade-statistics-item" v-for="(item, index) in leadData.data" :key="index">
        {{ item.key }}: <span class="widget-teratrade-statistics-text-value">{{ item.value }}</span>
      </li>
    </ul>
  </div>
  <div v-else>
    <p class="widget-teratrade-statistics-text">{{ leadData.text }}</p>
  </div>
</template>

<style>
.widget-teratrade-statistics-items {
  list-style-type: disc;
  padding-left: 20px;
}

.widget-teratrade-statistics-item {
  color: #363b44;
}

.widget-teratrade-statistics-text {
  color: #363b44;
}

.widget-teratrade-statistics-text-value {
  font-weight: 700;
}
</style>
