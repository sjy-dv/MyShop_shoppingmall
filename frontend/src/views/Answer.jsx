import { Component } from 'react';
import '../css/qform.css';
import '../css/blog.css';
import axios from 'axios';

class Answer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
    };
  }

  sendBackend() {
    axios
      .post('http://localhost:8081/api/question/adminanswer', {
        id: window.sessionStorage.getItem('user_id'),
        title: this.state.title,
        content: this.state.content,
        code: window.sessionStorage.getItem('contentid'),
      })
      .then((res) => {
        console.log(res);
        this.setState({
          title: '',
          content: '',
        });
        window.sessionStorage.removeItem('user_id');
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .post('http://localhost:8081/api/question/answer_ok', {
        idx: window.sessionStorage.getItem('contentid'),
      })
      .catch((err) => {
        console.log(err);
      });
  }

  send = (e) => {
    e.preventDefault();
    this.sendBackend();
    alert('답변이 완료되었습니다.');
    window.location.href = '/manage';
  };

  TextChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  };

  history_go() {
    window.history.go(-1);
  }
  render() {
    return (
      <div className="wrapper fadeInDown">
        <div id="formContent">
          <div className="container-contact100">
            <div className="wrap-contact100">
              <form
                className="contact100-form validate-form"
                onSubmit={this.send}
              >
                <span className="contact100-form-title">답변하기</span>
                <div className="wrap-input100 validate-input">
                  <input
                    className="input100"
                    type="text"
                    name="title"
                    value={this.state.title}
                    onChange={this.TextChange}
                    required
                    placeholder="답변 제목"
                  />
                </div>
                <br></br>
                <div className="wrap-input100 validate-input">
                  <textarea
                    class="input100"
                    name="content"
                    value={this.state.content}
                    onChange={this.TextChange}
                    required
                    placeholder="답변 내용"
                  ></textarea>
                </div>
                <br></br>
                <div className="container-contact100-form-btn">
                  <button className="contact100-form-btn" type="submit">
                    <span>
                      <i
                        className="fa fa-paper-plane-o m-r-6"
                        aria-hidden="true"
                      ></i>
                      Send
                    </span>
                  </button>
                </div>
                <br></br>
                <br></br>
                <div className="container-contact100-form-btn">
                  <a className="contact100-form-btn" onClick={this.history_go}>
                    <span>
                      <i
                        className="fa fa-paper-plane-o m-r-6"
                        aria-hidden="true"
                      ></i>
                      취 소
                    </span>
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Answer;
