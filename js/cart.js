var vm = new Vue({
    el:"#app",
    data:{
        productList:[],
        totalMoney:0,
        checkAllFlag:false,
        totalPrice:0,
        delFlag:false,
        curProduct:''
    },
    filters:{
        formatMoney(value){
            return "￥ "+value.toFixed(2);
        }
        
    },
    mounted:function(){
        this.$nextTick(function(){
            vm.cartView();
        });    
    },
    methods:{
        cartView:function(){
            var _this=this;
            this.$http.get("data/cartData.json",{"id":123}).then(res=>{//ES6的箭头函数，使得函数作用域域外层相同，不再是局部函数的局部作用域
                this.productList=res.data.result.list;
                this.totalMoney=res.data.result.totalMoney;
            });
        },
        changeMoney:function(item,type){
            if(type==-1&&item.productQuantity>1){
                item.productQuantity--;
            }else if(type==1){
                item.productQuantity++;
            };
            this.calcPrice();
        
        },
        selected:function(item){
            if(typeof item.checked=='undefined'){
                Vue.set(item,'checked',true);
                //this.$set(item,checked,true);
            }else{
                item.checked=!item.checked;
            };
            this.calcPrice();
            /*单选和全选的联动 */
            var checkednum=0;
            for(var i=0;i<this.productList.length;i++){
                if(this.productList[i].checked){
                    checkednum++;
                }
            }
            if(checkednum==this.productList.length){
                this.checkAllFlag=true;
            }else{
                this.checkAllFlag=false;
            }
        },
        checkAll:function(flag){
            this.checkAllFlag=flag;
            var _this=this;
            this.productList.forEach(function(item,index){
				if(typeof item.checked == "undefined"){
					_this.$set(item,'checked',_this.checkAllFlag);
                }else{
					item.checked = _this.checkAllFlag;
				}
            });
            
            this.calcPrice();
        },
        calcPrice:function(){
            var _this=this;
            this.totalPrice=0;
            this.productList.forEach(function(item,index){
                if(item.checked){
                    _this.totalPrice+=item.productPrice*item.productQuantity;
                }
            });
        },
        delConfirm:function(item){
            this.delFlag=true;
            this.curProduct=item;
        },
        delProduct:function(){
            var index=this.productList.indexOf(this.curProduct);
            this.productList.splice(index,1);
            this.delFlag=false;
            this.calcPrice();
        }  
    }
});


Vue.filter("money",function(value,type){
    return "￥ "+value.toFixed(2);
}
)