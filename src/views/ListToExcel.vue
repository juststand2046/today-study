<template>
  <el-card>
    <el-form inline>
      <el-form-item><el-button size="small" @click="listToExcel()">导出Excel</el-button></el-form-item>
      <el-form-item>
        <el-upload
          class="upload-demo"
          ref="upload"
          accept=".xls,.xlsx"
          :limit="3"
          multiple
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-change="onUploadChange"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          :auto-upload="false">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
          <div slot="tip" class="el-upload__tip">只能上传xls/xlsx文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
    </el-form>
    <el-table id="table" :data="tableData" stripe fit>
      <el-table-column label="#" prop="index">
        <template slot-scope="scope">
          {{scope.row.index=scope.$index+1}}
        </template>
      </el-table-column>
      <el-table-column label="测试多级表头1">
        <el-table-column label="No." prop="no"></el-table-column>
        <el-table-column label="测试多级表头2">
          <el-table-column label="Name" prop="name"></el-table-column>
          <el-table-column label="Gender" prop="gender"></el-table-column>
        </el-table-column>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
  import FileSaver from 'file-saver';
  import XLSX from 'xlsx';
  export default {
    name: "ListToExcel",
    data() {
      return {
        tableData:[],
        fileList:[]
      }
    },
    created(){
      this.fetchData();
    },
    methods:{
      fetchData(){
        for (let i = 0; i < 30; i++) {
          let obj={};
          obj.name='王二狗'+i;
          obj.no=(i+1).toString().padStart(4,'0');
          obj.gender=Math.random()>0.5?'man':'woman';
          this.tableData.push(obj);
        }
      },
      listToExcel(){
        //table_to_book方法传入表格dom对象
        let wb = XLSX.utils.table_to_book(document.querySelector("#table"));
        let wbout = XLSX.write(wb, {
          bookType: "xlsx",
          bookSST: true,
          type: "array"
        });
        try {
          FileSaver.saveAs(
            new Blob([wbout], { type: "application/octet-stream" }),
            "报表下载"+ ".xlsx"
          );
        } catch (e) {
          if (typeof console !== "undefined") console.log(e, wbout);
        }
        return wbout;
      },
      //选取文件钩子-开启多选时，每个文件都会依次执行钩子
      onUploadChange(file){
        console.log('file:', file)
        const isXls=(file.raw.type==='application/vnd.ms-excel' ||
          file.raw.type==='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        const isLimit500k=file.size/1024/1024<0.5;
        if(!isXls){
          return this.$message.error('只能上传Excel文件')
        }
        if(!isLimit500k){
          return this.$message.error('文件大小不能超过500k')
        }
        var reader = new FileReader();
        reader.onload = function(e) {
          debugger
          let data = new Uint8Array(e.target.result);
          let workbook = XLSX.read(data, {type: 'array'});
          console.log('workbook:', workbook)
          /* DO SOMETHING WITH workbook HERE */
          //将Excel内容转为json格式
          let worksheet = workbook.Sheets[workbook.SheetNames[0]];
          let jsonExcel=XLSX.utils.sheet_to_json(worksheet);
          console.log('jsonExcel:', jsonExcel)
        }
        reader.readAsArrayBuffer(file.raw);
      },
      submitUpload() {
        this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      }
    }
  }
</script>

<style scoped>

</style>
