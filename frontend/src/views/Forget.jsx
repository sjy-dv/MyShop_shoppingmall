import { Component } from 'react';
import '../css/blog.css';
import axios from 'axios';
import store from '../store/store';
import { withRouter } from 'react-router-dom';

class Forget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      email: '',
      msg: '',
    };
  }

  join = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:8081/api/member/idcheck', {
        id: this.state.id,
        email: this.state.email,
      })
      .then((res) => {
        if (res.data.result) {
          //id가 없다고 판단이 되면
          this.setState({
            msg: '가입된 정보가 없습니다.',
            id: '',
            email: '',
          });
          return false;
        } else {
          axios
            .post('http://localhost:8081/api/member/authpassword', {
              email: this.state.email,
            })
            .then((res) => {
              console.log(res);
              //  window.sessionStorage.setItem('auth_code',res.data); -- 보안에 취약

              window.sessionStorage.setItem('f_id', this.state.id);
              window.sessionStorage.setItem('f_email', this.state.email);
              store.dispatch({ type: 'auth', authcode: res.data });
              this.props.history.push('/newpw');
            })
            .catch((error) => console.log(error));
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
            <h1>Forget Password</h1>
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
                placeholder="가입하신 아이디를 입력해주세요."
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
                placeholder="가입하신 메일을 입력해주세요."
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

export default withRouter(Forget);
