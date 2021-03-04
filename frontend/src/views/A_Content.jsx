import { Component } from 'react';
import '../css/qform.css';
import '../css/blog.css';
import axios from 'axios';

class A_Content extends Component {
  constructor(props) {
    super(props);

    this.state = {
      idx: '',
      title: '',
      content: '',
    };
  }

  componentDidMount() {
    this.fromBackend();
  }

  fromBackend() {
    axios
      .post('http://localhost:8081/api/question/detailansw', {
        idx: window.sessionStorage.getItem('contentid'),
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        this.setState({
          title: res.data[0].title,
          id: '답변한 아이디 : ' + res.data[0].id,
          content: res.data[0].content,
        });
        window.sessionStorage.setItem('user_id', res.data[0].id);
      });
  }

  history_go() {
    window.history.go(-1);
  }

  render() {
    return (
      <div className="wrapper fadeInDown">
        <div id="formContent">
          <div className="container-contact100">
            <div className="wrap-contact100">
              <div className="contact100-form validate-form">
                <span className="contact100-form-title">답변내용</span>
                <div className="wrap-input100 validate-input">
                  <input
                    className="input100"
                    type="text"
                    name="title"
                    value={this.state.title}
                    onChange={this.TextChange}
                    required
                    readOnly
                  />
                </div>
                <br></br>
                <div className="wrap-input100 validate-input">
                  <input
                    className="input100"
                    type="text"
                    name="title"
                    value={this.state.id}
                    onChange={this.TextChange}
                    required
                    readOnly
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
                    readOnly
                  ></textarea>
                </div>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default A_Content;
