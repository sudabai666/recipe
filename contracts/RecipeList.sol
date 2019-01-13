pragma solidity ^0.4.22;

// v0.03 修改js时间不够，把4个合约放进单例，数组遍历

/// @title 一篇菜谱
contract RecipeList {
    //一个订单
	struct Order {
		address creator;//订菜客户或炒菜的厨师
		uint price_now; //菜价
		uint pay;       //支付菜价
		uint amount;    //份数
    }

	//一篇菜谱
	struct Recipe {
		uint id ;
		//uint ingredient;//菜配料表
		uint commands;  //炒菜指令序列
		address cooker ;   //上传菜谱的厨师
		uint name;      //菜名
		uint price;        //菜价
		uint total_price;  //总菜价
		uint total_amt;    //订购总数
		//uint flover;       //点赞鲜花数
		//uint egg;          //吐槽鸡蛋数
	}
	
	Recipe[] public recipeItems; //菜谱清单
	uint public maxId ;
	
	Order[] public orders;    //购买记录


    //新建一篇菜谱
    function addRecipeItem(
		uint _name,
		uint _price,
		//uint _ingredient,
		uint _commands
	) public returns (bool success){
		maxId = maxId +1 ;
		Recipe memory item;
		
        item.id = maxId;
		item.cooker = msg.sender;//上传菜谱的厨师
		item.name = _name;        //菜名
		item.price = _price;      //菜价
		item.total_price =0 ;     //总菜价
		item.total_amt = 0 ;      //订购总数
		//item.ingredient = _ingredient;//菜配料表
		item.commands = _commands ;  //炒菜指令序列
		
		recipeItems.push(item);
		return true;
    }
	function getRecipeItems() public constant returns (
		uint[],
		//uint[],
		uint[],
		address[],
		uint[],
		uint[],
		//uint[],
		uint[]
		//uint[],
		//uint[]
	
	){
		uint length = recipeItems.length;

		uint[] memory a_id = new uint[](length);
		//uint[] memory a_ingredient= new uint[](length);//菜配料表
		uint[] memory a_commands  = new uint[](length);//炒菜指令序列
		address[] memory a_cooker    = new address[](length);//上传菜谱的厨师
		uint[] memory a_name      = new uint[](length);//菜名
		uint[] memory a_price        = new uint[](length);//菜价
		//uint[] memory a_total_price  = new uint[](length);//总菜价
		uint[] memory a_total_amt    = new uint[](length);//订购总数
		//uint[] memory a_flover       = new uint[](length);//点赞鲜花数
		//uint[] memory a_egg          = new uint[](length);//吐槽鸡蛋数

		for (uint i = 0; i < length; i++) {
			a_id[i] = recipeItems[i].id;
			//a_ingredient[i] = recipeItems[i].ingredient; //菜配料表
			a_commands[i] = recipeItems[i].commands;   //炒菜指令序列
			a_cooker[i] = recipeItems[i].cooker;     //上传菜谱的厨师
			a_name[i] = recipeItems[i].name;       //菜名
			a_price[i] = recipeItems[i].price;      //菜价
			//a_total_price[i] = recipeItems[i].total_price;//总菜价
			a_total_amt[i] = recipeItems[i].total_amt;  //订购总数
			//a_flover[i] = recipeItems[i].flover;     //点赞鲜花数
			//a_egg[i] = recipeItems[i].egg;         //吐槽鸡蛋数
		}

        return (
			a_id,
			//a_ingredient, //菜配料表
			a_commands,   //炒菜指令序列
			a_cooker,     //上传菜谱的厨师
			a_name,       //菜名
			a_price,      //菜价
			//a_total_price,//总菜价
			a_total_amt  //订购总数
			//a_flover,     //点赞鲜花数
			//a_egg         //吐槽鸡蛋数
		);
	}
	/*
  
    // 调整价格
    function changePrice(uint _id,uint _price) public {
        require(
            msg.sender == recipeItems[_id].cooker,
            "Only cooker can change price ."
        );
        recipeItems[_id].price = _price;
    }
	
    // 点赞鲜花
    function giveFlover(uint _id) public {
		recipeItems[_id].flover = recipeItems[_id].flover +1 ;
    }
	
    // 吐槽鸡蛋
    function givEgg(uint _id) public {
        recipeItems[_id].egg = recipeItems[_id].egg + 1;
    }
	/////////////////////////////// TODO
	event Purchase();
    // 购买
    function buy(uint _amount) public payable{
        require(
            revoked,
            "The recipe already revoked."
        );
        require(
            price*_amount == msg.value,
            "pay amount is incorrect."
        );
		cooker.transfer(msg.value);
		total_price = total_price + msg.value ;//总菜价
		total_amt   = total_amt   + _amount;   //订购总数
		orders.push(Order({
			creator   : msg.sender,//订菜客户或炒菜的厨师
			price_now : price,     //菜价
			pay       : msg.value, //支付菜价
			amount    :_amount     //份数
		}));
		emit Purchase();
    }
	
	*/
   // Read function to fetch variable message
    function getRecipeInfo(uint _id) public view returns (
		//uint,
		uint,
		address,
		uint,
		uint,
		//bool,
		uint,
		uint
		//uint,
		//uint
	
	) {
        return (
			//recipeItems[_id].ingredient, //菜配料表
			recipeItems[_id].commands,   //炒菜指令序列
			recipeItems[_id].cooker,     //上传菜谱的厨师
			recipeItems[_id].name,       //菜名
			recipeItems[_id].price,      //菜价
			//recipeItems[_id].revoked,    //作废否
			recipeItems[_id].total_price,//总菜价
			recipeItems[_id].total_amt  //订购总数
			//recipeItems[_id].flover,     //点赞鲜花数
			//recipeItems[_id].egg         //吐槽鸡蛋数
		);
    }
	
	function() public { revert(); }
}