import { Component } from 'react';
import '../css/qform.css';
import '../css/blog.css';
import axios from 'axios';

class QuestionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
    };
  }

  sendBackend() {
    axios
      .post('http://localhost:8081/api/question/ask', {
        id: window.sessionStorage.getItem('id'),
        title: this.state.title,
        content: this.state.content,
      })
      .then((res) => {
        console.log(res);
        this.setState({
          title: '',
          content: '',
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  send = (e) => {
    e.preventDefault();
    this.sendBackend();
    alert('문의가 접수되었습니다.');
    window.location.reload();
  };

  TextChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  };
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
                <span className="contact100-form-title">문의하기</span>
                <div className="wrap-input100 validate-input">
                  <input
                    className="input100"
                    type="text"
                    name="title"
                    value={this.state.title}
                    onChange={this.TextChange}
                    required
                    placeholder="문의할 제목을 입력해주세요."
                  />
                </div>
                <br></br>
                <div className="wrap-input100 validate-input">
                  <textarea
                    className="input100"
                    name="content"
                    value={this.state.content}
                    onChange={this.TextChange}
                    required
                    placeholder="문의할 내용을 입력해주세요."
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
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default QuestionForm;
