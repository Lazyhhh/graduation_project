<template>
  <div class="order">
    <el-tabs type="border-card" @tab-click="getData">
      <el-tab-pane label="未入住">
        <el-form label-width="160px">
          <el-row>
            <el-col :span="10">
              <el-form-item label="请输入身份证号查询：" style="margin-right: 5px">
                <el-input v-model="searchIDCARD"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-table
        :data="filterPrevOrders"
        type="index"
        style="width: 100%">
          <el-table-column
            prop="username"
            label="姓名"
            width="150">
          </el-table-column>
          <el-table-column
            prop="idcard"
            label="身份证号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="type"
            label="房间类型"
            width="160">
          </el-table-column>
          <el-table-column
            prop="start_date"
            label="入住日期"
            sortable
            width="180">
          </el-table-column>
          <el-table-column
            prop="end_date"
            label="退房日期"
            width="180">
          </el-table-column>
          <el-table-column
          label="操作">
            <template slot-scope="scope">
              <el-popover
                ref="comboPopover"
                placement="right"
                width="400"
                @hide="form.roomNum = '';"
                @show="getComboData(scope.row)"
                trigger="click">
                <el-form label-width="80px">
                  <el-row>
                    <el-col :span="18">
                      <el-form-item label="客房编号" style="margin-right: 10px">
                        <el-select v-model="form.roomNum" placeholder="请选择客房号">
                          <el-option v-for="room in rooms" :key="room._id" :label="room.num" :value="room.num"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="5">
                      <el-button @click="comfirmUsed(scope.row)">确定</el-button>
                    </el-col>
                  </el-row>
                </el-form>
              </el-popover>
              <el-button v-popover:comboPopover type="danger" size="mini">确认入住</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="已入住">
        <el-table
        :data="orders"
        type="index"
        style="width: 100%">
          <el-table-column
            prop="username"
            label="姓名">
          </el-table-column>
          <el-table-column
            prop="idcard"
            width="180"
            label="身份证号">
          </el-table-column>
          <el-table-column
            prop="type"
            label="房间类型">
          </el-table-column>
          <el-table-column
            prop="room_num"
            label="入住房号">
          </el-table-column>
          <el-table-column
            prop="start_date"
            label="入住日期"
            sortable>
          </el-table-column>
          <el-table-column
            prop="end_date"
            label="退房日期">
          </el-table-column>
          <el-table-column
          label="操作">
            <template slot-scope="scope">
              <el-button type="danger" size="mini" @click="closeOrder(scope.$index)">确认退房</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="已退房">
        <el-table
        :data="closeOrders"
        type="index"
        style="width: 100%">
          <el-table-column
            prop="username"
            label="姓名"
            width="150">
          </el-table-column>
          <el-table-column
            prop="idcard"
            label="身份证号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="type"
            label="房间类型"
            width="160">
          </el-table-column>
          <el-table-column
            prop="start_date"
            label="入住日期"
            sortable
            width="180">
          </el-table-column>
          <el-table-column
            prop="end_date"
            label="退房日期"
            width="180">
          </el-table-column>
          <el-table-column
          label="状态">
            <el-tag type="danger">已退房</el-tag>
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
        prev_orders: [],
        orders: [],
        closeOrders: [],
        dialogFormVisible: false,
        searchIDCARD: '',
        rooms: [],
        form: {
          date: '',
          roomNum: ''
        },
        formLabelWidth: '120px'
      }
    },
    computed: {
      currentUser(){
        return this.$store.getters.currentUser;
      },
      filterPrevOrders(){
        return !this.searchIDCARD ? this.prev_orders : this.prev_orders.filter(item => {
          let idcardStr = String(item.idcard);
          return idcardStr.includes(this.searchIDCARD);
        })
      }
    },
    methods: {
      dateFormat(date){
        let month = date.getMonth() + 1;
        let day = parseInt(date.getDate());
        month = month < 10 ? `0${month}` : month;
        day = day < 10 ? `0${day}` : day;
        return `${date.getFullYear()}-${month}-${day}`;
      },
      getOrderData(orderType, status){
        this.$Axios.post('/api/order/getOrder', {
          status
        })
        .then(res => {
          this[orderType] = res.data; 
        })
        .catch(err => {
          console.log(err);
        })
      },
      comfirmUsed(row){
        let currentRoom = this.rooms.filter(room => {
          return room.num == this.form.roomNum
        })[0];
        let index = this.filterPrevOrders.indexOf(row);
        let prev_index = this.prev_orders.indexOf(row);
        let roomNum = this.form.roomNum;
        this.$confirm('该订单用户是否已入住？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$Axios.put(`/api/order/updateOrderStatus/${this.filterPrevOrders[index]._id}`, {
            status: 1,
            roomNum
          })
          this.$Axios.put(`/api/room/updateRoomDetailStatus/${currentRoom._id}`, {
            status: 1
          }).then(res => {
            this.$message({
              type: 'success',
              message: res.data
            })
          })
          this.filterPrevOrders.splice(index, 1);
          this.prev_orders.splice(prev_index, 1);
        }).catch(err => {
          console.log(err);
        })
      },
      getData(tabs){
        if (tabs.paneName === '2') {
          this.$Axios.post('/api/order/getOrder', {
            status: 2
          })
          .then(res => {
            this.closeOrders = res.data;
          })
          .catch(err => {
            console.log(err);
          })
        } else if (tabs.paneName === '1') {
          this.getOrderData('orders', 1);
        } else {
          this.getOrderData('prev_orders', 0);
        }
      },
      closeOrder(index){
        this.$confirm('该订单用户是否已退房？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$Axios.put(`/api/order/updateOrderStatus/${this.orders[index]._id}`, {
            status: 2
          })
          this.$Axios.post('/api/room/updateRoomDetailStatusByNum', {
            num: this.orders[index].room_num,
            status: 0
          }).then(res => {
            this.$message({
              type: 'success',
              message: res.data
            })
          })
          this.orders.splice(index, 1);
        }).catch(err => {
          console.log(err);
        })
      },
      close(){
        this.form.date = '';
      },
      async getComboData(row){
        let roomData = await this.$Axios.get('/api/roomDetail/getRoomDetail', {
          params: {
            type: row.type
          }
        })
        this.rooms = roomData.data;
      }
    },
    async created(){
      this.getOrderData('prev_orders', 0);
    }
  }
</script>
<style scoped>
.order {
  padding: 50px 180px;
}

.el-range-editor.el-input__inner {
  margin: 10px 0;
  width: 400px;
}
</style>