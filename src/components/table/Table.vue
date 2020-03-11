<template>
    <vx-card title="列表">

        <vs-table v-model="selected" pagination max-items="12" :data="users">
            <template slot="thead" v-for="(key,index) in keys" :index="index">
                <vs-th :sort-key=key v-show="key!='id'">{{key}}</vs-th>
            </template>
            <template slot="thead">
                <vs-th>操作</vs-th>
            </template>

            <!-- <template slot="thead">
                 <vs-th sort-key="email">Email</vs-th>
                 <vs-th sort-key="username">Name</vs-th>
                 <vs-th sort-key="website">Website</vs-th>
                 <vs-th sort-key="id">Nro</vs-th>
             </template>-->
            <template slot-scope="{data}">
                <vs-tr :data="tr" v-for="(tr, index) in data">
                    <vs-td :data="data[index][a]" v-for="(a,i) in keys" :index="i" v-show="a!='id'">
                        {{data[index][a]}}
                    </vs-td>
                    <vs-td >
                        <el-button icon="el-icon-search" circle size="mini"></el-button>
                        <el-button type="primary" icon="el-icon-edit" circle size="mini"></el-button>
                        <el-button type="danger" icon="el-icon-delete" circle size="mini"></el-button>
                    </vs-td>
                </vs-tr>
            </template>
            <!--<template slot-scope="{data}">
                <vs-tr :data="tr" :key="index" v-for="(tr, index) in data">

                    <vs-td :data="data[index].email">
                        {{data[index].email}}
                    </vs-td>

                    <vs-td :data="data[index].username">
                        {{data[index].username}}
                    </vs-td>

                    <vs-td :data="data[index].id">
                        {{data[index].website}}
                    </vs-td>

                    <vs-td :data="data[index].id">
                        {{data[index].id}}
                    </vs-td>

                </vs-tr>
            </template>-->
        </vs-table>
    </vx-card>
</template>

<script>
    import {fetchData} from '../../api/index';

    export default {
        data() {
            return {
                query: {
                    "id": '',
                    "name": '',
                    "username": '',
                    "email": '',
                    "website": '',
                },
                selected: [],
                'tableList': [
                    'vs-th: Component',
                    'vs-tr: Component',
                    'vs-td: Component',
                    'thread: Slot',
                    'tbody: Slot',
                    'header: Slot'
                ],
                users: [],
                keys: []
            }
        },
        watch: {
            selected() {
                console.log(this.selected)
            }
        },
        created() {
            this.getData();
        },
        methods: {
            // 获取 easy-mock 的模拟数据
            getData() {
                fetchData(this.query).then(res => {
                    console.log(res);
                    this.users = res.list;
                    this.keys = Object.keys(this.users[0]);
                    console.log(this.keys[0])
                    let a = this.keys[0];
                    console.log(this.users[0][a]);
                });
            },
        }

    }
</script>

<style scoped>

</style>
