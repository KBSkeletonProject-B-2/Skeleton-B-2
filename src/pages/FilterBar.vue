<!-- 거래내역 검색 뷰 -->
<!-- 거래내역 조회 화면의 상단에 위치,
    시작일, 종료일, 카테고리, 내용을 전달하는 조회하는 뷰이다. -->
<template>
  <form @submit.prevent="send" class="search-form">
    <div class="form-group">
      <label for="startDate">시작일</label>
      <input id="startDate" type="date" v-model="startDate" />
    </div>
    <div class="form-group">
      <label for="endDate">종료일</label>
      <input id="endDate" type="date" v-model="endDate" />
    </div>
    <div class="form-group">
      <label for="selectedCategory">분류</label>
      <select id="selectedCategory" v-model="selectedCategoryName" @change="updateDetails">
        <option value="">전체</option>
        <option v-for="c in category" :key="c.id" :value="c.name">{{ c.name }}</option>
      </select>
    </div>
    <div class="form-group">
      <label for="selectedDetail">카테고리</label>
      <select id="selectedDetail" v-model="selectedDetailName">
        <option value="">전체</option>
        <option v-for="sub in detail" :key="sub.id" :value="sub.name">{{ sub.name }}</option>
      </select>
    </div>
    <div class="form-group">
      <label for="memo">내용</label>
      <input id="memo" type="text" v-model="memo" />
    </div>
    <div class="form-actions">
      <button type="submit" class="search-button">조회</button>
      <button type="reset" class="reset-button" @click="resetFilters">초기화</button>
    </div>
  </form>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const emit = defineEmits(['search']);
const startDate = ref('');
const endDate = ref('');
const selectedCategoryName = ref('');
const selectedDetailName = ref('');
const memo = ref('');
const category = ref([]);
const detail = ref([]);

/**
 * 상위 카테고리 목록 가져오기
 * 
 * json 서버로부터 카테고리 목록을 가져온다.
 */
onMounted(async () => {
  try {
    const response = await axios.get("http://localhost:3000/category");
    category.value = response.data;
  } catch (error) {
    console.error('Failed to fetch categories:', error);
  }
});

/**
 * 조회 이벤트 전송
 * 
 * 상위 컴포넌트인 Transactions.vue로 조회에 쓰일 조건 값 전달
 */
const send = () => {
  emit('search', startDate.value, endDate.value, selectedCategoryName.value, selectedDetailName.value, memo.value);
};

/**
 * 선택된 분류에 따라 하위 카테고리 업데이트
 * 
 * 선택된 상위 카테고리 목록에 따라 하위 카테고리(detail) 목록을 업데이트한다
 */
const updateDetails = () => {
  const selected = category.value.find(c => c.name === selectedCategoryName.value);
  detail.value = selected ? selected.detail : [];
};

/**
 * 필터 초기화
 * 
 * 모든 필터 값을 기본값으로 되돌린다.
 */
const resetFilters = () => {
  startDate.value = '';
  endDate.value = '';
  selectedCategoryName.value = '';
  selectedDetailName.value = '';
  memo.value = '';
  updateDetails(); // 하위 카테고리 목록 업데이트
};
</script>

<style lang="scss" scoped>
.search-form {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 90%;
  margin: 10px auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  background-color: rgb(255, 204, 0, 0.4);
}

.form-group {
  display: flex;
  flex-direction: column;
  margin: 10px 15px;
}

label {
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
}

input,
select {
  width: 180px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
}

input:focus,
select:focus {
  outline: none;
  border-color: rgb(255, 204, 0);
  box-shadow: 0 0 5px rgba(250, 191, 12, 0.5);
}

.form-actions {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

button {
  background-color: rgb(255, 204, 0);
  color: #000000;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #e0a800;
}

.reset-button {
  margin-left: 10px;
}
</style>