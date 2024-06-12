<!-- 홈 화면 뷰 -->
<!-- 월별 수입 및 지출을 요약하는 뷰이다.-->
<!-- 최근 거래 내역을 출력하는 뷰이다.-->
<template>
    <div class="center-content">
        <div class="list1">
            <table class="table_1">
                <thead>
                    <tr>
                        <td>총수입</td>
                        <td>총지출</td>
                        <td>순수익</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{{ totalIncome }}</td>
                        <td>{{ totalExpenses }}</td>
                        <td>{{ Profit }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div id="incomechart">
            <IncomeChart />
        </div>
        <div class="list2">
            <span>최근 거래 목록</span>
            <table class="table-hover">
                <thead>
                    <tr class="recent_transaction_list_thead">
                        <td>날짜</td>
                        <td>내용</td>
                        <td>분류</td>
                        <td>자산</td>
                        <td>금액</td>
                        <!-- <td>수입/지출</td> -->
                    </tr>
                </thead>
                <tbody>
                    <!-- 최근 거래 목록을 10개까지만 보여줌 -->
                    <tr class="recent_transaction_list" v-for="wallet in walletList.slice(0, 10)" :key="wallet.id">
                        <td>{{ wallet.date }}</td>
                        <td>{{ wallet.memo }}</td>
                        <td>{{ wallet.category }}</td>
                        <td>{{ wallet.asset }}</td>
                        <td :style="{ color: wallet.inout === '지출' ? 'red' : (wallet.inout === '수입' ? 'blue' : 'black') }">{{ wallet.amount }}</td>
                        <!-- <td :style="{ color: wallet.inout === '지출' ? 'red' : (wallet.inout === '수입' ? 'blue' : 'black') }">{{ wallet.inout }}</td> -->
                    </tr>
                    <tr>
                        <td colspan="5">...</td>
                    </tr>
                </tbody> 
            </table>
            <router-link to="/">
                <span>내역 전체 보기</span>
            </router-link>
        </div>
        <router-link to="/">
            <button type="submit" class="submitBtn">+</button>
        </router-link>
    </div>
</template>

<script>
import axios from 'axios';
import { ref, onMounted, computed } from 'vue';
import IncomeChart from './IncomeChart.vue';

export default {
    components: {
        IncomeChart,
    },

    setup() {
        const walletList = ref([]);  
        const currentMonth = (new Date()).getMonth();
        const currentYear = (new Date()).getFullYear();
        
        /* 
        총 수입 계산 
        JSON 파일에 저장된 날짜와 현재 날짜를 비교하여 해당 년도 해당 월의 총 수입만 계산
        */
        const totalIncome = computed(() => {
            return walletList.value
            .filter(transaction => {
                const transactionDate = new Date(transaction.date);
                return transaction.inout === "수입" && transactionDate.getMonth() === currentMonth && transactionDate.getFullYear() === currentYear;
            })
            .reduce((acc, transaction) => acc + parseInt(transaction.amount), 0)
            .toLocaleString();
        });
        console.log(walletList.value);

        /*
        총 지출 계산 
        JSON 파일에 저장된 날짜와 현재 날짜를 비교하여 해당 년도 해당 월의 총 수입만 계산
        */
        const totalExpenses = computed(() => {
            return walletList.value
            .filter(transaction => {
                const transactionDate = new Date(transaction.date);
                return transaction.inout === "지출" && transactionDate.getMonth() === currentMonth && transactionDate.getFullYear() === currentYear;
            })
            .reduce((acc, transaction) => acc + parseInt(transaction.amount), 0)
            .toLocaleString();
        });

        /* 순수익 계산 */
        const Profit = computed(() => {
            const income = parseInt(totalIncome.value);
            const expenses = parseInt(totalExpenses.value);
            return (income - expenses).toLocaleString();
        });

        const requestAPI = async () => {
            try {
                const url = 'http://localhost:3000/transInfo';
                const response = await axios.get(url) 
                walletList.value = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));  /* 날짜를 내림차순으로 정렬하여 최신 값부터 보여줌 */ 
            } catch (error) {
                console.log(error);
            }
        };

        onMounted(requestAPI);

        return {
            walletList,
            totalIncome,
            totalExpenses,
            Profit,
        };
    }
}

</script>

<style  scoped>
.center-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-top: 50px;
}

table {
    width: 1000px;
    border: 3px solid #ddd; 
    border-left:none;
    border-right:none;
}

th, td {
    padding: 8px;
    border: 1px solid #ddd; 
    border-left:none;
    border-right:none;
    width: 20%;
}

.recent_transaction_list {
    padding: 8px;
    border: 1px solid #ddd;
    border-left:none;
    border-right:none;
    width: 20%;
}

.table-hover {
    margin: 20px 30px 30px 30px
}

.table_1 {
    margin: 20px 30px 30px 30px
}

.list1 {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.list2 {
    /* border: 1px solid black; */
    margin-top: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.table-hover tbody tr:hover {
  background-color: #fffde7; /* 원하는 색상으로 변경 */
}

.submitBtn {
    width: 1000px;
    background-color: #ffca1a;
    border: #ffca1a;
    border-radius: 5px;
    margin-top: 20px
}
</style>
