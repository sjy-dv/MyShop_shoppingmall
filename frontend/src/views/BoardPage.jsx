import { Component } from 'react';
import axios from 'axios';
import Boardbtn from '../components/Boardbtn';
import Moment from 'react-moment';
import Comment from '../components/Comment';

class BoardPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      writer: '',
      title: '',
      content: '',
      created: '',
      comment: '',
      comments: '',
      count: 0,
    };
  }

  componentDidMount() {
    axios
      .post('http://localhost:8081/api/board/incontent', {
        idx: window.sessionStorage.getItem('boardidx'),
      })
      .then((res) => {
        this.setState({
          writer: res.data.writer,
          title: res.data.title,
          content: res.data.content,
          created: res.data.created,
        });
      })
      .catch((err) => console.log(err));

    axios
      .post('http://localhost:8081/api/board/commentlist', {
        b_idx: window.sessionStorage.getItem('boardidx'),
      })
      .then((res) => {
        console.log(res);
        this.setState({
          comments: res.data,
          count: res.data.length,
        });
      });
  }

  back() {
    window.location.href = '/board';
  }
  TextChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  };
  enter_go = (e) => {
    if (e.key === 'Enter') {
      this.comment();
    }
  };

  comment = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:8081/api/board/comment', {
        content: this.state.comment,
        writer: window.sessionStorage.getItem('id'),
        b_idx: window.sessionStorage.getItem('boardidx'),
      })
      .then((res) => {
        console.log(res);
        alert('댓글을 작성하였습니다.');
        window.location.reload();
      })
      .catch((err) => {
        if (err) {
          console.log(err);
          return false;
        }
      });
  };
  render() {
    var value = 0;
    if (this.state.writer === window.sessionStorage.getItem('id')) {
      value = 1;
    } else if (window.sessionStorage.getItem('id') === 'admin') {
      value = 1;
    }
    return (
      <>
        <div className="container">
          <a onClick={this.back} class="btn btn-primary">
            뒤로가기
          </a>
          <br></br>
          <br></br>
          <form>
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <td>제목 : {this.state.title}</td>
                </tr>
                <tr>
                  <td>작성자 : {this.state.writer}</td>
                </tr>
                <tr>
                  <td>
                    작성일 :{' '}
                    <Moment format="YYYY 년 MM 월 DD 일 HH시 mm분">
                      {this.state.created}
                    </Moment>
                  </td>
                </tr>
                <tr>
                  <td>내용 : {this.state.content}</td>
                </tr>
              </tbody>
            </table>
            {(function () {
              if (value === 1) {
                return <Boardbtn></Boardbtn>;
              }
            })()}
          </form>
          <hr></hr>
          <br></br>
        </div>
        <div className="container">
          <h5>
            <b>댓글 ( {this.state.count} )</b>
          </h5>
          {this.state.comments
            ? this.state.comments.map((k) => {
                return (
                  <Comment
                    key={k.idx}
                    idx={k.idx}
                    content={k.content}
                    writer={k.writer}
                  />
                );
              })
            : 'DB ERROR!! 조금만 기다려주세요.'}
        </div>
        <br></br>
        <br></br>
        <div className="container">
          <h5>
            <b>댓글쓰기</b>
          </h5>
          <br></br>
          <form style={{ marginLeft: '1%' }} onSubmit={this.comment}>
            <textarea
              required
              rows="5"
              cols="100"
              style={{ border: '1px solid', outline: 'solid' }}
              name="comment"
              value={this.state.comment}
              placeholder="댓글을 작성하세요."
              onChange={this.TextChange}
              onKeyPress={this.enter_go}
            ></textarea>
            <button
              className="btn btn-secondary"
              type="submit"
              style={{ margin: '25px' }}
            >
              댓글쓰기
            </button>
          </form>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </>
    );
  }
}

export default BoardPage;
