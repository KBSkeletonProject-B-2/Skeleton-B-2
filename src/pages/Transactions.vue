<!-- 거래 내역 전체 화면 뷰 -->
<!-- 거래 내역 검색 및 검색 결과를 출력하는 뷰이다.-->
<template>
    <div>
        <FilterBar @search="searchTransByFilter" />
        <hr>
        <TransList />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import FilterBar from './FilterBar.vue';
import TransList from './TransList.vue';

const data = ref({
    startDate: '',
    endDate: '',
    category: '',
    title: '',
});

/**
 * 거래내역 조회
 * 
 * 날짜 및 카테고리 조건으로 거래 목록을 조회한다.
 * 조건에 맞는 거래 목록을 json서버로부터 가져오고, TransList 컴포넌트에 전달해야 함
 */
const searchTransByFilter = (startDate, endDate, category, title) => {
    data.value = { startDate, endDate, category, title };
    console.log(data.value)

};
</script>

<style scoped>

</style>