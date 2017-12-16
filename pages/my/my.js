// pages/my/my.js

import { Address } from '../../utils/address.js';
import { Order } from '../order/order-model.js';
import { My } from '../my/my-model.js';

var address = new Address();
var order = new Order();
var my = new My();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        pageIndex: 1,
        orderArr: [],
        isLoadedAll: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this._loadData();
        this._getAddressInfo();
    },

    _getAddressInfo: function () {
        address.getAddress((addressInfo) => {
            this._bindAddressInfo(addressInfo);
        });
    },

    _bindAddressInfo: function (addressInfo) {
        this.setData({
            addressInfo: addressInfo
        });
    },

    _loadData: function () {
        my.getUserInfo((data) => {
            this.setData({
                userInfo: data
            });
        });

        this._getOrders();
    },

    _getOrders: function () {
        order.getOrders(this.data.pageIndex, (res) => {
            var data = res.data;

            if (data.length > 0) {
                // this.data.orderArr.push(data);
                //合并数组
                this.data.orderArr.push.apply(this.data.orderArr, data);
                this.setData({
                    orderArr: this.data.orderArr
                });
            } else {
                this.data.isLoadedAll = true;
            }

        })
    },

    onReachBottom: function () {
        if (!this.data.isLoadedAll) {
            this.data.pageIndex++;
            this._getOrders();
        }
    },

    //显示订单具体信息
    showOrderDetailInfo: function (event) {
        var id = order.getDataSet(event, 'id');
        wx.navigateTo({
            url: '../order/order?from=order&id=' + id,
        })
    },

    rePay: function (event) {
        var id = order.getDataSet(event, 'id'),
            index = order.getDataSet(event, 'index');

        this._execPay(id, index);
    },

    _execPay: function (id, index) {
        var that = this;

        order.execPay(id, (statusCode) => {

            if (statusCode > 0) {
                var flag = statusCode == 2;

                //更新订单显示状态
                if (flag) {
                    that.data.orderArr[index].status = 2;
                    that.setData({
                        orderArr: that.data.orderArr
                    });
                }

                //跳转到  成功页面
                wx.navigateTo({
                    url: '../pay-result/pay-result?id=' + id + '&flag=' + flag + '&from=my',
                });

            } else {
                that.showTips('支付失败', '商品已经下架或库存不足');
            }
        })
    },

    /**
      * 提示框 
      * params:
      * title - {string}标题
      * content - {string}内容
      * flag - {bool} 是否跳转到 “我的页面”
      */
    showTips: function (title, content, flag) {
        wx.showModal({
            title: title,
            content: content,
            showCancel: false,
            success: function (res) {
                if (flag) {
                    wx.switchTab({
                        url: '/pages/my/my',
                    })
                }
            }
        })
    },

})