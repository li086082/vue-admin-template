<script setup lang="ts">
    import { menuList, type menuListType, type menuSearchType, type menu, menuTypeEnum } from "@/apis/sys/menus";
    import { Icon } from "@iconify/vue";
    import { ElLoading } from "element-plus";
    import { onMounted, reactive, ref } from "vue";
    import Pagination from "@/components/pagination.vue";
    import Edit from "./edit.vue";
    import Add from "./add.vue";

    const page = ref<number>(1);
    const size = ref<number>(10);
    const total = ref<number>(0);
    const tableData = ref<menu[]>([]);
    let search = reactive<menuSearchType>({
        name: "",
    });

    const getList = (page: number, size: number) => {
        const loading = ElLoading.service({
            text: "拼命加载中...",
            target: ".table",
        });
        menuList(page, size, search)
            .then(
                (resp: menuListType) => {
                    tableData.value = resp.list;
                    total.value = resp.total;
                },
                (err) => {
                    console.error(`获取菜单列表失败`, err);
                }
            )
            .finally(() => {
                loading.close();
            });
    };

    onMounted(() => {
        getList(page.value, size.value);
    });

    // edit dialog
    const editDialogStats = ref<boolean>(false);
    let editDialogData: menu;
    const clickEditBtn = (row: menu) => {
        editDialogStats.value = true;
        editDialogData = { ...row };
    };
    const hideEditDialog = (is: boolean) => {
        editDialogStats.value = is;
        getList(page.value, size.value);
    };

    // search
    const clickSearch = () => {
        getList(page.value, size.value);
    };

    // add dialog
    const addDialogStatus = ref<boolean>(false);
    const clickAdd = () => {
        addDialogStatus.value = true;
    };
    const hideAddDialog = (is: boolean) => {
        page.value = 1;
        getList(page.value, size.value);
        addDialogStatus.value = is;
    };
</script>

<template>
    <el-form
        :inline="true"
        :model="search"
    >
        <el-form-item label="名称">
            <el-input v-model="search.name" />
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
        :data="tableData"
        :border="true"
        table-layout="auto"
    >
        <el-table-column
            prop="name"
            label="名称"
        />
        <el-table-column label="图标">
            <template #default="scope">
                <Icon
                    :icon="scope.row.icon"
                    height="18"
                    width="18"
                />
            </template>
        </el-table-column>
        <el-table-column
            prop="action"
            label="请求路径"
        />
        <el-table-column label="菜单类型">
            <template #default="scope">
                <el-tag
                    type="primary"
                    disable-transitions
                    v-if="scope.row.type == 1"
                >
                    菜单
                </el-tag>
                <el-tag
                    type="success"
                    disable-transitions
                    v-else
                >
                    接口
                </el-tag>
            </template>
        </el-table-column>
        <el-table-column
            prop="sort"
            label="排序"
        />
        <el-table-column
            prop="route"
            label="路由Path"
        />
        <el-table-column
            prop="created_at"
            label="创建时间"
        />
        <el-table-column
            prop="updated_at"
            label="更新时间"
        />
        <el-table-column label="操作">
            <template #default="scope">
                <el-button
                    link
                    type="primary"
                    size="small"
                    @click="clickEditBtn(scope.row)"
                >
                    编辑
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

    <!-- edit dialog -->
    <el-dialog
        v-model="editDialogStats"
        width="600"
        destroy-on-close
    >
        <Edit
            :row="editDialogData"
            :tableData="tableData"
            @hideEditDialog="hideEditDialog"
        ></Edit>
    </el-dialog>

    <!-- add dialog -->
    <el-dialog
        v-model="addDialogStatus"
        width="600"
        destroy-on-close
    >
        <Add
            :tableData="tableData"
            @hideAddDialog="hideAddDialog"
        ></Add>
    </el-dialog>
</template>
