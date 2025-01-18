<script setup lang="ts">
    import { userList, type userListType, type userSearchType, type useListWithTotalType } from "@/apis/sys/user";
    import { ElLoading } from "element-plus";
    import { onMounted, reactive, ref } from "vue";
    import Edit from "./edit.vue";
    import Add from "./add.vue";
    import Auth from "./auth.vue";
    import Pagination from "@/components/pagination.vue";

    let page = ref<number>(1);
    let size = ref<number>(10);
    let total = ref<number>(0);
    let listData = ref<userListType[]>([]);
    const editDialogStatus = ref<boolean>(false); // edit dialog contro
    let editDialogData: userListType; // edit dialog data
    const addDialogStatus = ref<boolean>(false); // add dialog contro
    const authDialogStatus = ref<boolean>(false); // auth dialog contro
    let authDialogData: userListType; // auth dialog data

    onMounted(() => {
        getList(page.value, size.value);
    });

    const clickEdit = (row: userListType) => {
        editDialogStatus.value = true;
        editDialogData = { ...row };
    };

    const hideEditDialog = (status: boolean) => {
        editDialogStatus.value = status;
        getList(page.value, size.value);
    };

    const clickAdd = () => {
        addDialogStatus.value = true;
    };

    const hideAddDialog = (status: boolean) => {
        addDialogStatus.value = status;
        page.value = 0;
        getList(page.value, size.value);
    };

    const searchCondition = reactive<userSearchType>({
        nickname: "",
        status: "",
    });

    const clickSearch = () => {
        getList(page.value, size.value);
    };

    const clickAuth = (user: userListType) => {
        authDialogData = user;
        authDialogStatus.value = true;
    };

    const hideAuthDialog = (status: boolean) => {
        authDialogStatus.value = status;
    };

    const getList = (page: number, size: number) => {
        const loading = ElLoading.service({
            target: ".container",
            text: "拼命加载中...",
        });
        userList(searchCondition.nickname, searchCondition.status, page, size)
            .then((resp: useListWithTotalType) => {
                listData.value = resp.list;
                total.value = resp.total;
            })
            .finally(() => {
                loading.close();
            });
    };
</script>

<template>
    <div class="container">
        <el-form
            :inline="true"
            :model="searchCondition"
        >
            <el-form-item label="昵称">
                <el-input v-model="searchCondition.nickname" />
            </el-form-item>
            <el-form-item label="状态">
                <el-select
                    v-model="searchCondition.status"
                    placeholder="用户状态"
                    style="width: 240px"
                    :clearable="true"
                >
                    <el-option
                        label="正常"
                        :value="1"
                    />
                    <el-option
                        label="禁用"
                        :value="0"
                    />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button
                    type="primary"
                    @click="clickSearch"
                >
                    查询
                </el-button>
                <el-button
                    type="success"
                    @click="clickAdd"
                >
                    新增
                </el-button>
            </el-form-item>
        </el-form>
        <el-table
            class="table"
            :data="listData"
            :border="true"
            table-layout="auto"
        >
            <el-table-column
                prop="id"
                label="ID"
            />
            <el-table-column
                prop="account"
                label="账号"
            />
            <el-table-column label="状态">
                <template #default="scope">
                    <template v-if="scope.row.status == 1">
                        <el-tag
                            disable-transitions
                            :hit="true"
                        >
                            正常
                        </el-tag>
                    </template>
                    <template v-else>
                        <el-tag
                            disable-transitions
                            :hit="true"
                        >
                            禁用
                        </el-tag>
                    </template>
                </template>
            </el-table-column>
            <el-table-column
                prop="nickname"
                label="昵称"
            />
            <el-table-column
                prop="page"
                label="默认菜单"
            />
            <el-table-column
                prop="created_at"
                label="创建时间"
            />
            <el-table-column
                prop="updated_at"
                label="更新时间"
            />
            <el-table-column
                fixed="right"
                label="操作"
                width="200px"
            >
                <template #default="scope">
                    <el-button
                        link
                        type="success"
                        size="small"
                        @click="clickEdit(scope.row)"
                    >
                        编辑
                    </el-button>
                    <el-button
                        link
                        type="danger"
                        size="small"
                        @click="clickAuth(scope.row)"
                    >
                        授权
                    </el-button>
                    <el-button
                        link
                        type="warning"
                        size="small"
                    >
                        操作记录
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <Pagination
            :page="page"
            :size="size"
            :total="total"
            @getList="getList"
        ></Pagination>
    </div>

    <!-- edit dialog -->
    <el-dialog
        v-model="editDialogStatus"
        width="600"
        destroy-on-close
    >
        <Edit
            :dataSource="editDialogData"
            @hideEditDialog="hideEditDialog"
        ></Edit>
    </el-dialog>
    <!-- add dialog -->
    <el-dialog
        v-model="addDialogStatus"
        width="600"
    >
        <Add @hideAddDialog="hideAddDialog"></Add>
    </el-dialog>
    <!-- auth dialog -->
    <el-dialog
        v-model="authDialogStatus"
        width="600"
        destroy-on-close
    >
        <Auth
            :user="authDialogData"
            @hideAuthDialog="hideAuthDialog"
        ></Auth>
    </el-dialog>
</template>
