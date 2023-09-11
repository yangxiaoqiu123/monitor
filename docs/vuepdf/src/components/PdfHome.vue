<template>
  <div class="DAbox">
    <div>
      <el-dialog width="60%" v-model="dialogTableVisible" title="发送到服务器">
        <TableSletePost
          @coles="ColerTable"
          v-if="dialogTableVisible"
        ></TableSletePost>
      </el-dialog>
    </div>
    <div class="box">
      <div class="haeder">
        <div class="haeder_tbas">
          <el-tabs
            v-model="ThatType"
            type="card"
            :addable="false"
            class="demo-tabs"
            @tab-remove="TabRemove"
          >
            <el-tab-pane
              v-for="item in tags"
              :closable="item.type !== 'sy'"
              :key="item.type"
              :label="item.title"
              :name="item.type"
            >
              <div v-if="FilterText(item.type)" class="content">
                <div class="inputBox">
                  <el-input
                    v-model="FilterText(item.type).Text"
                    class="inputBox_text"
                    autosize
                    disabled
                    type="textarea"
                    placeholder="Please input"
                  />
                </div>
                <div class="FzBtn">
                  <el-button
                    @click="copyToClipboard(FilterText(item.type).Text)"
                    type="primary"
                    >复制</el-button
                  >
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
        <!-- <el-tag
        v-for="tag in tags"
        :key="tag.type"
        class="mx-1"
        :closable="tag.type !== 'sy'"
        :type="tag.type"
      >
        {{ tag.name }}
      </el-tag> -->
        <div @click="OpenTable" class="Iconbox">
          <el-icon :size="20">
            <Position />
          </el-icon>
        </div>
      </div>
      <div
        :class="{
          container: ThatType === 'sy',
        }"
      >
        <div v-if="ThatType === 'sy'">
          <el-upload
            v-model:file-list="fileList"
            class="upload-demo"
            accept=".pdf"
            multiple
            :before-upload="beforeUpload"
            :before-remove="beforeRemove"
            :http-request="handleFileChange"
            :on-remove="handleRemove"
            :limit="9999"
          >
            <el-button type="primary">文件上传</el-button>
            <template #tip>
              <div class="el-upload__tip">只接受pdf文件类型</div>
            </template>
          </el-upload>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import * as pdfJs from "pdfjs-dist/legacy/build/pdf";

import "pdfjs-dist/legacy/build/pdf.worker.entry";
import { ref, watch } from "vue";

import pdfHome from "@/store/modules/pdfHome.ts";
import { ElMessage } from "element-plus";
import TableSletePost from "@/components/TableSletePost.vue";
import { storeToRefs } from "pinia";
let PdfHome = pdfHome();
const { FileList, tags } = storeToRefs(PdfHome);

watch(
  FileList,
  (newFileList) => {
    PdfHome.SetFileList(newFileList);
  },
  { deep: true }
);
let ThatType = ref("sy");
const dialogTableVisible = ref(false);
const fileList = ref([]);

