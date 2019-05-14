  <template>
    <div class="order">
      <el-tabs type="border-card" @tab-click="getOrders">
        <el-tab-pane label="我的订单">
      <el-table
      :data="order_data"
      type="index"
      style="width: 100%">
        <el-table-column
          label="姓名"
          width="180">
        {{ currentUser.name }}
        </el-table-column>
        <el-table-column
          prop="type"
          label="房间类型"
          width="180">
        </el-table-column>
        <el-table-column
          prop="start_date"
          label="入住日期"
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
            <el-button size="mini" @click="dialogFormVisible = true">改期</el-button>
            <el-button size="mini" type="danger" @click="deleteOrder(scope.$index)">退订</el-button>
            <el-dialog @close="close()" width="35%" title="改期" :visible.sync="dialogFormVisible">
              <el-form :model="form">
                <span>请选择入住日期：</span>
                <div class="block">
                  <el-date-picker
                    v-model="form.date"
                    type="daterange"
                    :editable="false"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
                </div>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="form.date = '';dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="editOrder(scope.$index)">确 定</el-button>
              </div>
            </el-dialog>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="已完成">
      <el-table
      :data="close_orders"
      type="index"
      style="width: 100%">
        <el-table-column
          label="姓名"
          width="180">
        {{ currentUser.name }}
        </el-table-column>
        <el-table-column
          prop="type"
          label="房间类型"
          width="180">
        </el-table-column>
        <el-table-column
          prop="start_date"
          label="入住日期"
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
            <el-button v-if="!scope.row.comment" size="mini" type="primary" plain @click="rateVisible = true;">评价</el-button>
            <el-tag v-if="scope.row.comment" size="mini" type="success">已评价</el-tag>
            <el-dialog @close="clearRate" width="35%" title="评价" :visible.sync="rateVisible">
              <div class="rate_div">
                <span>清洁程度</span>
                <el-rate
                  v-model="clean_rate"
                  show-text>
                </el-rate>
              </div>
              <div class="rate_div">
                <span>服务态度</span>
                <el-rate
                  v-model="service_rate"
                  show-text>
                </el-rate>
              </div>
              <div class="rate_div">
                <span>舒适程度</span>
                <el-rate
                  v-model="comfortable_rate"
                  show-text>
                </el-rate>
              </div>
              <div class="rate_div">
                <span>配备设施</span>
                <el-rate
                  v-model="equipment_rate"
                  show-text>
                </el-rate>
              </div>
              <div class="rate_div">
                <el-input type="textarea" placeholder="请输入您的宝贵意见" v-model="form.desc"></el-input>
              </div>
              <div slot="footer" class="dialog-footer">
                <el-button @click="rateVisible = false">取 消</el-button>
                <el-button type="primary" @click="evaluateOrder(scope.$index)">确 定</el-button>
              </div>
            </el-dialog>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
    <!-- <el-tab-pane label="已评价">
      <el-table
      :data="evaluated_orders"
      type="index"
      style="width: 100%">
        <el-table-column
          label="姓名"
          width="180">
        {{ currentUser.name }}
        </el-table-column>
        <el-table-column
          prop="type"
          label="房间类型"
          width="180">
        </el-table-column>
        <el-table-column
          prop="start_date"
          label="入住日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="end_date"
          label="退房日期"
          width="180">
        </el-table-column>
        <el-table-column
        label="状态">
          <el-tag size="mini" type="success">已评价</el-tag>
        </el-table-column>
      </el-table>
    </el-tab-pane> -->
  </el-tabs>
</div>
</template>
<script>
  export default {
    data () {
      return {
        order_data: [],
        close_orders: [],
        dialogFormVisible: false,
        rateVisible: false,
        clean_rate: 0,
        service_rate: 0,
        comfortable_rate: 0,
        equipment_rate: 0,
        form: {
          date: '',
          desc: ''
        },
        formLabelWidth: '120px'
      }
    },
    computed: {
      currentUser(){
        return this.$store.getters.currentUser;
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
          order_account: this.currentUser.account,
          status: status
        })
        .then(res => {
          this[orderType] = res.data; 
        })
        .catch(err => {
          console.log(err);
        })
      },
      deleteOrder(index){
        this.$confirm('您确定要退订该订单吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$Axios.post('/api/order/deleteOrder', {
            _id: this.order_data[index]._id
          }).then(res => {
            this.order_data.splice(index, 1);
            this.$message({
              type: 'success',
              message: res.data
            });
          }).catch(err => {
            console.log(err);
          })
        }).catch(() => {});
      },
      editOrder(index){
        let start_date = this.dateFormat(this.form.date[0]);
        let end_date = this.dateFormat(this.form.date[1]);
        this.$Axios.put(`/api/order/updateOrder/${this.order_data[index]._id}`, {
          start_date,
          end_date
        }).then(res => {
          this.$message({
            type: 'success',
            message: res.data
          });
          this.order_data[index].start_date = start_date;
          this.order_data[index].end_date = end_date;
          this.dialogFormVisible = false;
        }).catch(err => {
          console.log(err);
        })
      },
      evaluateOrder(index){
        let rate = (this.clean_rate + this.service_rate + this.comfortable_rate + this.equipment_rate)/4;
        let comment = this.form.desc;
        let currentOrder = this.close_orders[index];
        this.$Axios.put(`/api/order/updateOrderStatus/${currentOrder._id}`, {
          status: 2,
          rate,
          comment
        }).then(res => {
          this.$message({
            type: 'success',
            message: res.data
          });
          this.close_orders[index].comment = comment;
        }).catch(err => {
          console.log(err);
        })
        this.$Axios.post('/api/comment/createComment', {
          order_id: this.close_orders[index]._id,
          author: this.currentUser.name,
          title: currentOrder.type,
          date: this.dateFormat(new Date()),
          desc: this.form.desc,
          addr: '深圳',
          img_src: '../../static/hotels/6.jpeg'
        }).then(res => {
          this.rateVisible = false;
        })
      },
      getOrders(tab){
        let dataNameArr = ['order_data', 'close_orders'];
        let statusObj = {
          'order_data': 0,
          'close_orders': 2
        };
        let index = parseInt(tab.paneName, 10);
        let status = statusObj[dataNameArr[index]];
        this.getOrderData(dataNameArr[index], status);
      },
      close(){
        this.form.date = '';
      },
      clearRate(){
        this.clean_rate = 0;
        this.service_rate = 0;
        this.comfortable_rate = 0;
        this.equipment_rate = 0;
        this.form.desc = '';
      }
    },
    mounted(){
      this.getOrderData('order_data', 0);
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

.el-rate {
  display: inline-block;
  vertical-align: middle;
  margin-left: 10px;
}

.rate_div {
  margin-bottom: 10px;
}
</style>