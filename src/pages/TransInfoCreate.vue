<!-- 거래내역 저장 뷰 -->
<!-- 가계부 내역을 생성하고 수정하는 뷰이다. -->
<template>
    <div>
        <form action="/action_page.php" @submit.prevent="clickSaveButtonHandler">
            <div class="mb-3 mt-3">
                <label for="date" class="form-label transinfocreate-color">날짜</label>
                <input type="date" class="form-control transinfocreate-input" id="date" required
                    v-model="transInfo.date">
            </div>
            <div class="mb-3">
                <label for="category" class="form-label transinfocreate-color">카테고리</label>
                <select class="form-select transinfocreate-select" id="category" required v-model="transInfo.category">
                    <option value="" selected disabled hidden>선택</option>
                    <option v-for="c in cList" :value="c.name">{{ c.name }}</option>
                </select>
            </div>
            <div class="mb-3">
                <label for="amount" class="form-label transinfocreate-color">금액</label>
                <input type="text" class="form-control transinfocreate-input" id="amount" required
                    v-model="transInfo.amount">
            </div>
            <div class="mb-3">
                <label for="memo" class="form-label transinfocreate-color">메모</label>
                <input type="text" class="form-control transinfocreate-input" id="memo" v-model="transInfo.memo">
            </div>
            <button @click="clickCancelButtonHandler" type="button" class="btn transinfocreate-cancel">취소</button>
            <button type="submit" class="btn transinfocreate-save">저장</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios'
import { onMounted, reactive, ref } from 'vue';
export default {
    props: ['isOpen'],
    setup(props, context) {
        let cList = reactive([])
        let transInfo = reactive({
            id: Date.now(),
            date: "",
            category: "",
            amount: "",
            memo: ""
        })
        let isOpen = ref(false)

        /**
         * onMounted
         * 
         * 컴포넌트가 마운트된 후 JSON에서 카테고리를 가져온다.
         */
        onMounted(async () => {
            try {
                sendIsOpen()

                const url = "http://localhost:3000/category"
                const response = await axios.get(url)

                Object.assign(cList, response.data)

                console.log(response.data)
            } catch (err) {
                console.log(err.message)
                alert("카테고리 조회 실패")
            }
        })

        /**
         * 저장버튼클릭 핸들러
         * 
         * 저장 버튼을 클릭했을 때 JSON에 날짜, 카테고리, 금액, 메모 정보를 업데이트하는 메소드이다.
         */
        const clickSaveButtonHandler = async () => {
            try {
                if (document.getElementById("date").value === "") {
                    alert("날짜를 선택해주세요.")
                } else if (document.getElementById("category").value === "") {
                    alert("카테고리를 선택해주세요.")
                } else if (document.getElementById("amount").value === "") {
                    alert("금액을 입력해주세요.")
                } else {
                    const url = "http://localhost:3000/transInfo"
                    const response = await axios.post(url, transInfo)

                    document.getElementById("date").value = ""
                    document.getElementById("category").value = ""
                    document.getElementById("amount").value = ""
                    document.getElementById("memo").value = ""

                    isOpen.value = props.isOpen
                    changeIsOpen()
                    sendIsOpen()

                    console.log(response.data)
                }
            } catch (err) {
                console.log(err.message)
                alert("가계부 저장 실패")
            }
        }

        /**
         * 취소버튼클릭 핸들러
         * 
         * 취소 버튼을 클릭했을 때 화면을 리셋해주고 팝업창을 종료하는 메소드이다.
         */
        const clickCancelButtonHandler = () => {
            document.getElementById("date").value = ""
            document.getElementById("category").value = ""
            document.getElementById("amount").value = ""
            document.getElementById("memo").value = ""

            isOpen.value = props.isOpen
            changeIsOpen()
            sendIsOpen()
        }

        /**
         * isOpen 변경
         * 
         * isOpen의 반대값을 저장하는 메소드이다.
         */
        const changeIsOpen = () => {
            isOpen.value = !isOpen.value
            console.log("TransInfoCreate changeIsOpen : " + isOpen.value)
        }

        /**
         * isOpen 전달
         * 
         * isOpen 값을 부모 컴포넌트인 TransList.vue에 전달하기 위한 메소드이다.
         */
        const sendIsOpen = () => {
            context.emit('sendIsOpen', isOpen.value)
        }
        return { cList, transInfo, clickSaveButtonHandler, clickCancelButtonHandler, isOpen, changeIsOpen, sendIsOpen }
    }
}
</script>

<style>
.transinfocreate-color {
    color: #84B9C0;
    font-weight: bold;
}

.transinfocreate-cancel {
    color: #C0C0C0;
    font-weight: bold;
    float: left;
}

.transinfocreate-input {
    background-color: #D9D9D9;
}

.transinfocreate-select {
    background-color: #D9D9D9;
}

.transinfocreate-save {
    color: #84B9C0;
    float: right;
}
</style>