fileList.value = FileList;
const FilterText = (uid) => {
  return FileList.value.filter((item) => item.raw.uid === uid)[0];
};
const parsePDF = async (file) => {
  try {
    // pdfJs.GlobalWorkerOptions.workerSrc = window.pdfjsWorker;
    const pdf = await pdfJs.getDocument(URL.createObjectURL(file)).promise;
    const numPages = pdf.numPages;
    let textContent = "";
    console.log(11, numPages);
    for (let i = 1; i <= numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();

      const strings = content.items.map((item) => {
        const encoder = new TextEncoder();
        const data = encoder.encode(item.str);
        const decoder = new TextDecoder("utf-8");
        return decoder.decode(data);
      });

      textContent += strings.join("");
    }

    console.log(1231, textContent);
    return textContent;
  } catch (error) {
    console.error("Error parsing PDF:", error);
  }
};
const handleFileChange = (event) => {
  const file = event.file;
  FileList.value = [...fileList.value];
  PdfHome.SetFileList(FileList.value);
  if (file) {
    parsePDF(file)
      .then(async (textContent) => {
        // console.log("PDF文本内容：", textContent);
        let index = FileList.value.findIndex(
          (item) => item.raw.uid === file.uid
        );
        function getCreationTime(file) {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = function () {
              const buffer = reader.result;
              const view = new DataView(buffer);
              const time = view.getUint32(40, true) * 1000; // 读取创建时间的字节偏移量为40
              const creationTime = new Date(time);
              resolve(creationTime);
            };
            reader.onerror = function (err) {
              reject(err);
            };
            reader.readAsArrayBuffer(file);
          });
        }

        FileList.value[index]["Text"] = textContent;
        FileList.value[index]["size"] =
          convertSizeToMB(file.size).toFixed(2) + "MB";
        let creationTime = await getCreationTime(file);
        let lastModifiedTime = new Date(file.lastModified);
        FileList.value[index]["creationTime"] = creationTime; //创建时间
        FileList.value[index]["lastModifiedTime"] = lastModifiedTime; //最后修改时间
        FileList.value[index]["obj"] = URL.createObjectURL(file);
        PdfHome.SetFileList(FileList.value);
        ThatType.value = tags.value[index + 1].type;
      })
      .catch((error) => {
        console.error("Error parsing PDF:", error);
      });
  }
};

function convertSizeToMB(sizeInBytes) {
  let sizeInMB = sizeInBytes / 1024 / 1024;
  return sizeInMB;
}

const copyToClipboard = (text) => {
  // 创建临时输入框
  let tempInput = document.createElement("input");
  tempInput.value = text;
  document.body.appendChild(tempInput);

  // 选择输入框的文本
  tempInput.select();
  tempInput.setSelectionRange(0, 99999); // 兼容移动设备

  // 执行复制命令
  document.execCommand("copy");

  // 移除临时输入框
  document.body.removeChild(tempInput);

  ElMessage({
    message: "复制成功",
    type: "success",
  });
};

const OpenTable = () => {
  dialogTableVisible.value = true;
};
const ColerTable = () => {
  dialogTableVisible.value = false;
};

const beforeUpload = (e) => {
  console.log(111, e);
};

const TabRemove = (uid) => {
  let index = FileList.value.findIndex((item) => {
    return item.raw.uid === uid;
  });

  FileList.value.splice(index, 1);
  fileList.value = [...FileList.value];
  PdfHome.SetFileList(FileList.value);

  ThatType.value = "sy";
};
const beforeRemove = (e) => {
  let index = FileList.value.findIndex((item) => {
    return item.raw.uid === e.raw.uid;
  });
  FileList.value.splice(index, 1);
  PdfHome.SetFileList(FileList.value);
  fileList.value = [...FileList.value];
  return new Promise((rej, err) => err("自定义删除"));
};
</script>

<style>
.upload-demo {
  min-width: 60vw !important;
}

.el-upload-list__item {
  width: fit-content !important;
  padding-right: 20px !important;
}
.el-upload-list__item-info {
  width: auto !important;
}
</style>
<style scoped>
.box {
  width: 99%;

  min-height: 98vh;
  border: 1px solid rgb(159, 159, 159);
}
.container {
  display: flex;
  min-height: 80vh;
  align-items: center;
  justify-content: center;
}
.content {
  padding: 10px;
  width: 100%;
}

.inputBox {
  max-height: 78vh;
  min-height: 78vh;
  overflow: auto;
}
/* .inputBox_text {
  min-height: 78vh;
} */
.FzBtn {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
.haeder_tbas {
  width: 98%;
}
.DAbox {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.haeder {
  display: flex;
}
.Iconbox {
  width: 2%;
  height: 40px;
  display: flex;
  align-items: center;
  cursor: pointer;

  justify-content: center;
}
</style>
