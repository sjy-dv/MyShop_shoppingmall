import { Component } from 'react';
import '../css/blog.css';
import axios from 'axios';
import store from '../store/store';
import { withRouter } from 'react-router-dom';

class JoinForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pw: '',
      r_pw: '',
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

    axios
      .post('http://localhost:8081/api/member/resetpassword', {
        pw: this.state.pw,
        id: window.sessionStorage.getItem('f_id'),
        email: window.sessionStorage.getItem('f_email'),
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => console.log(error));
    alert('비밀번호가 재설정되었습니다.');
    window.location.href = '/login';
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
            <h1>Reset Password</h1>
            <br />
            <br />
            <form onSubmit={this.join}>
              <p style={{ color: 'red' }}>{this.state.msg}</p>
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
                type="submit"
                id="inputbtn"
                className="fadeIn fourth"
                value="Submit"
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
