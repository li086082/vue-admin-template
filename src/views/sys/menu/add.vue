<script setup lang="ts">
    import { menuAdd, menuTypeEnum, type menu } from "@/apis/sys/menus";
    import { ElMessage, type FormInstance, type FormRules } from "element-plus";
    import { reactive, ref } from "vue";

    const { tableData } = defineProps<{ tableData: menu[] }>();
    const emit = defineEmits<{ hideAddDialog: [is: boolean] }>();

    const ruleFormRef = ref<FormInstance>();
    const formData = reactive<menuAdd>({
        parent_id: 0,
        name: "",
        action: "",
        icon: "",
        type: 1,
        sort: 0,
        route: "",
    });

    const parentSelectOptions = Array.from(tableData).map((item: menu) => {
        return {
            value: item.id,
            label: item.name,
        };
    });
    parentSelectOptions.unshift({
        label: "顶级菜单",
        value: 0,
    });

    const rules = reactive<FormRules<menu>>({
        name: [
            {
                required: true,
                type: "string",
                message: "name is invalid",
                trigger: "blur",
            },
        ],
        parent_id: [
            {
                required: true,
                type: "number",
                message: "parent id is invalid",
                min: 0,
                max: 9999,
                trigger: "blur",
            },
        ],
        icon: [
            {
                type: "string",
                message: "icon is invalid",
                trigger: "blur",
            },
        ],
        action: [
            {
                required: true,
                type: "string",
                message: "action is invalid",
                trigger: "blur",
            },
        ],
        type: [
            {
                required: true,
                type: "number",
                message: "type is invalid",
                min: 1,
                max: 2,
                trigger: "blur",
            },
        ],
        sort: [
            {
                required: true,
                message: "sort is invalid",
                trigger: "blur",
            },
        ],
        route: [
            {
                type: "string",
                message: "route is invalid",
                trigger: "blur",
            },
        ],
    });

    const clickSubmit = async (formEl: FormInstance | undefined) => {
        console.log(formEl);
        if (!formEl) return;
        await formEl.validate((valid) => {
            if (valid) {
                menuAdd(formData).then(() => {
                    ElMessage.success({
                        message: "新增成功",
                    });
                    emit("hideAddDialog", false);
                });
            }
        });
    };

    const clickReset = (formEl: FormInstance | undefined) => {
        if (!formEl) return;
        formEl.resetFields();
    };
</script>

<template>
    <el-form
        ref="ruleFormRef"
        label-width="80px"
        label-position="left"
        style="max-width: 600px; margin-top: 16px"
        :rules="rules"
        :model="formData"
    >
        <el-form-item
            label="名称"
            prop="name"
        >
            <el-input v-model="formData.name" />
        </el-form-item>
        <el-form-item
            label="父级菜单"
            prop="parent_id"
        >
            <el-select-v2
                v-model="formData.parent_id"
                filterable
                :options="parentSelectOptions"
                placeholder="Please select"
            />
        </el-form-item>
        <el-form-item
            label="icon"
            prop="icon"
        >
            <el-input v-model="formData.icon" />
        </el-form-item>
        <el-form-item
            label="action"
            prop="action"
        >
            <el-input v-model="formData.action" />
        </el-form-item>
        <el-form-item
            label="类型"
            prop="type"
        >
            <el-select v-model="formData.type">
                <el-option
                    label="菜单"
                    :value="menuTypeEnum.isMenu"
                ></el-option>
                <el-option
                    label="接口"
                    :value="menuTypeEnum.isApi"
                ></el-option>
            </el-select>
        </el-form-item>
        <el-form-item
            label="排序"
            prop="sort"
        >
            <el-input
                v-model="formData.sort"
                type="number"
            ></el-input>
        </el-form-item>
        <el-form-item
            label="路由"
            prop="route"
        >
            <el-input v-model="formData.route"></el-input>
            <template #prepend>/</template>
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

<style scoped lang="scss"></style>
