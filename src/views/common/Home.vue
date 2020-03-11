<template>
    <div class="wrapper">
        <v-head></v-head>
        <v-sidebar></v-sidebar>
        <div class="content">
        <transition name="move" mode="out-in">
            <keep-alive :include="tagsList">
                <router-view></router-view>
            </keep-alive>
        </transition>
        <el-backtop target=".content"></el-backtop>
    </div>
    </div>
</template>

<script>
    import vHead from './Header.vue';
    import vSidebar from './Sidebar.vue';
    export default {
        name: "Home",
        components:{
            vHead,
            vSidebar,
        },
        data(){
            return{
                tagsList: [],
            }
        }
    }
</script>

<style scoped>

</style>
