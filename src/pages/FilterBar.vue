<!-- 거래내역 검색 뷰 -->
<!-- 거래내역 조회 화면의 상단에 위치,
    시작일, 종료일, 카테고리, 내용을 전달하는 조회하는 뷰이다. -->
<template>
    <form @submit.prevent="send">
      <label>
        시작일<br />
        <input type="date" v-model="startDate" />
      </label>
      <label>
        종료일<br />
        <input type="date" v-model="endDate" />
      </label>
      <label>
        카테고리<br />
        <select v-model="category">
          <option value="">선택</option>
          <option value="category1">카테고리 1</option>
          <option value="category2">카테고리 2</option>

        </select>
      </label>
      <label>
        내용<br />
        <input type="text" v-model="word" />
      </label>
      <button type="submit">조회</button>
    </form>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const emit = defineEmits(['search']);
  const startDate = ref('');
  const endDate = ref('');
  const category = ref('');
  const word = ref('');
  
  const send = () => {
    emit('search', startDate.value, endDate.value, category.value, word.value);
  };
  </script>
  
  <style scoped>

  </style>