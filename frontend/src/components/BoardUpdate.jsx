import { Component } from 'react';
import '../css/qform.css';
import '../css/blog.css';
import axios from 'axios';

class BoardUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
    };
  }

  componentDidMount() {
    axios
      .post('http://localhost:8081/api/board/getcontent', {
        idx: window.sessionStorage.getItem('boardidx'),
      })
      .then((res) => {
        this.setState({
          title: res.data[0].title,
          content: res.data[0].content,
        });
      })
      .catch((err) => {
        if (err) alert('페이지 오류');
        window.history.back();
      });
  }

  sendBackend() {
    axios
      .post('http://localhost:8081/api/board/update', {
        idx: window.sessionStorage.getItem('boardidx'),
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
    alert('글이 수정되었습니다.');
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
                <span className="contact100-form-title">게시글수정</span>
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
                      수정하기
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

export default BoardUpdate;
