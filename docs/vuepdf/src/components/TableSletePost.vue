<template>
  <div>
    <div>
      <el-form ref="formRules" :rules="rules" :model="form" label-width="120px">
        <el-form-item label="服务器地址" prop="Posturl">
          <div class="TjfwqDzBox">
            <el-input v-model="form.Posturl" />
            <div class="TjfwqDzBox-btn">
              <el-button type="primary" @click="onSubmit">提交</el-button>
            </div>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      ref="multipleTableRef"
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" />
      <el-table-column label="文件名">
        <template #default="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column label="文件大小">
        <template #default="scope">{{ scope.row.size }}</template>
      </el-table-column>
      <!-- <el-table-column label="创建时间">
        <template #default="scope">{{
          FormDateTime(scope.row.creationTime)
        }}</template>
      </el-table-column> -->

      <el-table-column label="最后更新时间">
        <template #default="scope">{{
          FormDateTime(scope.row.lastModifiedTime)
        }}</template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref, defineEmits } from "vue";
import pdfHome from "@/store/modules/pdfHome.ts";
import dayjs from "dayjs";
import axios from "axios";
import { ElMessage } from "element-plus";
import { storeToRefs } from "pinia";
let formRules = ref(null);
let emit = defineEmits(["coles"]);
const { FileList } = storeToRefs(pdfHome());
const form = ref({
  Posturl: "",
});
let SeletData = ref([]);
const rules = ref({
  Posturl: {
    required: true,
    message: "请输入服务器地址",
    trigger: "blur",
  },
});

const FormDateTime = (day) => {
  const now = dayjs(day);
  const formattedTime = now.format("YYYY-MM-DD HH:mm:ss");

  return formattedTime;
};

const onSubmit = () => {
  formRules.value.validate(async (vaild) => {
    if (vaild) {
      SeletData.value.forEach((item) => {
        item.creationTime = FormDateTime(item.creationTime);
        item.lastModifiedTime = FormDateTime(item.lastModifiedTime);
      });
      try {
        const res = await axios({
          url: form.value.Posturl,
          method: "post",
          data: {
            files: SeletData.value,
          },
        });

        ElMessage({
          message: "已发送请求并请求成功",
          type: "success",
        });
        emit("coles");
      } catch {
        ElMessage({
          message: "已发送请求",
          type: "success",
        });
      }
    }
  });
};
const handleSelectionChange = (e) => {
  SeletData.value = e;
};
const tableData = ref([]);
tableData.value = FileList.value;
</script>

<style scoped>
.TjfwqDzBox {
  display: flex;
}
.TjfwqDzBox-btn {
  margin-left: 10px;
}
</style>
