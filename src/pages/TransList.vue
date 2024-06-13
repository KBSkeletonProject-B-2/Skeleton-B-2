<!-- 거래내역 출력 뷰 -->
<!-- 거래내역 검색으로 받은 데이터를 통해 
    json서버에서 조건에 맞는 데이터를 날짜별로 출력하는 뷰이다.

    검색 조건이 없을 시 모든 데이터를 출력한다. -->
<template>
  <div>
    <table class="table table-hover">
      <thead>
        <tr>
          <th class="col-1">분류</th>
          <th class="col-1">카테고리</th>
          <th class="col-1">자산</th>
          <th class="col-1">금액</th>
          <th class="col-action"></th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(group, date) in sortedGroupedItems">
          <tr v-if="group.length > 0">
            <th class="date-cell" colspan="5">{{ date }}</th>
          </tr>
          <tr class="trans-cell" v-for="trans in group" :key="trans.id" @click.native="changeIsOpen(true, trans)">
            <td class="cell">{{ trans.category }}</td>
            <td class="cell">{{ trans.detail }}</td>
            <td class="cell">{{ trans.account }}</td>
            <td class="cell" :class="{ 'text-out': trans.category === '지출', 'text-in': trans.category === '수입' }">
              {{ trans.amount }}
            </td>
            <td class="cell"><button v-show="true" @click.stop="deleteTransaction(trans.id)">삭제</button>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
import { reactive, onMounted, computed, ref, onUpdated } from 'vue'
import axios from 'axios'
export default {
  name: "TransList",
  props: {
    filterCondition: Object,
    transInfo: Object,
    isOpen: Boolean
  },
  setup(props, context) {
    let items = reactive([])
    let isOpen = ref(false)
    onMounted(async () => {
      const result = await requestItems()
      Object.assign(items, result)
    })
    const requestItems = async () => {
      const response = await axios.get("http://localhost:3000/transInfo")
      return response.data
    }

    /**
     * onMounted
     * 
     * 컴포넌트가 마운트된 후 items에 변경된 transInfo 정보를 수정한다.
     */
    onUpdated(() => {
      if (props.transInfo.id) {
        const index = items.findIndex(element => element.id === props.transInfo.id)
        items[index].date = props.transInfo.date
        items[index].category = props.transInfo.category
        items[index].detail = props.transInfo.detail
        items[index].account = props.transInfo.account
        items[index].amount = props.transInfo.amount
        items[index].memo = props.transInfo.memo
      }
    })

    /**
     * 조회 조건 검사
     * 
     * 상위 컴포넌트로부터 전달받은 조건 계산, 모두 참인 조건만 뽑아냄
     */
    const matchCondition = (trans, condition) => {
      const { startDate, endDate, category, detail, memo } = condition
      const matchesDate = (!startDate || new Date(trans.date) >= new Date(startDate)) &&
        (!endDate || new Date(trans.date) <= new Date(endDate));
      const matchesCategory = !category || trans.category === category;
      const matchesDetail = !detail || trans.detail === detail;
      const matchesMemo = !memo || trans.memo.includes(memo);

      return matchesDate && matchesCategory && matchesDetail && matchesMemo;
    }

    /**
     * 날짜별로 거래내역 그룹화
     * 
     * 조건을 통과한 거래 내역들에 대해 각각의 날짜를 조회하여 날짜를 index로 한 배열에 추가
     * 날짜의 내림차순으로 정렬
     */
    const sortedGroupedItems = computed(() => {
      const groups = {}
      items.filter(trans => matchCondition(trans, props.filterCondition))
        .forEach(trans => {
          const date = new Date(trans.date).toLocaleDateString()
          if (!groups[date]) {
            groups[date] = []
          }
          groups[date].push(trans)
        });

      const sortedDates = Object.keys(groups).sort((a, b) => new Date(b) - new Date(a))
      const sortedGroups = {}
      sortedDates.forEach(date => {
        sortedGroups[date] = groups[date]
      });
      return sortedGroups
    });

    /**
     * 거래내역 삭제
     * 
     * 삭제 버튼 클릭시 confirm을 통해 확인 후 삭제
     */
    const deleteTransaction = async (id) => {
      try {
        const del = confirm("삭제하시겠습니까?")
        if (del) {
          await axios.delete(`http://localhost:3000/transInfo/${id}`);
          const index = items.findIndex(trans => trans.id === id)
          if (index !== -1) {
            items.splice(index, 1)
          }
          alert('삭제되었습니다.')
        }

      } catch (error) {
        console.error("Error deleting transaction:", error);
      }
    };

    /**
     * isOpen 변경
     * 
     * isOpen에 파라미터 값인 open으로 변경하고 trans 정보를 전달하는 메소드이다.
     */
    const changeIsOpen = (open, trans) => {
      isOpen.value = open
      console.log("TransList.vue changeIsOpen : ", isOpen.value)
      context.emit('changeIsOpen', isOpen.value, trans)
    }
    return { deleteTransaction, isOpen, changeIsOpen, sortedGroupedItems }
  }
}
</script>

<style lang="scss" scoped>
th,
td {
  padding: 8px;
  border: 1px solid rgb(96, 88, 76, 0.8);
  border-left: none;
  border-right: none;
  text-align: center;
  padding: 5px;
  font-weight: 600;
}

thead th {
  padding: 12px;
  border: 3px solid rgb(96, 88, 76, 0.8);
  border-left: none;
  border-right: none;
}

button {
  visibility: hidden;
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 5px 10px;
  margin-right: 10px;
  cursor: pointer;
}

tr:hover button {
  visibility: visible;
  float: right;
}

button:hover {
  background-color: #c82333;
}

.text-out {
  color: red;
}

.text-in {
  color: blue;
}

.col-1 {
  width: 22%;
  background-color: rgb(96, 88, 76, 0.8);
  color: white;
}

.col-action {
  background-color: rgb(96, 88, 76, 0.8)
}

.table {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-collapse: collapse;
}

.date-cell {
  text-align: left;
  background-color: rgb(255, 204, 0, 0.2);
}

.cell {
  background-color: rgb(255, 204, 0, 0.1);
}
</style>