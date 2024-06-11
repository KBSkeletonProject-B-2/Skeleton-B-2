<!-- 거래내역 검색 뷰 -->
<!-- 거래내역 조회 화면의 상단에 위치,
    시작일, 종료일, 카테고리, 내용을 전달하는 조회하는 뷰이다. -->
<template>
    <form @submit.prevent="send">
        <label>
            시작일<br/>
            <input type="date" v-model="startDate" />
        </label>
        <label>
            종료일<br/>
            <input type="date" v-model="endDate" />
        </label>
        <label>
            카테고리<br/>
            <select v-model="selectedCategory">
                <option value="">선택</option>
                <option v-for="c in category">{{ c.eng }}</option>
            </select>
        </label>
        <label>
            내용<br/>
            <input type="text" v-model="title" />
        </label>
        <button type="submit">조회</button>
    </form>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const emit = defineEmits(['search']);
const startDate = ref('');
const endDate = ref('');
const selectedCategory = ref('');
const title = ref('');
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
    emit('search', startDate.value, endDate.value, selectedCategory.value, title.value);
};
</script>

<style scoped></style>