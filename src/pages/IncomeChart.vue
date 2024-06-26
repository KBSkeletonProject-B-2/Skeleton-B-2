<!-- 총 수입 그래프를 보여주는 뷰 -->
<!-- 이번 달에 발생한 총 수입을 파이 그래프를 통해 항목별로 보여준다. -->

<template>
  <div class="chartCard">
    <div id="title">
      <span>{{currentMonth}}</span>
      <span>월&nbsp;</span>
      <span>수입</span>
    </div>
    <div class="chartBox">
      <div v-if="!hasData" id="noDataMessage">데이터가 없습니다.</div>
      <canvas id="incomeChart"></canvas>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, watch } from 'vue';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(...registerables, ChartDataLabels);

export default {
  name: 'IncomeChart',
  props: {
    currentYear: {
      type: Number
    },
    currentMonth: {
      type: Number
    },
  },
  setup(props) {

    let incomeChart;
    const backgroundColors = ref([]);
    const hasData = ref(true);

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
     * props.currentYead & props.currentMonth 변화 감지하여 데이터 수정한다.
     */
    watch([() => props.currentYear, () => props.currentMonth], async () => {
      fetchDataAndFilter();
    });

    async function fetchDataAndFilter() {
      const data = await fetchData();
      const thisMonthData = filterDataByThisMonth(data);
      updateChart(thisMonthData);
    }

    /**  
     * 데이터 필터링 & 데이터 값 누적
     * 
     * 주어진 데이터 중 지출이면서 현재 월에 해당하는 데이터만 필터링한다.
     * categoty 값을 key 값으로 사용하여 카테고리별로 누적된 금액을 저장한다.
     */
    function filterDataByThisMonth(data) {
      const groupedData = {};

      data.forEach(transaction => {
        const transactionMonth = (new Date(transaction.date)).getMonth() + 1;
        const transactionYear = (new Date(transaction.date)).getFullYear();

        if (transactionMonth === props.currentMonth && transactionYear === props.currentYear && transaction.category === "수입") {
          if (!groupedData[transaction.detail]) {
            groupedData[transaction.detail] = 0;
          }
          groupedData[transaction.detail] += parseInt(transaction.amount);
        }
      });

      hasData.value = Object.keys(groupedData).length > 0;
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
     * transInfo 배열의 detail 요소를 레이블로, amount의 누적값을 data로 하여 차트를 작성한다.
     */
    function updateChart(data) {
      if (!incomeChart) return; // incomeChart가 정의되어 있지 않으면 함수를 종료합니다.

      const categories = Object.keys(data);
      const amounts = Object.values(data);
      backgroundColors.value = categories.map(() => generateRandomColor());

      incomeChart.config.data.labels = categories;
      incomeChart.config.data.datasets[0].data = amounts;
      incomeChart.config.data.datasets[0].backgroundColor = backgroundColors.value;
      incomeChart.update();
    }

    onMounted(async () => {
      const data = await fetchData();
      const thisMonthData = filterDataByThisMonth(data);

      incomeChart = new Chart(
        document.getElementById('incomeChart'),
        getConfig()
      );

      updateChart(thisMonthData);
    });

    function getConfig() {
      return {
        type: 'doughnut',
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
          plugins: {
            datalabels: {
              color: '#fff',
              display: true,
              formatter: (value, context) => {
                // const label = context.chart.data.labels[context.dataIndex];
                // const amount = value.toLocaleString();
                const totalAmount = context.dataset.data.reduce((acc, val) => acc + val, 0);
                const percentage = ((value / totalAmount) * 100).toFixed(2);
                return `${percentage} %`;
              },
              align: 'center',
              offset: -30,
              textAlign: 'center',
            },
            legend: {
              position: 'right'
            }
          },
        }
      };
    }

    return {
      fetchData,
      filterDataByThisMonth,
      updateChart,
      hasData
    };
  }
};
</script>
<style>
</style>
