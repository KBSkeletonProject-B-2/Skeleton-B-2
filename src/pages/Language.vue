<template>
    <div>
      <p>언어 설정</p>
      <div class="language-selection">
        <select v-model="selectedLanguage" @change="changeLanguage">
          <option value="ko">한국어</option>
          <option value="en">English</option>
          <option value="zh">中文 (Chinese)</option>
          <option value="ja">日本語 (Japanese)</option>
        </select>
      </div>
    </div>
  </template>
  
  <script>
  import Header from '../components/Header.vue';
  import Footer from '../components/Footer.vue';
  
  export default {
    components: {
      Header,
      Footer,
    },
    data() {
      return {
        selectedLanguage: 'ko', // 기본 언어 설정
      };
    },
    methods: {
      changeLanguage() {
        // 언어 변경 로직
        console.log('Selected language:', this.selectedLanguage);
        // 필요한 경우 상태 관리 또는 API 호출을 통해 언어를 저장하거나 처리할 수 있습니다.
      },
    },
  };
  </script>
  
  
  <style scoped>
  p {
    font-size: 20px;
    font-weight: bold;
    margin : 20px 20px;
  }
  
  h2 {
    margin-bottom: 10px;
    font-size: 20px;
  }
  
  .language-selection {
    margin: 20px;
  }
  
  .language-selection select {
    padding: 10px;
    font-size: 16px;
    border: 2px solid #cecece;
  }
  </style>