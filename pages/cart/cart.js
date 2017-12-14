// pages/cart/cart.js

import { Cart } from 'cart-model.js';

var cart = new Cart();

Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        var cartData = cart.getCartDataFromLocal();
        // var countsInfo = cart.getCartTotalCounts(true);
        var cal = this._calcTotalAccountAndCounts(cartData);

        this.setData({
            selectedCounts: cal.selectedCounts,
            selectedTypeCounts: cal.selectedTypeCounts,
            account: cal.account,
            cartData: cartData
        });
    },

    _calcTotalAccountAndCounts: function (data) {
        var len = data.length;
        //所需要计算的总价格，需要排除未选中商品
        var account = 0;
        //购买商品总个数
        var selectedCounts = 0;
        //购买商品种类的总数
        var selectedTypeCounts = 0;

        let multiple = 100;

        for (let i = 0; i < len; i++) {
            //避免js中 0.05+0.01 = 0.060 000 000 000 000 005的问题 乘以100*100
            if (data[i].selectStatus) {
                account += data[i].counts * multiple * Number(data[i].price) * multiple;
                selectedCounts += data[i].counts;
                selectedTypeCounts++;
            }
        }
        return {
            selectedCounts: selectedCounts,
            selectedTypeCounts: selectedTypeCounts,
            account: account / (multiple * multiple)
        }
    },

    //点击checkbox 
    toggleSelect: function (event) {
        var id = cart.getDataSet(event, 'id'),
            status = cart.getDataSet(event, 'status'),
            index = this._getProductIndexById(id);

        this.data.cartData[index].selectStatus = !status;
        this._resetCartData();
    },

    //是否点击全选
    toggleSelectAll: function (event) {

        //布尔值status
        var status = cart.getDataSet(event, 'status') == 'true';

        var data = this.data.cartData,
            len = data.length;
        for (let i = 0; i < len; i++) {
            data[i].selectStatus = !status;
        }
        this._resetCartData();
    },

    _resetCartData: function () {
        //重新计算总金额和商品总数
        var newData = this._calcTotalAccountAndCounts(this.data.cartData);
        this.setData({
            account: newData.account,
            selectedCounts: newData.selectedCounts,
            selectedTypeCounts: newData.selectedTypeCounts,
            cartData: this.data.cartData
        });
    },



    /* 根据商品id得到 商品所在在下标 */
    _getProductIndexById: function (id) {
        var data = this.data.cartData,
            len = data.length;
        for (let i = 0; i < len; i++) {
            if (data[i].id == id) {
                return i;
            }
        }
    }

})