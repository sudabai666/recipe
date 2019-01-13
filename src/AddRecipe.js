import React, { Component } from 'react';
import styled from 'styled-components';
import {instanceContract, mapReponseToJSON} from './tronweb'


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
          <br />
          <InputText
            value={this.state.newItem2}
            placeholder="食谱价格，单位元"
            onChange={e => this.setState({ newItem2: e.target.value })}
          />
          <br />
          <InputText
            value={this.state.newItem3}
            placeholder="制作顺序"
            onChange={e => this.setState({ newItem3: e.target.value })}
          />
          <br />
          <SubmitBtn onClick={() => this.handleSubmit}>
            提交
          </SubmitBtn>

          {/* {this.state.recipeList.length > 0 &&
            <List>
              {this.state.recipeList.map((item, itemIndex) =>
                <TodoItem key={itemIndex}>
                  <ItemLabel>{item.value}</ItemLabel>
                  <DestroyBtn
                    onClick={() => this.deleteTodoItem(itemIndex)}
                  >
                    ×
                  </DestroyBtn>
                </TodoItem>
              )}
            </List>
          } */}
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

async handleSubmit({ key }) {
    if (key !== 'Enter') return;
    console.info("ooooooooooooooo")

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
    // this.setState({
    //     calling: true
    // });

    // const recipeItemsResp = await this.recipe.getRecipeItems.call();
    // console.log(JSON.stringify(recipeItemsResp, 4, null));
    // const recipeList = mapReponseToJSON(
    //     recipeItemsResp, ['a_id', 'a_commands', 'a_cooker', 'a_name', 'a_price','a_total_price', 'a_total_amt'], 'arrayOfObject'
    // );
    // this.setState({
    //     calling: false
    // });
    // return recipeList;
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
  width: 440px;

  position: relative;
  margin: 0;
  font-size: 24px;
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
  font-size: 24px;
  border-bottom: 1px solid #ededed;

  &:last-child {
    border-bottom: none;
  }
`;

const ItemLabel = styled.label `
  white-space: pre-line;
  word-break: break-all;
  padding: 15px 60px 15px 15px;
  margin-left: 45px;
  display: block;
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