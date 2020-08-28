<template>
  <el-card>
    <el-form inline>
      <el-input type="text" v-model="searchStr"
                @input="searchTable(1)" style="max-width: 300px">
        <el-button slot="append" icon="el-icon-search" @click="searchTable(1)"></el-button>
      </el-input>
    </el-form>
    <br>
    <el-table :data="tempTableData" border fit>
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="name" label="name"></el-table-column>
      <el-table-column prop="code" label="code"></el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row)" disabled>编辑</el-button>
          <el-button type="danger" @click="del(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        background
        :hide-on-single-page="true"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
    </el-pagination>
  </el-card>
</template>

<script>
  export default {
    name: "PaginationAndSearch",
    data() {
      return {
        searchStr: '',
        tableData: [],
        tempTableData: [],
        //需要参与搜索的属性名,最多接受三个
        myKey: ['id', 'name', 'code'],
        //分页
        total:0,
        pageSize:10,
        currentPage:1
      }
    },
    created() {
      this.fetchData();
    },
    methods: {
      //准备测试数据
      fetchData() {
        for (let i = 1; i < 10001; i++) {
          let temp = {};
          temp.id = Date.now()+''+i;
          temp.name = '张三' + i;
          temp.code = Math.random().toString().substring(2, 18) + i;
          this.tableData.push(temp);
        }
        this.total=this.tableData.length;
        this.tempTableData = [...this.tableData];
        this.handlePagination();
      },
      //前端搜索的方法
      searchTable(currPage) {
        if(currPage===1){
          this.currentPage=1;
        }
        //去空
        for (let i = 0; i <this.myKey.length ; i++) {
          if(!this.myKey[i]){
            this.myKey.splice(i,1)
            i--;
          }
        }
        console.log('this.myKey:', this.myKey);
        if (this.myKey.length === 1) {
          this.tempTableData = this.tableData.filter((item) => {
            if (item[this.myKey[0]].toString().search(this.searchStr) !== -1) {
              return item;
            }
          })
        } else if (this.myKey.length === 2) {
          this.tempTableData = this.tableData.filter((item) => {
            if (item[this.myKey[0]].toString().search(this.searchStr) !== -1 ||
              item[this.myKey[1]].toString().search(this.searchStr) !== -1) {
              return item;
            }
          })
        } else if (this.myKey.length === 3) {
          this.tempTableData = this.tableData.filter((item) => {
            if (item[this.myKey[0]].toString().search(this.searchStr) !== -1 ||
              item[this.myKey[1]].toString().search(this.searchStr) !== -1 ||
              item[this.myKey[2]].toString().search(this.searchStr) !== -1) {
              return item;
            }
          })
        } else {
          console.log('接受1~3个属性作为查询条件')
        }
        //查询结束开启分页
        this.total=this.tempTableData.length;
        this.handlePagination();
      },
      handleSizeChange(val){
        this.pageSize=val;
        this.searchTable();
      },
      handleCurrentChange(val){
        this.currentPage=val;
        this.searchTable();
      },
      //处理并返回分页及查询后的数据  11-20
      handlePagination(){
        this.tempTableData=this.tempTableData.filter((item,index)=>{
          if(index>=(this.currentPage-1)*this.pageSize && this.currentPage*this.pageSize>index){
            return item;
          }
        })
      },
      edit(row){
        console.log('row:edit', row)
      },
      del(row){
        console.log('row:del', row)
        for (let i = 0; i < this.tableData.length; i++) {
          if(row.id===this.tableData[i].id){
            this.tableData.splice(i,1);
            return this.searchTable();
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>
