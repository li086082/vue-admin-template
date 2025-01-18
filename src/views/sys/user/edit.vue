<script setup lang="ts">
    import { userEdit, type editUserType, type userListType } from "@/apis/sys/user";
    import { ElMessage } from "element-plus";
    import { ref } from "vue";

    const emit = defineEmits<{
        hideEditDialog: [status: boolean];
    }>();

    const { dataSource } = defineProps<{ dataSource: userListType }>();
    const formData = ref<userListType>(dataSource);

    const password = ref<string>("");

    const clickSubmit = () => {
        let data: editUserType = {
            uid: dataSource.id,
            nickname: "",
            status: "",
            password: "",
            page: "",
        };
        if (formData.value.nickname != dataSource.nickname) {
            data.nickname = formData.value.nickname;
        }
        if (formData.value.status != dataSource.status) {
            data.status = formData.value.status;
        }
        if (formData.value.page != dataSource.page) {
            data.page = formData.value.page;
        }
        if (password.value) {
            data.password = password.value;
        }

        // check is submit ?
        const { uid, ...newData } = data;
        const newDataValues = Object.values(newData);
        const checkResult = newDataValues.filter((v) => {
            return v != "";
        });
        if (checkResult.length < 1) {
            emit("hideEditDialog", false);
            return;
        }

        // submit
        userEdit(data).then(
            () => {
                ElMessage.success({
                    message: "修改成功",
                });
                emit("hideEditDialog", false);
            },
            () => {}
        );
    };
</script>

<template>
    <el-form
        :model="formData"
        label-width="auto"
        style="max-width: 600px; margin-top: 20px"
    >
        <el-form-item label="昵称">
            <el-input v-model="formData.nickname" />
        </el-form-item>
        <el-form-item label="状态">
            <el-select
                v-model="formData.status"
                placeholder="please select your zone"
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
        <el-form-item label="密码">
            <el-input
                v-model="password"
                placeholder="不修改密码则不填"
            />
        </el-form-item>
        <el-form-item label="默认页">
            <el-input v-model="formData.page" />
        </el-form-item>
        <el-form-item>
            <el-button
                type="primary"
                @click="clickSubmit"
            >
                提交
            </el-button>
        </el-form-item>
    </el-form>
</template>

<style scoped lang="less"></style>
