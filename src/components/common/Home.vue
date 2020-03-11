<template>
    <div class="wrapper">
        <v-head></v-head>
        <v-sidebar></v-sidebar>
        <div class="content-box" >
            <div class="content">

                    <transition name="move" mode="out-in">
                        <router-view></router-view>
                    </transition>

            </div>
        </div>
    </div>
</template>

<script>
    import vHead from './Header.vue';
    import vSidebar from './Sidebar.vue';

    export default {
        name: "Home",
        components: {
            vHead,
            vSidebar,
        },
        data() {
            return {
                tagsList: [],
            }
        }
    }
</script>

<style lang="scss">
    .content-box {
        position: absolute;
        left: 250px;
        right: 0;
        top: 70px;
        bottom: 0;
        padding-bottom: 0px;
        -webkit-transition: left .3s ease-in-out;
        transition: left .3s ease-in-out;
        background: #f0f0f0;
        .content {
            width: auto;
            height: 100%;
            padding: 10px;
            overflow-y: scroll;
            box-sizing: border-box;
            /*.container {
                padding: 30px;
                background: #fff;
                border: 1px solid #ddd;
                border-radius: 5px;
            }*/
        }
    }
</style>
