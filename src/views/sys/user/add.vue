<script setup lang="ts">
    import { type userAddType, userAdd } from "@/apis/sys/user";
    import { reactive, ref } from "vue";
    import { ElLoading, ElMessage, type FormInstance, type FormRules } from "element-plus";

    const emit = defineEmits<{
        hideAddDialog: [status: boolean];
    }>();

    const ruleFormRef = ref<FormInstance>();

    let forms = reactive<userAddType>({
        account: "",
        password: "",
        nickname: "",
    });

    const rules = reactive<FormRules<userAddType>>({
        account: [
            {
                trigger: "blur",
                validator: (rule: any, value: any, callback: any) => {
                    const regex = /^[A-Za-z][A-Za-z0-9_-]{5,31}$/;
                    if (!regex.test(value)) {
                        callback(new Error("invalid aaccount"));
                    } else {
                        callback();
                    }
                },
            },
        ],
        password: [
            {
                trigger: "blur",
                validator: (rule: any, value: any, callback: any) => {
                    const regex = /^[A-Za-z0-9][A-Za-z0-9_-]{5,31}$/;
                    if (!regex.test(value)) {
                        callback(new Error("invalid password"));
                    } else {
                        callback();
                    }
                },
            },
        ],
        nickname: [
            {
                trigger: "blur",
                required: true,
                type: "string",
                min: 4,
                max: 32,
                message: "invalid nickname",
            },
        ],
    });

    const clickReset = (formEl: FormInstance | undefined) => {
        if (!formEl) return;
        formEl.resetFields();
    };

    const clickSubmit = async (formEl: FormInstance | undefined) => {
        if (!formEl) return;
        await formEl.validate((valid, fields) => {
            if (valid) {
                const loading = ElLoading.service({
                    target: ".form",
                    text: "正在提交...",
                });
                userAdd(forms)
                    .then(() => {
                        ElMessage.success({
                            message: "新增成功",
                        });
                        emit("hideAddDialog", false);
                    })
                    .finally(() => {
                        loading.close();
                    });
            }
        });
    };
</script>

<template>
    <el-form
        class="form"
        :model="forms"
        :rules="rules"
        ref="ruleFormRef"
        label-width="auto"
        style="max-width: 600px; margin-top: 20px"
    >
        <el-form-item
            label="账号"
            prop="account"
        >
            <el-input v-model="forms.account" />
        </el-form-item>
        <el-form-item
            label="密码"
            prop="password"
        >
            <el-input
                v-model="forms.password"
                type="password"
            />
        </el-form-item>
        <el-form-item
            label="昵称"
            prop="nickname"
        >
            <el-input v-model="forms.nickname" />
        </el-form-item>
        <el-form-item>
            <el-button
                type="primary"
                @click="clickSubmit(ruleFormRef)"
            >
                提交
            </el-button>
            <el-button @click="clickReset(ruleFormRef)">重置</el-button>
        </el-form-item>
    </el-form>
</template>
