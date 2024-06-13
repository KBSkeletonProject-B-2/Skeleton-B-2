<!-- 거래 내역 전체 화면 뷰 -->
<!-- 거래 내역 검색 및 검색 결과를 출력하는 뷰이다.-->
<template>
    <div>
        <FilterBar @search="searchTransByFilter" />
        <hr>
        <TransList @changeIsOpen="changeIsOpen" :filterCondition="filterCondition" />
        <TransInfoCreate @changeIsOpen="changeIsOpen" v-show="isOpen" :transInfo="transInfo" />
    </div>
</template>

<script>
import { ref, reactive } from 'vue';
import FilterBar from './FilterBar.vue';
import TransList from './TransList.vue';
import TransInfoCreate from './TransInfoCreate.vue';

export default {
    components: { FilterBar, TransList, TransInfoCreate },
    setup() {
        const filterCondition = ref({
            startDate: '',
            endDate: '',
            category: '',
            detail:'',
            memo: '',
        });
        let transInfo = reactive({
            id: "",
            date: "",
            category: "",
            detail: "",
            account: "",
            amount: "",
            memo: ""
        })
        const isOpen = ref(false)

        /**
        * 거래내역 조회
        * 
        * 날짜 및 카테고리 조건으로 거래 목록을 조회한다.
        * 조건에 맞는 거래 목록을 json서버로부터 가져오고, TransList 컴포넌트에 전달해야 함
        */
        const searchTransByFilter = (startDate, endDate, category, detail, memo) => {
            filterCondition.value = { startDate, endDate, category, detail, memo };
            console.log(filterCondition.value)
        };

        /**
         * isOpen 변경
         * 
         * isOpen에 파라미터 값인 open으로 변경하고 transInfo 정보를 업데이트하는 메소드이다.
         */
        const changeIsOpen = (open, trans) => {
            isOpen.value = open
            Object.assign(transInfo, trans)
            console.log("Transactions.vue changeIsOpen : " + isOpen.value)
        }
        return { filterCondition, isOpen, searchTransByFilter, changeIsOpen, transInfo }
    }
}
</script>

<style scoped></style>