<template>
    <nav class="navbar navbar-expand-lg navbar-light header-nav">
        <div class="container-fluid">
            <router-link class="navbar-brand" id="header-router-link" to="/">홈</router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <router-link class="nav-link" id="header-router-link" to="/transactions">거래 내역</router-link>
                    <router-link class="nav-link" id="header-router-link" to="/profile">프로필</router-link>
                    <router-link class="nav-link" id="header-router-link" to="/notification">알림</router-link>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup>

</script>

<style>
.header-nav {
    background-color: rgb(255, 188, 0);
}

#header-router-link {
    color: rgb(96, 88, 76);
    font-weight: bold;
}
</style>