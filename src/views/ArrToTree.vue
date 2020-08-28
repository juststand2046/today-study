<template>
  <div>
    <el-tree
      :data="listTree"
      show-checkbox
      node-key="id"
      :default-expanded-keys="[2, 3]"
      :default-checked-keys="[5]"
      :props="defaultProps">
    </el-tree>
  </div>
</template>

<script>
  export default {
    name: "ArrToTree",
    data() {
      return {
        defaultProps: {
          label: 'name',
          children: 'children'
        },
        listTree: [
          {name: '根目录1', id: 1, parentId: 0, gender: 1, age: 15},
          {name: '根目录2', id: 2, parentId: 0, gender: 1, age: 15},
          {name: '目录1-1', id: 3, parentId: 1, gender: 1, age: 15},
          {name: '目录1-2', id: 4, parentId: 1, gender: 1, age: 15},
          {name: '目录2-1', id: 5, parentId: 2, gender: 1, age: 15},
          {name: '目录1-2-1', id: 6, parentId: 4, gender: 1, age: 15}
        ]
      }
    },
    created() {
      this.listTree = this.listToTree(this.listTree, 0);
    },
    methods: {
      listToTree(lst, pid) {
        const that = this
        let tmp = []
        let treeLst = lst
        treeLst.forEach((item, index) => {
          if (item.parentId === pid) {
            const children = that.listToTree(treeLst, item.id)
            if (children && (children.length > 0)) {
              treeLst[index].children = children
            }
            tmp.push(treeLst[index])
          }
        })
        console.log('tmp:', tmp)
        return tmp
      },
      treeData(data) {
        let cloneData = [...data]   // 对源数据深度克隆
        return cloneData.filter(father => {
          //返回每一项的子级数组
          let branchArr = cloneData.filter(child => father.id === child.parentId);
          //如果存在子级，则给父级添加一个children属性，并赋值
          branchArr.length > 0 ? father.children = branchArr : '';
          //返回第一层
          return father.parentId === 0;
        });
      },
      //封装版
      treeDataUtil(source, id, parentId, children) {
        let cloneData = JSON.parse(JSON.stringify(source))
        return cloneData.filter(father => {
          let branchArr = cloneData.filter(child => father[id] === child[parentId]);
          branchArr.length > 0 ? father[children] = branchArr : ''
          return father[parentId] === 0        // 如果第一层不是parentId=0，请自行修改
        })
      }
    }
  }
</script>

<style scoped>

</style>
