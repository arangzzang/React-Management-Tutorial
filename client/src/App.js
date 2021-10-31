// import logo from './logo.svg';
import Customer from './components/Customer';
import CustomerAdd from './components/CustomerAdd';
import React, {Component} from 'react';
import './App.css';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CircularProgress from '@material-ui/core/CircularProgress'; 
// eslint-disable-next-line
import { withStyles,createMuiTheme } from  '@material-ui/core/styles';

const styles = theme => ({
    root:{
        width:'100%',
        marginTop:theme.spacing(3),
        overflowX:"auto"
    },
    table:{
        minWidth: 1080
    },
    progress : {
      margin : theme.spacing(2)
    }
})
/*
호출 순서
1) constructor()
 
2) componentWillMount()

3) render()

4) componentDidMount()


props or state => shouldComponentUpdate()
*/
// function App() {//왜안되갑자기
class App extends Component {

  // state ={//state는 데이터가 컴포넌트내에서 변경 될 수 있을때 사용함.
  //   customers :"",
  //   completed : 0
  // }
  constructor(props) {
    super(props);
    this.state = {
      customers: '',
      completed: 0
    }
  }

  stateRefresh = () => {
    this.setState({
      customers: '',
      completed: 0
    })
    this.callApi()//실제로 데이터를 가져오는 구간
      .then(res => this.setState({customers:res}))//데이터의 상태가 변화되고 상태를 감지해서 뷰를 알아서 갱신함.
      .catch(err => console.log(err))
  }

  //api서버에 접근해서 데이터를 받아오는 작업을하는 함수
  componentDidMount(){//비동기적인 호출
    this.timer = setInterval(this.progress,20);//타이머 함수를 사용하여 progress()가 0.02초 마다 실행되게함.
    this.callApi()//실제로 데이터를 가져오는 구간
      .then(res => this.setState({customers:res}))//데이터의 상태가 변화되고 상태를 감지해서 뷰를 알아서 갱신함.
      .catch(err => console.log(err))
  }

  //비동기적으로 내용을 수행 할 수 있도록 해줌
  callApi = async () => {
    const response = await fetch('/api/customers');//접속하고자 하는 api주소
    const body = await response.json();
    return body;
  }

  progress = () => { // 애니메이션을 위한 하나의 함수를 명시함.
    const {completed} = this.state;
    this.setState({completed : completed >= 100 ? 0 : completed + 1});
  }
  render(){
    const { classes } = this.props;//props는 변경될수 없는 데이터를 명시할때 사용함.
    return(
      <div>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                {/* <TableCell>설정</TableCell> */}
                <TableCell>번호</TableCell>
                <TableCell>이미지</TableCell>
                <TableCell>이름</TableCell>
                <TableCell>생년월일</TableCell>
                <TableCell>성별</TableCell>
                <TableCell>직업</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.customers ? this.state.customers.map(c =>{//네트워크상에서 현재 state값은 비워져있기 때문에 삼항 연산자를 사용함.
                return(
                  <Customer stateRefresh={this.stateRefresh} key={c.id} id={c.id} img={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job}/>
                  )
              }):
              <TableRow>
                <TableCell colSpan="6" align="center">
                  <CircularProgress className={classes.progress} varinant="determinate" value={this.state.completed}/>
                </TableCell>
              </TableRow>
              }
          </TableBody>
          </Table>
        </Paper>
        <CustomerAdd stateRefresh={this.stateRefresh}/>
      </div>
    );
  }
}

export default withStyles(styles)(App);
