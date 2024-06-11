<!-- 거래 내역 전체 화면 뷰 -->
<!-- 거래 내역 검색 및 검색 결과를 출력하는 뷰이다.-->
<template>
    <div>
        <FilterBar @search="searchTransByFilter" />
        <hr>
        <TransList @openPopup="changeIsOpen" />
        <TransInfoCreate @sendIsOpen="setIsOpen" v-bind:isOpen="isOpen" v-show="isOpen" />
    </div>
</template>

<script>
import { ref } from 'vue';
import FilterBar from './FilterBar.vue';
import TransList from './TransList.vue';
import TransInfoCreate from './TransInfoCreate.vue';

export default {
    components: { FilterBar, TransList, TransInfoCreate },
    setup() {
        const data = ref({
            startDate: '',
            endDate: '',
            category: '',
            title: '',
        });
        const isOpen = ref(false)

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

        /**
         * isOpen set 메소드
         * 
         * 자식 컴포넌트인 TransInfoCreate.vue에서 가져온 open 값을 세팅하는 메소드이다.
         * @param open 
         */
        const setIsOpen = (open) => {
            isOpen.value = open
            console.log("Transactions.vue setIsOpen : " + isOpen.value)
        }

        /**
        * isOpen 변경
        * 
        * isOpen의 반대값을 저장하는 메소드이다.
        */
        const changeIsOpen = () => {
            isOpen.value = !isOpen.value
            console.log("Transactions.vue changeIsOpen : " + isOpen.value)
        }
        return { data, isOpen, searchTransByFilter, setIsOpen, changeIsOpen }
    }
}
</script>

<style scoped></style>