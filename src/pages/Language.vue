<template>
  <div>
    <p>{{ $t('language_settings') }}</p>
    <div class="dropdown">
      <button @click="toggleDropdown" class="dropbtn">{{ selectedLanguageName }}</button>
      <div :class="['dropdown-content', { show: dropdownVisible }]" id="myDropdown">
        <input type="text" placeholder="Search.." id="myInput" v-model="searchQuery" @keyup="filterLanguages">
        <a v-for="(lang, code) in filteredLanguages" :key="code" @click="selectLanguage(code)">
          {{ lang }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
export default {
  data() {
    return {
      selectedLanguage: 'ko', // 기본 언어 설정
      dropdownVisible: false,
      searchQuery: '',
      languages: {
        ko: '한국어',
        en: 'English',
        zh: '中文',
        ja: '日本語'
      },
    };
  },
  computed: {
    filteredLanguages() {
      const query = this.searchQuery.toLowerCase();
      return Object.fromEntries(
        Object.entries(this.languages).filter(
          ([code, name]) => name.toLowerCase().includes(query)
        )
      );
    },
    selectedLanguageName() {
      return this.languages[this.selectedLanguage];
    }
  },
  methods: {
    toggleDropdown() {
      this.dropdownVisible = !this.dropdownVisible;
    },
    selectLanguage(code) {
      this.selectedLanguage = code;
      this.$i18n.locale = code;
      this.dropdownVisible = false;
    }
  }
};
</script>

<style scoped>
p {
    font-size: 20px;
    font-weight: bold;
    margin : 20px 20px;
    color : rgb(84,80,69);
}

.dropbtn {
  background-color: rgb(84,80,69);
  color: white;
  margin: 20px;
  padding: 16px;
  width: 100px;
  font-size: 16px;
  border: none;
  cursor: pointer;
}

.dropbtn:hover, .dropbtn:focus {
  background-color: #ccc;
  color : black
}

#myInput {
  box-sizing: border-box;
  background-image: url('searchicon.png');
  background-position: 14px 12px;
  background-repeat: no-repeat;
  font-size: 16px;
  padding: 14px 20px 12px 45px;
  border: none;
  border-bottom: 1px solid #ddd;
}

#myInput:focus {
  outline: 3px solid #ddd;
}

.dropdown {
  position: relative;
  display: inline-block;
  margin-bottom: 250px;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f6f6f6;
  margin-left: 20px;
  min-width: 230px;
  overflow: auto;
  border: 1px solid #ddd;
  z-index: 1;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown a:hover {
  background-color: #ddd;
}

.show {
  display: block;
}
</style>
