<template>
  <el-card class="container">
    <el-table v-if="exchange" :data="table" :row-key="getRowKeys" style="width:755px" border fit
              ref="multipleTable"
              @selection-change="selectChange">
      <el-table-column type="selection" width="55" :reserve-selection="true"></el-table-column>
      <el-table-column prop="id" label="ID" width="200"></el-table-column>
      <el-table-column prop="id" label="ID" width="200">
        <template slot-scope="scope">
          <el-input-number v-model="scope.row.num"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column prop="content" label="内容" width="200"></el-table-column>
    </el-table>
    <el-button style="margin-left: 10px;margin-top: 10px" class="my-button" type="danger"
               @click="exchangeTable()">
      切换
    </el-button>
  </el-card>
</template>

<script>
  export default {
    name: 'TableSelection',
    components: {},
    data() {
      return {
        exchange: true,
        table: [],
        table1: [
          {id: 1, content: "content1"},
          {id: 2, content: "content2"},
          {id: 3, content: "content3"},
          {id: 4, content: "content4"},
          {id: 5, content: "content5"},
          {id: 6, content: "content6"},
          {id: 7, content: "content7"},
          {id: 8, content: "content8"},
          {id: 9, content: "content9"},
          {id: 10, content: "content10"},
        ],
        table2: [
          {id: 11, content: "content11"},
          {id: 12, content: "content12"},
          {id: 13, content: "content13"},
          {id: 14, content: "content14"},
          {id: 15, content: "content15"},
          {id: 16, content: "content16"},
          {id: 17, content: "content17"},
          {id: 18, content: "content18"},
          {id: 19, content: "content19"},
          {id: 20, content: "content20"},
        ],
        //暂存全选的项
        tempSelectionAll: [],
        selectionResult: [],
      }
    },
    created() {
      this.table = this.table1;
    },
    methods: {
      //选择改变了
      selectChange(selection) {
        if(selection.length>0){
          this.selectionResult=selection;
          console.log('this.selectionResult:',this.selectionResult)
        }
      },
      exchangeTable() {
        this.table = this.table === this.table1 ? this.table2 : this.table1;
      },
      getRowKeys(row) {
        return row.id
      },
    }
  }
</script>
<style lang="less" scoped>
</style>

