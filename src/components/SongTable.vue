<template>
  <el-table
    ref="singleTable"
    :data="this.$store.getters.getSongData"
    highlight-current-row
    @current-change="handleCurrentChange"
    style="width: 100%"
    height="65vh"
  >
    <el-table-column type="index" width="50"> </el-table-column>
    <el-table-column property="title" label="Title" width="120">
    </el-table-column>
    <el-table-column property="cover" label="Artist" width="120">
    </el-table-column>
    <el-table-column property="youtubeUrl" label="Youtube URL">
    </el-table-column>
    <el-table-column property="audioSourceUrl" label="Audio Source Url">
    </el-table-column>
  </el-table>
  <div style="margin-top: 20px">
    <el-button @click="setCurrent(tableData[1])">Select second row</el-button>
    <el-button @click="setCurrent()">Clear selection</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //   tableData: [
      //     {
      //       audioSourceUrl: "2016-05-03",
      //       title: "Tom",
      //       artist: "No. 189, Grove St, Los Angeles",
      //       youtubeUrl: "",
      //     },
      //     {
      //       audioSourceUrl: "2016-05-02",
      //       title: "Tom",
      //       artist: "No. 189, Grove St, Los Angeles",
      //       youtubeUrl: "",
      //     },
      //     {
      //       audioSourceUrl: "2016-05-04",
      //       title: "Tom",
      //       artist: "No. 189, Grove St, Los Angeles",
      //       youtubeUrl: "",
      //     },
      //     {
      //       audioSourceUrl: "2016-05-01",
      //       title: "Tom",
      //       artist: "No. 189, Grove St, Los Angeles",
      //       youtubeUrl: "",
      //     },
      //   ],
      currentRow: null,
    };
  },

  methods: {
    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row);
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    },
  },
};
</script>