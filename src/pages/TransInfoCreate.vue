<!-- 거래내역 저장 뷰 -->
<!-- 가계부 내역을 생성하고 수정하는 뷰이다. -->
<template>
    <Transition name="modal" appear>
        <section class="modal">
            <div class="modal__window">
                <form action="/action_page.php" @submit.prevent="clickSaveButtonHandler">
                    <div class="mb-3 mt-3">
                        <label for="date" class="form-label transinfocreate-color">날짜</label>
                        <input type="date" class="form-control transinfocreate-input" id="date" required
                            v-model="transInfo.date">
                    </div>
                    <div class="mb-3">
                        <label for="category" class="form-label transinfocreate-color">분류</label>
                        <select @change="changeCategory" class="form-select transinfocreate-select" id="category"
                            required v-model="transInfo.category">
                            <option value="" selected disabled hidden>선택</option>
                            <option v-for="c in cList" :value="c.name">{{ c.name }}</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="detail" class="form-label transinfocreate-color">카테고리</label>
                        <select class="form-select transinfocreate-select" id="detail" required
                            v-model="transInfo.detail">
                            <option value="" selected disabled hidden>선택</option>
                            <option v-for="cd in cdList" :value="cd.name">{{ cd.name }}</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="account" class="form-label transinfocreate-color">계좌</label>
                        <select class="form-select transinfocreate-select" id="account" required
                            v-model="transInfo.account">
                            <option value="" selected disabled hidden>선택</option>
                            <option v-for="a in aList" :value="a.name">{{ a.name }}</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="amount" class="form-label transinfocreate-color">금액</label>
                        <input type="text" class="form-control transinfocreate-input" id="amount" required
                            v-model="transInfo.amount">
                    </div>
                    <div class="mb-3">
                        <label for="memo" class="form-label transinfocreate-color">메모</label>
                        <input type="text" class="form-control transinfocreate-input" id="memo"
                            v-model="transInfo.memo">
                    </div>
                    <button @click="changeIsOpen(false, transInfo, true)" type="button"
                        class="btn transinfocreate-cancel">취소</button>
                    <button type="submit" class="btn transinfocreate-save">저장</button>
                </form>
            </div>
            <div class="modal__overlay"></div>
        </section>
    </Transition>
</template>

