<template>
  <div>
    <p>{{ $t('language_settings') }}</p>
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
export default {
  data() {
    return {
      selectedLanguage: 'ko', // 기본 언어 설정
    };
  },
  methods: {
    changeLanguage() {
      // 애플리케이션 언어 변경
      this.$i18n.locale = this.selectedLanguage;
    },
  },
};
</script>

<style scoped>
p {
  font-size: 20px;
  font-weight: bold;
  margin: 20px 20px;
  color: rgb(84, 80, 69);
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
