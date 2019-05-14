<template>
  <div class="room-manage">
    <el-tabs type="border-card" @tab-click="getData">
      <el-tab-pane label="客房总览">
        <el-table
        :data="rooms"
        type="index"
        style="width: 100%">
          <el-table-column
            prop="room_desc"
            label="房间类型">
          </el-table-column>
          <el-table-column
            prop="total"
            label="房间数量">
          </el-table-column>
          <el-table-column
            prop="room_price"
            label="价格">
          </el-table-column>
          <el-table-column
          label="操作">
            <template slot-scope="scope">
              <el-popover
                ref="popover"
                width="540"
                @hide="clearData()"
                v-model="tipVisibles[scope.$index]"
                trigger="click">
                <el-form class="form">
                  <h4>新增客房</h4>
                  <p>类型：{{rooms[scope.$index].room_desc}}</p>
                  <el-input v-model="newCount" placeholder="请输入新增数量" style="margin-bottom: 10px"></el-input>
                  <el-input style="margin-bottom: 10px" v-model="newNum" placeholder="请输入房间号，可以输入多个，用逗号隔开；也可以输入一个范围，用-隔开"></el-input>
                  <div style="float: right;">
                    <el-button type="primary" size="mini" @click="addRoom(scope.$index);">确定</el-button>
                  </div>
                </el-form>
              </el-popover>
              <el-popover
                ref="editPopover"
                width="540"
                @hide="saveEdit(rooms[scope.$index], scope.$index)"
                v-model="eidtTipVisibles[scope.$index]"
                trigger="click">
                <el-form label-width="70px" class="form">
                  <h4>编辑客房</h4>
                  <el-form-item label="房型名称">
                    <el-input v-model="rooms[scope.$index].room_desc"></el-input>
                  </el-form-item>
                  <el-form-item label="房型价格">
                    <el-input v-model="rooms[scope.$index].room_price"></el-input>
                  </el-form-item>
                  <div style="float: right;">
                    <el-button type="primary" size="mini" @click="saveEdit(rooms[scope.$index], scope.$index);">确定</el-button>
                  </div>
                </el-form>
              </el-popover>
              <el-button slot="reference" size="mini" v-popover:editPopover>编辑</el-button>
              <el-button slot="reference" type="primary" plain size="mini" v-popover:popover>新增</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="房间详情">
        <el-form label-width="150px">
          <el-row>
            <el-col :span="10">
              <el-form-item label="请输入房间号查询：" style="margin-right: 5px">
                <el-input v-model="searchNum"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-table
        :data="filterRoomDetails"
        type="index"
        style="width: 100%">
          <el-table-column
            prop="name"
            sortable
            :filters="[{ text: '标准单床房', value: '标准单床房' }, { text: '标准大床房', value: '标准大床房' }, { text: '商务大床房', value: '商务大床房' }, { text: '豪华大床房', value: '豪华大床房' }, { text: '标准双床房', value: '标准双床房' }, { text: '标准双大床房', value: '标准双大床房' }, { text: '商务双床房', value: '商务双床房' }, { text: '豪华双床房', value: '豪华双床房' }]"
            :filter-method="filterRoomType"
            filter-placement="bottom-end"
            label="客房类型">
          </el-table-column>
          <el-table-column
            prop="num"
            sortable
            label="房间号">
          </el-table-column>
          <el-table-column
            prop="status"
            :filters="[{ text: '空闲中', value: '0' }, { text: '入住中', value: '1' }]"
            :filter-method="filterStatus"
            filter-placement="bottom-end"
            label="状态">
            <template slot-scope="scope">
              <el-tag close-transition :type="typeArr[scope.row.status]">{{statusArr[scope.row.status]}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button @click="confirmGoIn(scope.row)" size="mini" type="primary" v-if="scope.row.status === 0">入住</el-button>
              <el-button @click="confirmGoOut(scope.row)" size="mini" type="danger" v-if="scope.row.status === 1">退房</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        rooms: [],
        roomDetails: [],
        tipVisibles: [],
        eidtTipVisibles: [],
        newCount: '',
        typeArr: ['success', 'danger'],
        statusArr: ['空闲中', '入住中'],
        newNum: '',
        searchNum: '',
        form: {
          region: ''
        }
      }
    },
    computed: {
      numberCount(){
        return parseInt(this.newCount, 10);
      },
      numberNewNum(){
        if (this.newNum.indexOf(',') !== -1) {
          return this.newNum.split(',');
        } else if (this.newNum.indexOf('-') !== -1) {
          let newNumArr = [];
          let numArr = [];
          numArr = this.newNum.split('-');
          for(let i = numArr[0]; i <= numArr[1]; i++) {
            newNumArr.push(parseInt(i, 10));
          }
          return newNumArr;
        } else {
          return parseInt(this.newNum, 10);
        }
      },
      filterRoomDetails(){
        return !this.searchNum ? this.roomDetails : this.roomDetails.filter(item => {
          let numStr = String(item.num);
          return numStr.includes(this.searchNum);
        })
      }
    },
    methods: {
      filterStatus(value, row) {
        return row.status == value;
      },
      filterRoomType(value, row){
        return row.name == value;
      },
      getData(tab){
        let statusArr = ['rooms', 'roomDetails'];
        let index = parseInt(tab.paneName, 10);
        this.getRoomData(statusArr[index]);
      },
      async getRoomData(data){
        let urlObj = {
          'rooms': '/api/room/getRoomInfo',
          'roomDetails': '/api/roomDetail/getRoomDetail'
        }
        let res = await this.$Axios.get(urlObj[data]);
        this[data] = res.data;
      },
      clearData(){
        this.newCount = '';
        this.newNum = '';
      },
      addRoom(index){
        let currentRoom = this.rooms[index];
        let newCount = this.numberCount;
        this.$Axios.put(`/api/room/updateRoom/${currentRoom._id}`, {
          total: currentRoom.total,
          newCount: this.numberCount
        }).then(res => {
          this.$message({
            type: 'success',
            message: res.data
          });
          this.rooms[index].total+=newCount;
        }).catch(err => {
          console.log(err);
        });
        this.$Axios.post('/api/roomDetail/createRoomDetail', {
          name: currentRoom.room_desc,
          count: this.numberCount,
          number: this.numberNewNum
        })
        this.$set(this.tipVisibles, index, false);
      },
      saveEdit(currentRoom, index){
        this.$Axios.put(`/api/room/updateRoomDescAndPrice/${currentRoom._id}`, {
          room_desc: currentRoom.room_desc,
          room_price: currentRoom.room_price
        })
        this.$set(this.eidtTipVisibles, index, false);
      },
      updateStatus(row, status){
        let contentArr = ['该住客是否已退房？', '确认入住该客房？'];
        let index = this.filterRoomDetails.indexOf(row);
        this.$confirm(contentArr[status], '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$Axios.put(`/api/room/updateRoomDetailStatus/${this.filterRoomDetails[index]._id}`, {
            status
          }).then(res => {
            this.$message({
              type: 'success',
              message: res.data
            })
          })
          if (status === 0) {
            this.$Axios.post('/api/order/updateOrderStatusByNum', {
              status: 2,
              roomNum: this.filterRoomDetails[index].num
            })
          }
          this.filterRoomDetails[index].status = status;
        })
      },
      confirmGoIn(row){
        this.updateStatus(row, 1);
      },
      confirmGoOut(row) {
        this.updateStatus(row, 0);
      }
    },
    async created(){
      let res = await this.$Axios.get('/api/room/getRoomInfo');
      this.rooms = res.data;
    }
  }
</script>
<style scoped>
  .room-manage {
    padding: 50px 180px;
  }

  .el-select-dropdown__item {
    padding-left: 10px;
  }

  .el-input__inner {
    display: inline-block;
  }
</style>
<style>
</style>