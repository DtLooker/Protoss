import {Base} from '../../utils/base.js';

class Category extends Base{
    constructor(){
        super();
    }

    /* 获得所有分类 */
    getCategoryType(callback){
        var parmas = {
            url: 'category/all',
            sCallback: function(data){
                callback && callback(data);
            }
        };
        this.request(params);
    }

    /* 获得某种分类的商品 */
    // getProductsByCategory(id, callback){
    //     var params = {
    //         url: 'product/by_category?id=' + id,
    //         sCallback: function(data){
    //             callback && callback(data);
    //         }
    //     };
    //     this.request(params);
    // }
}

export {Category};