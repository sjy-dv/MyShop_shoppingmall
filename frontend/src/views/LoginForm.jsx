import { Component } from 'react';
import '../css/blog.css';
import axios from 'axios';
import store from '../store/store';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      pw: '',
      message: '',
      check: 0,
      count: 0,
    };
  }

  sendBackend() {
    console.log(this.state.check);
    axios
      .post('http://localhost:8081/api/member/login', {
        id: `${this.state.id}`,
        password: `${this.state.pw}`,
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        this.setState({ check: res.data }, () => {
          console.log(this.state.check);
        });
        if (res.data.token) {
          console.log(res.data.token);
          store.dispatch({ type: 'login', id: this.state.id });
          window.sessionStorage.setItem('id', this.state.id);
          window.localStorage.setItem('x_auth', res.data.token);
          this.props.history.push('/');
        } else if (res.data === 2) {
          this.setState({ message: '비밀번호가 일치하지 않습니다.' });
        } else {
          this.setState({
            message: '일치하는 계정이 없습니다.',
          });
        }
      })
      .catch((error) => console.log(error));
  }

  login = (e) => {
    e.preventDefault();
    this.sendBackend();
    console.log(this.state.check);
  };

  TextChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  };
  render() {
    return (
      <>
        <br />
        <br />
        <br />
        <br />
        <div className="wrapper fadeInDown">
          <div id="formContent">
            <br></br>
            <h1>User Login</h1>
            <br />
            <form onSubmit={this.login}>
              <p style={{ color: 'red' }}>{this.state.message}</p>
              <input
                type="text"
                id="inputtext"
                className="fadeIn second"
                name="id"
                value={this.state.id}
                onChange={this.TextChange}
                required
                placeholder="아이디를 입력하세요."
              />
              <br />
              <br />
              <input
                type="password"
                id="inputtext"
                className="fadeIn third"
                name="pw"
                value={this.state.pw}
                onChange={this.TextChange}
                required
                placeholder="비밀번호를 입력하세요."
              />
              <br />
              <br />
              <input
                type="submit"
                id="inputbtn"
                className="fadeIn fourth"
                value="LogIn"
              />
              <a href="/" id="inputbtn" className="fadeIn fourth">
                Back
              </a>
            </form>
            <div id="formFooter">
              <a className="underlineHover" href="/forget">
                비밀번호를 잊어버리셨나요 ?
              </a>
              <br></br>
              <a className="underlineHover" href="/join">
                아직 회원이 아니신가요 ?
              </a>
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
      </>
    );
  }
}

export default LoginForm;
