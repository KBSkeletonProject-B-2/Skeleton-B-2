<!-- 총 지출 그래프를 보여주는 뷰 -->
<!-- 이번 달에 발생한 총 지출을 파이 그래프를 통해 항목별로 보여준다. -->

<template>
  <div class="chartCard">
    <span>총지출</span>
    <div class="chartBox">
      <canvas id="myChart"></canvas>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export default {
  name: 'Graph',
  setup() {
    let myChart;
    let filteredData = ref([]);
    const backgroundColors = ref([]);

    /**  
     * 데이터 추출
     * 
     * db-server에 있는 데이터를 가져온다.
     */ 
    async function fetchData() {
      try {
        const url = 'http://localhost:3000/transInfo';
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const datapoints = await response.json();
        console.log(datapoints);
        return datapoints;
      } catch (error) {
        console.error('Error fetching data:', error.message);
        return [];
      }
    }

    /**  
     * 데이터 필터링 & 데이터 값 누적
     * 
     * 주어진 데이터 중 지출이면서 현재 월에 해당하는 데이터만 필터링한다.
     * categoty 값을 key 값으로 사용하여 카테고리별로 누적된 금액을 저장한다.
     */ 
    function filterDataByThisMonth(data) {
      const currentMonth = (new Date()).getMonth() + 1;
      const currentYear = (new Date()).getFullYear();
      const groupedData = {};

      data.forEach(transaction => {
        const transactionMonth = (new Date(transaction.date)).getMonth() + 1;
        const transactionYear = (new Date(transaction.date)).getFullYear();

        if (transactionMonth === currentMonth && transactionYear === currentYear && transaction.inout === "지출") {
          if (!groupedData[transaction.category]) {
            groupedData[transaction.category] = 0;
          }
          groupedData[transaction.category] += parseInt(transaction.amount);
        }
      });

      return groupedData;
    }

    /**  
     * 색상 랜덤 추출
     * 
     * 색상을 랜덤으로 추출한다.
     */ 
    function generateRandomColor() {
      const r = Math.floor(Math.random() * 255);
      const g = Math.floor(Math.random() * 255);
      const b = Math.floor(Math.random() * 255);
      return `rgba(${r}, ${g}, ${b}, 0.8)`;
    }

    /**  
     * 차트 업데이트
     * 
     * transInfo 배열의 category 요소를 레이블로, amount의 누적값을 data로 하여 차트를 작성한다.
     */ 
    function updateChart(data) {
      const categories = Object.keys(data);
      const amounts = Object.values(data);
      backgroundColors.value = categories.map(() => generateRandomColor());

      myChart.config.data.labels = categories;
      myChart.config.data.datasets[0].data = amounts;
      myChart.config.data.datasets[0].backgroundColor = backgroundColors.value;
      myChart.update();
    }

    onMounted(async () => {
      const data = await fetchData();
      const thisMonthData = filterDataByThisMonth(data);

      myChart = new Chart(
        document.getElementById('myChart'),
        getConfig()
      );

      updateChart(thisMonthData);
    });

    function getConfig() {
      return {
        type: 'pie',
        data: {
          labels: [],
          datasets: [{
            label: '',
            data: [],
            backgroundColor: [],
            borderColor: 'rgba(0, 0, 0, 0)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
          }
        }
      };
    }

    return {
      fetchData,
      filterDataByThisMonth,
      updateChart
    };
  }
};
</script>

<style>
.chartCard {
  width: 1000px;
  height: 800px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chartBox {
  width: 700px;
  padding: 20px;
}
</style>
