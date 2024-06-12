<!-- 거래내역 출력 뷰 -->
<!-- 거래내역 검색으로 받은 데이터를 통해 
    json서버에서 조건에 맞는 데이터를 날짜별로 출력하는 뷰이다.

    검색 조건이 없을 시 모든 데이터를 출력한다. -->
<template>
  <div>
    <table class="table table-hover">
      <thead class="table-dark">
        <tr>
          <td>카테고리</td>
          <td>내용</td>
          <td>금액</td>
          <td></td>
        </tr>
      </thead>
      <tbody>
        <template v-for="(group, date) in sortedGroupedItems">
          <tr v-if="group.length > 0">
            <th colspan="4">{{ date }}</th>
          </tr>
          <tr v-for="trans in group" :key="trans.id" @click.native="changeIsOpen(true)">
            <td>{{ trans.category }}</td>
            <td>{{ trans.title }}</td>
            <td>{{ trans.amount }}</td>
            <td><button v-show="true" @click.stop="deleteTransaction(trans.id)">삭제</button></td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
import { reactive, onMounted, computed, ref } from 'vue'
import axios from 'axios'
export default {
  name: "TransList",
  props: {
    filterCondition: Object
  },
  setup(props, context) {
    let items = reactive([])
    let isOpen = ref(false)
    onMounted(async () => {
      const result = await requestItems()
      Object.assign(items, result)
    })
    const requestItems = async () => {
      const response = await axios.get("http://localhost:3000/transInfo ")
      // console.log(response)
      return response.data
    }
    /**
     * 조회 조건 검사
     * 
     * 상위 컴포넌트로부터 전달받은 조건 계산
     */
    const matchCondition = (trans, condition) => {
      const { startDate, endDate, category, title } = condition
      const matchesDate = (!startDate || new Date(trans.date) >= new Date(startDate)) &&
        (!endDate || new Date(trans.date) <= new Date(endDate));
      const matchesCategory = !category || trans.category === category;
      const matchesTitle = !title || trans.title.includes(title);

      return matchesDate && matchesCategory && matchesTitle;
    }
    
    /**
     * 날짜별로 거래내역 그룹화
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
     * 삭제 버튼 클릭시 
     */
     const deleteTransaction = async (id) => {
      try {
        console.log(id);
        await axios.delete(`http://localhost:3000/transInfo/${id}`);
        const index = items.findIndex(trans => trans.id === id)
        if (index !== -1) {
          items.splice(index, 1)
        }
        alert('삭제되었습니다.')
      } catch (error) {
        console.error("Error deleting transaction:", error);
      }
    };

    /**
    * isOpen 변경
    * 
    * isOpen에 파라미터 값인 open으로 변경하는 메소드이다.
    */
    const changeIsOpen = (open) => {
      isOpen.value = open
      console.log("TransList.vue changeIsOpen : " + isOpen.value)
      context.emit('changeIsOpen', isOpen.value)
    }
    return { deleteTransaction,isOpen, changeIsOpen, sortedGroupedItems }
  }
}
</script>
<style lang="">

</style>