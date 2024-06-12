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
            <label for="selectedCategory">카테고리</label>
            <select id="selectedCategory" v-model="selectedCategory">
              <option value="">선택</option>
              <option v-for="c in category" :key="c.id">{{ c.name }}</option>
            </select>
          </div>
          <div class="form-group">
            <label for="memo">내용</label>
            <input id="memo" type="text" v-model="memo" />
          </div>
          <button type="submit" class="search-button">조회</button>
        </form>
      </template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const emit = defineEmits(['search']);
const startDate = ref('');
const endDate = ref('');
const selectedCategory = ref('');
const memo = ref('');
const category = ref([]);

/**
 * 카테고리 목록 가져오기
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
    emit('search', startDate.value, endDate.value, selectedCategory.value, memo.value);
};
</script>
<style scoped>
.search-form {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 80%;
  margin: 0 auto;
  padding: 20px; /* Add padding for space */
  border-radius: 8px; /* Add rounded corners */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Add box-shadow */
  background-color: #fff; /* Set background color */
}


.form-group {
  margin: 0 10px;
}

label {
  margin-bottom: 5px;
  display: block;
}

input,
select {
  width: 150px;
}

.search-button {
  background-color: rgb(255, 204, 0);
  color: #fff;
  padding: 8px 20px;
  border: none;
  cursor: pointer;
  margin-top: 10px;
}

.search-button:hover {
  background-color: rgb(255, 188, 0);
}
</style>