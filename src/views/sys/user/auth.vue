<script setup lang="ts">
    import type { MenuItem } from "@/apis/login";
    import { userAuth, userMenus, type userListType } from "@/apis/sys/user";
    import { ElMessage, type ElTree } from "element-plus";
    import { ref } from "vue";

    const { user } = defineProps<{ user: userListType }>();
    const emit = defineEmits<{
        hideAuthDialog: [status: boolean];
    }>();

    const menus = ref<MenuItem[]>();
    const defaultSelectedNode = ref<number[]>();
    const btnIsDisable = ref<boolean>(false);
    let defaultSelectedNodeNoRef: number[] = [];

    const props = {
        value: "id",
        label: "name",
        children: "children",
    };

    userMenus(user.id).then((resp) => {
        menus.value = resp.menus;
        defaultSelectedNode.value = resp.auth;
        defaultSelectedNodeNoRef = resp.auth;
    });

    const tree = ref<InstanceType<typeof ElTree>>();
    const getKeys = () => {
        btnIsDisable.value = true;
        const checkeds = tree.value?.getCheckedNodes(false, true);
        if (checkeds == undefined) {
            btnIsDisable.value = false;
            return;
        }

        let checked: number[] = [];
        for (const item of checkeds) {
            checked.push(item.id);
        }

        const isSameFunc = (d1: number[], d2: number[]) => {
            const sortedD1 = [...d1].sort((a, b) => a - b);
            const sortedD2 = [...d2].sort((a, b) => a - b);
            if (sortedD1.length != sortedD2.length) {
                return false;
            }
            for (let i = 0; i < sortedD1.length; i++) {
                if (sortedD1[i] != sortedD2[i]) {
                    return false;
                }
            }
            return true;
        };
        const isSame: boolean = isSameFunc(defaultSelectedNodeNoRef, checked);

        if (!isSame) {
            userAuth(user.id, checked).then(
                () => {
                    ElMessage.success({
                        message: "授权成功",
                    });
                    emit("hideAuthDialog", false);
                },
                (err) => {
                    console.error(err);
                }
            );
        } else {
            console.log("权限数据没有变化");
        }
        btnIsDisable.value = false;
    };
</script>

<template>
    <div class="container">
        <el-scrollbar
            height="500px"
            class="scrollbar"
        >
            <el-tree
                node-key="id"
                show-checkbox
                ref="tree"
                style="max-width: 600px"
                :default-checked-keys="defaultSelectedNode"
                :data="menus"
                :props="props"
            />
            <el-button
                class="btn"
                type="primary"
                :disabled="btnIsDisable"
                @click="getKeys"
            >
                确定
            </el-button>
        </el-scrollbar>
    </div>
</template>

<style scoped lang="less">
    .container {
        width: 100%;
        box-sizing: border-box;
        margin-top: 16px;
        .scrollbar {
            box-sizing: border-box;
            padding: 0 16px 16px 16px;
            .btn {
                margin-top: 16px;
                margin-left: 5px;
            }
        }
    }
</style>
