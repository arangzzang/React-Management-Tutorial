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
import { withStyles } from  '@material-ui/core/styles';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';


const styles = theme => ({
    root:{
        width:'100%',
        minWidth: 1080
    },
    progress : {
      margin : theme.spacing(2)
    },
    menu: {
      marginTop: 15,
      marginBottom: 15,
      display: 'flex',
      justifyContent: 'center'
      },
      paper: {
      marginLeft: 18,
      marginRight: 18
      },
      progress: {
      margin: theme.spacing.unit * 2
      },
      grow: {
      flexGrow: 1,
      },
      tableHead: {
      fontSize: '1.0rem'
      },
      menuButton: {
      marginLeft: -12,
      marginRight: 20,
      },
      title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
      display: 'block',
      },
      },
      search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
      },
      },
      searchIcon: {
      width: theme.spacing.unit * 9,
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      },
      inputRoot: {
      color: 'inherit',
      width: '100%',
      },
      inputInput: {
      paddingTop: theme.spacing.unit,
      paddingRight: theme.spacing.unit,
      paddingBottom: theme.spacing.unit,
      paddingLeft: theme.spacing.unit * 10,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
      width: 200,
      },
      },
      }
})
//app bar
// const Search = styled('div')(({ theme }) => ({
//   position: 'relative',
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.white, 0.15),
//   '&:hover': {
//     backgroundColor: alpha(theme.palette.common.white, 0.25),
//   },
//   marginLeft: 0,
//   width: '100%',
//   [theme.breakpoints.up('sm')]: {
//     marginLeft: theme.spacing(1),
//     width: 'auto',
//   },
// }));

// const SearchIconWrapper = styled('div')(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: '100%',
//   position: 'absolute',
//   pointerEvents: 'none',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: 'inherit',
//   '& .MuiInputBase-input': {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create('width'),
//     width: '100%',
//     [theme.breakpoints.up('sm')]: {
//       width: '12ch',
//       '&:focus': {
//         width: '20ch',
//       },
//     },
//   },
// }));
//----------------------------

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
    const cellList = ["설정","번호","프로필 이미지", "이름","생년월일","성별","직업"]
    return(
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
              고객 관리 시스템
            </Typography>
            <div className={classes.grow} />
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="검색하기"
                classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
                }}
              />
          </div>
          </Toolbar>
        </AppBar>
        <div className={classes.menu}>
          <CustomerAdd stateRefresh={this.stateRefresh}/>
        </div>
        <Paper className={classes.paper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                {cellList.map(c => {
                  return <TableCell className={classes.tableHead}>{c}</TableCell>
                })}
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
      </div>
    );
  }
}

export default withStyles(styles)(App);
