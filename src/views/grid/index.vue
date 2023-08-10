<template>
  <div class="grid-wrap">
    <div class="left block"></div>
    <div class="right">
      <div class="form-box block">
        <el-form
          ref="ruleForm"
          :model="formData"
          label-width="140px"
          label-position="top"
          :inline="true"
        >
          <el-form-item style="width: 48%" label="Code" prop="systemDiskSize">
            <el-input v-model="formData.code" />
          </el-form-item>
          <el-form-item style="width: 48%" label="起始价格" prop="dataDiskSize">
            <el-input v-model.number="formData.startPrice" />
          </el-form-item>
          <el-form-item style="width: 48%" label="下跌幅度" prop="sellRange">
            <el-input v-model.number="formData.buyRange" />
          </el-form-item>
          <el-form-item style="width: 48%" label="上涨幅度" prop="sellRange">
            <el-input v-model.number="formData.sellRange" />
          </el-form-item>
          <el-form-item style="width: 48%" label="网格数" prop="grid">
            <el-input v-model="formData.grid" />
          </el-form-item>
          <el-form-item style="width: 48%" label="金额" prop="buyAmount">
            <el-input v-model="formData.buyAmount" />
          </el-form-item>
          <el-form-item style="width: 48%" label="开始时间" prop="startTime">
            <el-date-picker
              v-model="formData.startTime"
              type="date"
              size="default"
              placeholder="开始时间"
            />
          </el-form-item>
          <el-form-item style="width: 48%" label="结束时间" prop="endTime">
            <el-date-picker
              v-model="formData.endTime"
              type="date"
              size="default"
              placeholder="结束时间"
            />
          </el-form-item>
          <el-form-item style="width: 100%" label="">
            <el-button type="primary" @click="confirm(ruleForm)">确定</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="box block">
        <div class="item">
          盈利金额
          <span>{{ result.profitTotal }}</span>
        </div>
        <div class="item">
          买入
          <span>{{ result.buyNum }}</span>
        </div>
        <div class="item">
          卖出
          <span>{{ result.sellNum }}</span>
        </div>
        <div class="item">
          最大份额差
          <span>{{ result.maxDiff }}</span>
        </div>
        <div class="item">
          累积投入
          <span>{{ result.buyTotalMoney }}</span>
        </div>
        <div class="item">
          累积买入份额
          <span>{{ result.buyTotalLot }}</span>
        </div>
        <div class="item">
          累积卖出
          <span>{{ result.sellToalMoney }}</span>
        </div>
        <div class="item">
          累积卖出份额
          <span>{{ result.sellToTalLot }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const result = {}
const formData = {
  startTime: '',
  endTime: ''
}
</script>

<style lang="scss">
.el-input__inner {
  --el-input-inner-height: 32px;
}
.el-form--inline {
  gap: 20px;
  justify-content: space-between;
}
.el-form--inline .el-form-item {
  margin-right: 0px;
  margin-bottom: 0;
}
.block {
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #e4e4e5;
}
.grid-wrap {
  width: 100%;
  height: 100%;
  display: flex;
  gap: 16px;
  .left {
    flex: 1;
  }
  .right {
    width: 600px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
}
.form-box {
  // height: 200px;
}
.box {
  flex: 1;
  .item {
    height: 50px;
    flex-basis: 40%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    align-items: center;
    span {
      font-size: 22px;
      font-weight: 700px;
    }
  }
}
</style>
