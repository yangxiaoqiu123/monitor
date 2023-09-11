import { defineStore } from "pinia";
import { ref } from "vue";

const pdfHome = defineStore("pdfHome", () => {
  const FileList = ref([]);

  const tags = ref([{ name: "首页", type: "sy" }]);

  if (localStorage.getItem("FileList")) {
    FileList.value = JSON.parse(localStorage.getItem("FileList") || "[]");
  }
  const XuanRanTags = () => {
    tags.value = [
      { name: "首页", type: "sy", title: "首页" },
      ...FileList.value.map((item: any) => {
        return {
          name: item.raw.uid,
          type: item.raw.uid,
          title: item.name,
        };
      }),
    ];
  };
  const SetFileList = (list: any) => {
    if (list == undefined) return;
    FileList.value = list;

    console.log(21321, FileList.value);
    localStorage.setItem("FileList", JSON.stringify(FileList.value));
    XuanRanTags();
  };
  XuanRanTags();
  return {
    FileList,
    SetFileList,
    tags,
  };
});

export default pdfHome;
