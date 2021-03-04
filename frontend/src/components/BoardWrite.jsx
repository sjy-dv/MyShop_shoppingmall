import { Component } from 'react';
import '../css/qform.css';
import '../css/blog.css';
import axios from 'axios';

class BoardWrite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
    };
  }

  sendBackend() {
    axios
      .post('http://localhost:8081/api/board/write_ok', {
        writer: window.sessionStorage.getItem('id'),
        title: this.state.title,
        content: this.state.content,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        if (err) return false;
      });
  }

  send = (e) => {
    e.preventDefault();
    this.sendBackend();
    alert('글이 작성되었습니다.');
    window.location.href = '/board';
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
          <div className="container-contact101">
            <div className="wrap-contact100">
              <form
                className="contact100-form validate-form"
                onSubmit={this.send}
              >
                <span className="contact100-form-title">게시글작성</span>
                <div className="wrap-input100 validate-input">
                  <input
                    className="input100"
                    type="text"
                    name="title"
                    value={this.state.title}
                    onChange={this.TextChange}
                    required
                    placeholder="제목을 입력해주세요."
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
                    placeholder="내용을 입력해주세요."
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
                      작성하기
                    </span>
                  </button>
                </div>
                <br></br>
                <div className="container-contact100-form-btn">
                  <button className="contact100-form-btn" type="submit">
                    <span>
                      <i
                        className="fa fa-paper-plane-o m-r-6"
                        aria-hidden="true"
                      ></i>
                      돌아가기
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

export default BoardWrite;
