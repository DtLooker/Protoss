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

    //离开页面的时候对用户所做操作进行统一保存
    onHide:function(options){
        //没有此处理，用户操作后，离开此页面选择，操作数据不会被保存   
        cart.execSetStorageSync(this.data.cartData)
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
                //Number() 把对象的值转换为数字
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
    },

    /**
     * 更改商品
     */
    changeCounts: function (event) {
      
        var id = cart.getDataSet(event, 'id'),
            type = cart.getDataSet(event, 'type'),
            index = this._getProductIndexById(id),
            counts = 1;

        if(type == 'add'){
            cart.addCounts(id);
        }else{
            counts = -1;
            cart.cutCounts(id);
        }
        this.data.cartData[index].counts += counts;
        this._resetCartData();
    },

    delete:function(event){
        var id = cart.getDataSet(event, 'id'),
            index = this._getProductIndexById(id);
        //删除某一项商品
        this.data.cartData.splice(index, 1);splice()//splice() 方法向/从数组中添加/删除项目，然后返回被删除的项目。

            this._resetCartData();
            cart.delete(id);
    }


})