import { Component } from 'react';
import '../css/blog.css';
import axios from 'axios';
import store from '../store/store';
import { withRouter } from 'react-router-dom';

class JoinForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      pw: '',
      r_pw: '',
      email: '',
      msg: '',
    };
  }

  join = (e) => {
    e.preventDefault();
    if (this.state.pw !== this.state.r_pw) {
      this.setState({
        msg: '비밀번호가 일치하지 않습니다.',
        pw: '',
        r_pw: '',
      });
      return false;
    }

    window.sessionStorage.setItem('j_id', this.state.id);
    window.sessionStorage.setItem('j_pw', this.state.pw);
    window.sessionStorage.setItem('j_email', this.state.email);

    axios
      .post('http://localhost:8081/api/member/auth', {
        email: this.state.email,
      })
      .then((res) => {
        console.log(res);
        //  window.sessionStorage.setItem('auth_code',res.data); -- 보안에 취약
        store.dispatch({ type: 'auth', authcode: res.data });
        this.props.history.push('/auth');
      })
      .catch((error) => console.log(error));
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
            <h1>User Register</h1>
            <br />
            <br />
            <form onSubmit={this.join}>
              <p style={{ color: 'red' }}>{this.state.msg}</p>
              <input
                type="text"
                id="inputtext"
                className="fadeIn second"
                name="id"
                value={this.state.id}
                onChange={this.TextChange}
                placeholder="아이디를 입력하세요."
                required
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
                placeholder="비밀번호를 입력하세요."
                required
              />
              <br />
              <br />
              <input
                type="password"
                id="inputtext"
                className="fadeIn third"
                name="r_pw"
                value={this.state.r_pw}
                onChange={this.TextChange}
                placeholder="비밀번호를 확인해주세요."
                required
              />
              <br />
              <br />
              <input
                type="email"
                id="inputtext"
                className="fadeIn third"
                name="email"
                value={this.state.email}
                onChange={this.TextChange}
                placeholder="인증받을 메일을 입력해주세요."
                required
              />
              <br />
              <br />
              <input
                type="submit"
                id="inputbtn"
                className="fadeIn fourth"
                value="Next"
              />
              <a href="/login" id="inputbtn" className="fadeIn fourth">
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

export default withRouter(JoinForm);
