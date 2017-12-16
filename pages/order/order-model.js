
import {Base} from '../../utils/base.js';

class Order extends Base{
    constructor(){
        super();
        this._storageKeyName = 'newOrder';
    }

    //下订单
    doOrder(param, callback){
        var that = this;
        var allParams = {
            url: 'order',
            type: 'post',
            data: {products: param},
            sCallback: function(data){
                that.execSetStroageSync(true);
                callback && callback(data);
            },
            eCallback: function(){

            }
        };
        this.request(allParams);
    }

    /**
     * 拉起微信支付
     * params:
     * norderNumber - {int} 订单id
     * return
     * callback - {obj} 回调方法， 返回参数 0商品缺货等不能只读； 1支付失败或者支付取消； 2支付成功
     */
    execPay(orderNumber, callback){
        var allParams = {
            url: 'pay/pre_order',
            type: 'post',
            data: {id : orderNumber},
            sCallback: function(data){
                var timeStamp = data.timeStamp;
                if(timeStamp){//可以支付
                    wx.requestPayment({
                        timeStamp: timeStamp.toString(),
                        nonceStr: data.nonceStr,
                        package: data.package,
                        signType: data.signType,
                        paySign: data.paySign,
                        
                        success:function(){
                            callback && callback(2);
                        },

                        fail:function(){
                            callback && callback(1);
                        }
                    })
                }else{
                    callback && callback(0);
                }
            }
        };
        this.request(allParams);
    }

    //获取订单的具体内容
    getOrderInfoById(id, callback){
        var that = this;
        var allParams = {
            url: 'order/' + id,
            sCallback: function(data){
                callback && callback(data);
            },
            eCallback: function(){

            }
        };
        this.request(allParams);
    }

    //获得所有订单， pageIndex从1开始
    getOrders(pageIndex, callback){
        var allParams = {
            url: 'order/by_user',
            data: {page: pageIndex},
            type: 'get',
            sCallback: function(data){
                callback && callback(data);
            }
        };
        this.request(allParams);
    }

    //本地缓存保存，更新
    execSetStroageSync(data){
        wx.setStorageSync(this._storageKeyName, data);
    }
}

export {Order};