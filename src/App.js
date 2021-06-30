import logo from './logo.svg';
import Customer from './components/Customer'
import './App.css';

const customers =[{
  'id':1,
  'image':'http://placeimg.com/64/64/any',
  'name':'홍길동',
  'birthday':'961222',
  'gender':'남자',
  'job':'대학생'
},
{
  'id':2,
  'image':'http://placeimg.com/64/64/any',
  'name':'조현',
  'birthday':'930828',
  'gender':'남자',
  'job':'프로그래머'
},
{
  'id':3,
  'image':'http://placeimg.com/64/64/any',
  'name':'조쿤',
  'birthday':'120228',
  'gender':'남자',
  'job':'백수'
}]

function App() {
  return (
    <div>
      {/* 컴포넌트가 많아지면 반드시 태그로 감싸야 한다. 
      props의 값은 부모쪽에서 받아온 변수의 명과 같다.
      map함수는 반드시 key값을 사용해야한다.*/}

      {
        customers.map(c =>{
          return(
            <Customer
              key = {c.id}
              id={c.id}
              img={c.image}
              name={c.name}
              birthday ={c.birthday}
              gender = {c.gender}
              job = {c.job}
            />
          )
        })
      }
    </div>
  );
}

export default App;
