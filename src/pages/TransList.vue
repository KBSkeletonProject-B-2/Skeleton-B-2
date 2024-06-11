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
      <tbody>
        <tr v-for="trans in items" :key="trans.id">
          <td>{{ trans.category }}</td>
          <td>{{ trans.title }}</td>
          <td>{{ trans.amount }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
    
<script>
import { reactive, onMounted } from 'vue'
import axios from 'axios'
export default {
  name: "TransList",
  setup() {
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
    return { requestItems, items }
  }
}
</script>
<style lang="">

</style>