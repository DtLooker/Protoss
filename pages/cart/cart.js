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
        var len = data.length,

            //所需要计算的总价格，需要排除未选中商品
            account = 0;

        //购买商品总个数
        selectedCounts = 0;

        //购买商品种类的总数
        selectedTypeCounts = 0;

        let multiple = 100;

        for (let i = 0; i < len; i++) {
            //避免js中 0.05+0.01 = 0.060 000 000 000 000 005的问题 乘以100*100
            if (data[i].selectStatus) {
                account += data[i].counts * multiple * Number(data[i].price) * multiple;
                selectedCounts += data[i].counts;
                selectedTypeCounts++;
            }
            return {
                selectedCounts: selectedCounts,
                selectedTypeCounts: selectedTypeCounts,
                account: account / (multiple * multiple)
            }
        }
    }

})