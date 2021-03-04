import { Component } from 'react';
import '../css/blog.css';
import axios from 'axios';
import store from '../store/store';

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: '',
      message: '',
    };
  }
  componentDidMount() {
    if (store.getState().authcode === '') {
      window.location.href = '/';
    }
  }

  auth = (e) => {
    e.preventDefault();
    if (store.getState().authcode != this.state.auth) {
      this.setState({
        message: '인증키가 일치하지 않습니다.',
        auth: '',
      });
      return false;
    } else {
      axios.post('http://localhost:8081/api/member/signup', {
        id: window.sessionStorage.getItem('j_id'),
        password: window.sessionStorage.getItem('j_pw'),
        email: window.sessionStorage.getItem('j_email'),
      });
      alert('회원가입이 완료되었습니다.');
      window.location.href = '/login';
    }
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
            <h1>Email Auth</h1>
            <br />
            <form onSubmit={this.auth}>
              <p style={{ color: 'red' }}>{this.state.message}</p>
              <input
                type="text"
                id="inputtext"
                className="fadeIn second"
                name="auth"
                value={this.state.auth}
                onChange={this.TextChange}
                required
                placeholder="인증키를 입력하세요."
              />
              <br />
              <br />
              <input
                type="submit"
                id="inputbtn"
                className="fadeIn fourth"
                value="Join"
              />
              <a href="/" id="inputbtn" className="fadeIn fourth">
                Back
              </a>
            </form>
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

export default Auth;
