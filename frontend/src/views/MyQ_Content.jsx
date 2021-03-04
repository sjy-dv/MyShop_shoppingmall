import { Component } from 'react';
import '../css/qform.css';
import '../css/blog.css';
import axios from 'axios';

class MyQ_Content extends Component {
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
      .post('http://localhost:8081/api/question/detail', {
        idx: window.sessionStorage.getItem('contentid'),
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        this.setState({
          title: res.data[0].title,
          content: res.data[0].content,
        });
      });
  }

  history_go() {
    window.sessionStorage.removeItem('contentid');
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
                <span className="contact100-form-title">문의내용</span>
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

export default MyQ_Content;
