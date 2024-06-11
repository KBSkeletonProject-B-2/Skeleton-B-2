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
        </tr>
      </thead>
      <tbody  v-for="(group, date) in groupedItems" :key="date">
        <h5>{{ date }}</h5>
        <tr @click="openPopup" v-for="trans in group" :key="trans.id">
          <td>{{ trans.category }}</td>
          <td>{{ trans.title }}</td>
          <td>{{ trans.amount }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
    
<script>
import { reactive, onMounted, computed, ref  } from 'vue'
import axios from 'axios'
export default {
  name: "TransList",
  props: {
    filterCondition: Object
  },
  setup(props, context) {
    let items = reactive([])
    onMounted(async () => {
      const result = await requestItems()
      Object.assign(items, result)
    })
    const requestItems = async () => {
      const response = await axios.get("http://localhost:3000/transInfo ")
      console.log(response)
      return response.data
    }
     /**
     * 조회 조건 검사
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
     * 필터링된 거래내역 불러오기
     */
     const filteredItems = computed(() => {
      return items.filter(trans => matchCondition(trans, props.filterCondition));
    })

    /**
     * 날짜별로 거래내역 그룹화
     */
     const groupedItems = computed(() => {
      const groups = {};
      filteredItems.value.forEach(trans => {
        const date = new Date(trans.date).toLocaleDateString();
        if (!groups[date]) {
          groups[date] = [];
        }
        groups[date].push(trans);
      });
      return groups;
    });
     
    /**
    * 팝업 오픈
    * 
    * 팝업창 오픈을 위해 부모 컴포넌트인 Transactions.vue를 호출하는 메소드이다.
    */
    const openPopup = () => {
        context.emit('openPopup')
    }
    return { requestItems, items, openPopup, groupedItems, filteredItems  }
  }
}
</script>
<style lang="">

</style>