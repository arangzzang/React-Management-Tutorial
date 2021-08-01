// import logo from './logo.svg';
import Customer from './components/Customer'
import React, {Component} from 'react';
import './App.css';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CircularProgress from '@material-ui/core/CircularProgress'; 
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
      margin : theme.spacing.unit * 2
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

  state ={//데이터가 변경 될 수 있을때.
    customers :"",
    completed : 0
  }

  componentDidMount(){//비동기적인 호출
    this.timer = setInterval(this.progress,20);//타이머 함수를 사용하여 progress()가 0.02초 마다 실행되게함.
    this.callApi()
      .then(res => this.setState({customers:res}))//데이터의 상태가 변화되고 상태를 감지해서 뷰를 알아서 갱신함.
      .catch(err => console.log(err))
  }

  callApi = async () => {//데이터를 불러옴
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  }

  progress = () => { // 애니메이션을 위한 하나의 함수를 명시함.
    const {completed} = this.state;
    this.setState({completed : completed >= 100 ? 0 : completed + 1});
  }
  render(){
    const { classes } = this.props;//변경될수 없는 데이터를 명시적으로 props로 받음
    return(
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>이미지</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>생년월일</TableCell>
              <TableCell>성별</TableCell>
              <TableCell>직업</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.customers ? this.state.customers.map(c =>{return(<Customer key={c.id}id={c.id}img={c.image}name={c.name}birthday={c.birthday}gender={c.gender}job={c.job}/>)
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
    );
  }
}

export default withStyles(styles)(App);
