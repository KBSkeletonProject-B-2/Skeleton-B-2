<!-- 거래 내역 전체 화면 뷰 -->
<!-- 거래 내역 검색 및 검색 결과를 출력하는 뷰이다.-->
<template>
    <div class="center-content">
        <div class="container">
            <FilterBar @search="searchTransByFilter" />
            <br>
            <TransList @changeIsOpen="changeIsOpen" :filterCondition="filterCondition" :transInfo="transInfo" :isOpen="isOpen" :isCancel="isCancel"/>
            <TransInfoCreate @changeIsOpen="changeIsOpen" v-show="isOpen" :transInfo="transInfo" :isOpen="isOpen" />
        </div>
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
            detail: '',
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
        const isCancel = ref(false)

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
        const changeIsOpen = (open, trans, cancel) => {
            isOpen.value = open
            isCancel.value = cancel
            Object.assign(transInfo, trans)
            console.log("Transactions.vue changeIsOpen : ", trans)
            console.log("Transactions.vue changeIsOpen : ", isOpen.value)
            console.log("Transactions.vue changeIsOpen : ", isCancel.value)
        }
        return { filterCondition, isOpen, searchTransByFilter, changeIsOpen, transInfo, isCancel }
    }
}
</script>

<style lang="scss" scoped>
.center-content {
    width: 100%;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgb(255, 204, 0, 0.1);
}
</style>