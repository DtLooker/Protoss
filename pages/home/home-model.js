import { Base } from '../../utils/base.js';

class Home extends Base {

    constructor() {
        super();
    }

    //微信所有的请求都是异步的
    //banner 请求
    getBannerData(id, callback) {
        var params = {
            url: 'banner/' + id,
            sCallback: function (res) {          
                callback && callback(res.items);
            }
        }
        this.request(params);
    }

    //theme专题栏请求
    getThemeData(callback){
        var params ={
            url: 'theme?ids=1,2,3',
            sCallback:function(res){
                callback && callback(res);
            }

        }
        this.request(params);
    }

    //最近新品请求
    getProductsData(callback) {
        var params = {
            url: 'product/recent',
            sCallback: function (res) {
                callback && callback(res);
            }

        }
        this.request(params);
    }
}

export { Home };