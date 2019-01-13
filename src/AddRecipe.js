import React, { Component } from 'react';
import styled from 'styled-components';
import {instanceContract, mapReponseToJSON} from './tronweb'
import * as Ethers from 'ethers';


class AddRecipe extends Component {
    render() {
    return (
      <Container>
        <Header>
          <H1>添加食谱</H1>
          <br />
          <br />
        </Header>
        <TodoListContainer>
          <InputText
            value={this.state.newItem}
            placeholder="食谱名称"
            onChange={e => this.setState({ newItem: e.target.value })}
          />
        
          <InputText
            value={this.state.newItem2}
            placeholder="食谱价格(元)"
            onChange={e => this.setState({ newItem2: e.target.value })}
          />
          
          <InputText
            value={this.state.newItem3}
            placeholder="制作顺序"
            onChange={e => this.setState({ newItem3: e.target.value })}
          />
         
    
          <SubmitBtn onClick={() => this.handleSubmit()}>
            提交
          </SubmitBtn>
          {this.state.recipeList.length > 0 &&
            <List>
              {this.state.recipeList.map((item, itemIndex) =>
                <TodoItem key={itemIndex}>
                  <ItemLabel>{item.a_name}</ItemLabel>
                  <ItemLabel>{item.a_price}</ItemLabel>
                  <ItemLabel>{item.a_commands}</ItemLabel>
                  <DestroyBtn
                    onClick={() => this.deleteTodoItem(itemIndex)}
                  >
                    ×
                  </DestroyBtn>
                </TodoItem>
              )}
            </List>
          }
          

          
        </TodoListContainer>
        <PendingContainer>
          <Pending
            active={this.state.pending}
            activeColor="red"
          >
            Transaction Pending
          </Pending>
          <Pending
            active={this.state.calling}
            activeColor="#5eef8b"
          >
            Reading Blockchain
          </Pending>
        </PendingContainer>
      </Container>
    );
  }

constructor(props) {
    super(props);

    this.state = {
        recipeList: [],
        newItem: '',
        newItem2: '',
        newItem3: '',
        pending: false,
        calling: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteTodoItem = this.deleteTodoItem.bind(this);
}

async componentWillMount() {
    this.recipe = await instanceContract();
    const recipeList = await this.getRecipes();
    this.setState({
        recipeList
    });
}

async handleSubmit() {
    


    this.setState({ pending: true });
    
    
    await this.recipe.addRecipeItem(this.state.newItem,this.state.newItem2,this.state.newItem3).send({
        shouldPollResponse: true,
        callValue: 0
    });
    
    const recipeList = await this.getRecipes();
    this.setState({
        recipeList,
        newItem: '',
        newItem2: '',
        newItem3: '',
        pending: false
    });
    
}

async getRecipes() {
    this.setState({
        calling: true
    });

    const recipeItemsResp = await this.recipe.getRecipeItems().call();
    console.log("=================");
    console.log(JSON.stringify(recipeItemsResp, 4, null));
    console.log("=================");
    const recipeList = mapReponseToJSON(
        recipeItemsResp, ['a_id', 'a_commands', 'a_cooker', 'a_name', 'a_price','a_total_price', 'a_total_amt'], 'arrayOfObject'
    );
    this.setState({
        calling: false
    });
    return recipeList;
}

async deleteTodoItem(position) {
    this.setState({
        pending: true
    });
    await this.todoList.deleteTodoItem(position).send({
        shouldPollResponse: true,
        callValue: 0
    });
    
    const todoItems = await this.getTodoItems();
    this.setState({
        todoItems,
        pending: false
    });
}
}

export default AddRecipe;


// Ethers.formatBytes32String
// Ethers.parseBytes32String

function stringToBytes(str){
	var bytes = new Array();
	for (var i = 0; i < str.length; i++) {
		var c = str.charCodeAt(i);
		var s = parseInt(c).toString(2);
		if(c >= parseInt("000080",16) && c <= parseInt("0007FF",16)){
			var af = "";
			for(var j = 0; j < (11 - s.length); j++){
				af += "0";
			}
			af += s;
			var n1 = parseInt("110" + af.substring(0,5),2);
			var n2 = parseInt("110" + af.substring(5),2);
			if(n1 > 127) n1 -= 256;
			if(n2 > 127) n2 -= 256;
			bytes.push(n1);
			bytes.push(n2);
		}else if(c >= parseInt("000800",16) && c <= parseInt("00FFFF",16)){
			var af = "";
			for(var j = 0; j < (16 - s.length); j++){
				af += "0";
			}
			af += s;
			var n1 = parseInt("1110" + af.substring(0,4),2);
			var n2 = parseInt("10" + af.substring(4,10),2);
			var n3 = parseInt("10" + af.substring(10),2);
			if(n1 > 127) n1 -= 256;
			if(n2 > 127) n2 -= 256;
			if(n3 > 127) n3 -= 256;
			bytes.push(n1);
			bytes.push(n2);
			bytes.push(n3);
		}else if(c >= parseInt("010000",16) && c <= parseInt("10FFFF",16)){
			var af = "";
			for(var j = 0; j < (21 - s.length); j++){
				af += "0";
			}
			af += s;
			var n1 = parseInt("11110" + af.substring(0,3),2);
			var n2 = parseInt("10" + af.substring(3,9),2);
			var n3 = parseInt("10" + af.substring(9,15),2);
			var n4 = parseInt("10" + af.substring(15),2);
			if(n1 > 127) n1 -= 256;
			if(n2 > 127) n2 -= 256;
			if(n3 > 127) n3 -= 256;
			if(n4 > 127) n4 -= 256;
			bytes.push(n1);
			bytes.push(n2);
			bytes.push(n3);
			bytes.push(n4);
		}else{
			bytes.push(c & 0xff);
		}
  }

  for (;bytes.length < 32;) {
    bytes.push(null)

  }
  
  return bytes;
}