<script>
import axios from 'axios'
import { onMounted, onUpdated, reactive, ref } from 'vue';
export default {
    props: ["transInfo", "isOpen"],
    setup(props, context) {
        let cList = reactive([])
        let cdList = reactive([])
        let aList = reactive([])
        let transInfo = reactive({
            id: "",
            date: "",
            category: "",
            detail: "",
            account: "",
            amount: "",
            memo: ""
        })
        let isOpen = ref(false)
        let scrollY = ref(0)

        /**
         * onMounted
         * 
         * 컴포넌트가 마운트된 후 JSON에서 카테고리, 계좌 정보를 가져온다.
         */
        onMounted(async () => {
            try {
                const urlCategory = "http://localhost:3000/category"
                const urlAccount = "http://localhost:3000/account"
                const responseCategory = await axios.get(urlCategory)
                const responseAccount = await axios.get(urlAccount)

                Object.assign(cList, responseCategory.data)
                Object.assign(aList, responseAccount.data)

                console.log("TransInfoCreate.vue onMounted : ", responseCategory.data)
                console.log("TransInfoCreate.vue onMounted : ", responseAccount.data)
            } catch (err) {
                console.log("TransInfoCreate.vue onMounted : ", err.message)
                alert("카테고리 조회 실패")
            }
        })

        /**
         * onUpdated
         * 
         * 컴포넌트의 업데이트가 발생했을 때 transInfo 값을 가져오고 isOpen을 업데이트, 스크롤 block 여부를 판단한다.
         */
        onUpdated(() => {
            transInfo.date = changeDateFormat()
            transInfo.category = ""
            transInfo.detail = ""
            transInfo.account = ""
            transInfo.amount = ""
            transInfo.memo = ""

            Object.assign(transInfo, props.transInfo)
            isOpen.value = props.isOpen

            blockScroll()

            console.log("TransInfoCreate.vue onUpdated : ", transInfo)
            console.log("TransInfoCreate.vue onUpdated : ", isOpen.value)
        })

        /**
         * isOpen 변경
         * 
         * isOpen에 파라미터 값인 open으로 변경하고 transInfo 정보를 업데이트하는 메소드이다.
         */
        const changeIsOpen = (open, transInfo, cancel) => {
            isOpen.value = open
            console.log("TransInfoCreate.vue changeIsOpen : ", isOpen.value)
            context.emit('changeIsOpen', isOpen.value, transInfo, cancel)
        }

        /**
         * 날짜포맷 변경
         * 
         * 날짜포맷을 YYYY-MM-DD로 변경하는 메소드이다.
         */
        const changeDateFormat = () => {
            let date = new Date()
            return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
        }

        /**
         * 스크롤 방지
         * 
         * 팝업창 띄울시 스크롤바를 block하고 화면 최상단으로 이동시키는 메소드이다.
         */
        const blockScroll = () => {
            if (isOpen.value) {
                scrollY.value = window.scrollY
                document.body.style.overflow = "hidden"
                window.scrollTo({ top: 0, behavior: "smooth" })
                changeCategory()
            } else {
                document.body.style.overflow = "auto"
                window.scrollTo({ top: scrollY.value, behavior: "smooth" })
                scrollY.value = 0
            }
        }

        /**
         * 분류 변경
         * 
         * 분류 드롭박스가 선택되었을 때 카테고리 드롭박스를 필터해주는 메소드이다.
         */
        const changeCategory = () => {
            const cValue = transInfo.category

            cList.forEach(element => {
                if (cValue === element.name) {
                    Object.assign(cdList, element.detail)
                    console.log("TransInfoCreate.vue changeCategory : ", cdList)
                }
            })
        }

        /**
         * 저장버튼클릭 핸들러
         * 
         * 저장 버튼을 클릭했을 때 JSON에 날짜, 분류, 카테고리, 계좌, 금액, 메모 정보를 업데이트하는 메소드이다.
         */
        const clickSaveButtonHandler = async () => {
            try {
                if (document.getElementById("date").value === "") {
                    alert("날짜를 선택해주세요.")
                } else if (document.getElementById("category").value === "") {
                    alert("분류를 선택해주세요.")
                } else if (document.getElementById("detail").value === "") {
                    alert("카테고리를 선택해주세요.")
                } else if (document.getElementById("account").value === "") {
                    alert("계좌를 선택해주세요.")
                } else if (document.getElementById("amount").value === "") {
                    alert("금액을 입력해주세요.")
                } else if (!transInfo.id) {
                    transInfo.id = Date.now().toString()

                    const url = "http://localhost:3000/transInfo"
                    const response = await axios.post(url, transInfo)

                    changeIsOpen(false, transInfo)

                    console.log("TransInfoCreate.vue clickSaveButtonHandler post : ", response.data)
                } else {
                    const url = `http://localhost:3000/transInfo/${transInfo.id}`
                    const response = await axios.put(url, transInfo)

                    changeIsOpen(false, transInfo, false)

                    console.log("TransInfoCreate.vue clickSaveButtonHandler put : ", response.data)
                }
            } catch (err) {
                console.log("TransInfoCreate.vue clickSaveButtonHandler : ", err.message)
                alert("가계부 저장 실패")
            }
        }
        return { cList, cdList, aList, transInfo, isOpen, changeIsOpen, changeCategory, clickSaveButtonHandler }
    }
}
</script>

<style lang="scss">
.transinfocreate-color {
    color: rgb(255, 204, 0);
    font-weight: bold;
}

.transinfocreate-cancel {
    color: rgb(132, 134, 135);
    font-weight: bold;
    float: left;
}

.transinfocreate-input {
    background-color: rgb(209, 209, 209);
}

.transinfocreate-select {
    background-color: rgb(209, 209, 209);
}

.transinfocreate-save {
    color: rgb(255, 204, 0);
    font-weight: bold;
    float: right;
}

.transinfocreate-hidden {
    overflow: hidden;
}

.transinfocreate-auto {
    overflow: auto;
}

.modal {
    position: absolute;
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;

    &__overlay {
        position: absolute;
        width: 100%;
        height: 100%;

        background-color: black;
        opacity: 0.8;
    }

    &__window {
        width: 30rem;
        height: 40rem;
        border-radius: 0.4rem;
        overflow: hidden;
        padding: 1rem;
        z-index: 1;

        background-color: white;
    }

    &-enter,
    &-leave-to {
        opacity: 0;
        transition: opacity 0.4s ease;
    }

    &-enter-to,
    &-leave {
        transition: opacity 0.4s ease;
    }
}
</style>