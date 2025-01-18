<script setup lang="ts">
    import { type menu, menuEdit, menuTypeEnum } from "@/apis/sys/menus";
    import { ElMessage, type FormInstance, type FormRules } from "element-plus";
    import { reactive, ref, toRaw } from "vue";

    const emit = defineEmits<{ hideEditDialog: [is: boolean] }>();
    const { row, tableData } = defineProps<{ row: menu; tableData: menu[] }>();
    const ruleFormRef = ref<FormInstance>();

    const formData = ref<menu>(row);
    const formDataRaw = { ...toRaw(formData.value) };
    const parentSelectOptions = Array.from(tableData)
        .map((item: menu) => {
            if (item.id == row.id) {
                return undefined;
            }
            if (item.type == menuTypeEnum.isApi) {
                return undefined;
            }
            return {
                value: item.id,
                label: item.name,
            };
        })
        .filter((item) => item != undefined);
    parentSelectOptions.unshift({
        label: "顶级菜单",
        value: 0,
    });

    const clickSubmit = async (formEl: FormInstance | undefined) => {
        if (!formEl) return;
        await formEl.validate((valid) => {
            if (valid) {
                const formDataRaw2 = toRaw(formData.value);
                if (JSON.stringify(formDataRaw2) == JSON.stringify(formDataRaw)) {
                    console.log(`未作出任何修改`);
                    emit("hideEditDialog", false);
                    return;
                }
                menuEdit(formDataRaw2).then(() => {
                    ElMessage.success({
                        message: "更新成功",
                    });
                    emit("hideEditDialog", false);
                });
            }
        });
    };

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
    });
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
        </el-form-item>
    </el-form>
</template>

<style scoped lang="less"></style>