 function byteToString(arr) {
  if(typeof arr === 'string') {
    return arr;
  }
  var str = '',
    _arr = arr;
  for(var i = 0; i < _arr.length; i++) {
    var one = _arr[i].toString(2),
      v = one.match(/^1+?(?=0)/);
    if(v && one.length == 8) {
      var bytesLength = v[0].length;
      var store = _arr[i].toString(2).slice(7 - bytesLength);
      for(var st = 1; st < bytesLength; st++) {
        store += _arr[st + i].toString(2).slice(2);
      }
      str += String.fromCharCode(parseInt(store, 2));
      i += bytesLength - 1;
    } else {
      str += String.fromCharCode(_arr[i]);
    }
  }
  return str;
}







const Container = styled.div `
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Header = styled.div `
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const H1 = styled.h1 `
  color: #ead7d7;
  font-size: 100px;
  margin-bottom: -20px;
`;

const H2 = styled.h2 `
  color: #d2bebe;
  font-size: 35px;
`;

const TodoListContainer = styled.section `
  background: #fff;
  position: relative;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
`;

const InputText = styled.input `
  padding: 16px 16px 16px 60px;
  border: none;
  background: rgba(0, 0, 0, 0.003);
  box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
  width: 200px;

  position: relative;
  margin: 0;
  font-size: 20px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;

  &:focus {
    outline: none;
  }
`;

const List = styled.ul `
  width: 440px;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const TodoItem = styled.li `
  position: relative;
  width: 800px;
  font-size: 24px;
  border-bottom: 1px solid #ededed;

  &:last-child {
    border-bottom: none;
  }
`;

const ItemLabel = styled.label `
  white-space: pre-line;
  word-break: break-all;
  margin-left: 110px;
  width: 140px;
  display:block;
  float:left;
  align:center;
 
  line-height: 1.2;
  transition: color 0.4s;
`;

const Button = styled.button `
  margin: 0;
  padding: 0;
  border: 0;
  background: none;
  font-size: 100%;
  vertical-align: baseline;
  font-family: inherit;
  font-weight: inherit;
  color: inherit;
  appearance: none;
  font-smoothing: antialiased;
  outline: none;
`;

const SubmitBtn = styled(Button)`
//   position: absolute;
float:right;
  top: 0;
  right: -50px;
  bottom: 0;
  width: 200px;
  height: 40px;
  margin: auto 0;
  font-size: 30px;
  color: #cc9a9a;
  margin-bottom: 11px;
  transition: color 0.2s ease-out;
  cursor: pointer;
`;

const DestroyBtn = styled(Button)`
  position: absolute;
  top: 0;
  right: -50px;
  bottom: 0;
  width: 40px;
  height: 40px;
  margin: auto 0;
  font-size: 30px;
  color: #cc9a9a;
  margin-bottom: 11px;
  transition: color 0.2s ease-out;
  cursor: pointer;
`;
const PendingContainer = styled.div `
  position: fixed;
  top: 1px;
  font-size: 20px;
  right: 1px;
`;

const Pending = styled.div `
  color: ${props => props.active ? props.activeColor || 'red' : '#c7c7c7'};
`;