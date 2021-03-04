import { Component } from 'react';
import store from '../store/store';
import axios from 'axios';
import B_Comment from '../components/B_Comment';

class DetailPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      p_img: null,
      p_name: '',
      p_content: '',
      p_price: '',
      idx: '',
      count: 0,
      comments: '',
      comment: '',
    };
  }

  componentDidMount() {
    store.subscribe(
      function () {
        this.setState({ idx: window.sessionStorage.getItem('idx') });
      }.bind(this)
    );
    this.fromBackend();
  }

  fromBackend() {
    console.log(1);
    console.log(this.state.idx);
    // console.log(store.getState().idx);
    axios
      .post('http://localhost:8081/api/product/detailitem', {
        idx: window.sessionStorage.getItem('idx'),
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        this.setState({
          p_img: res.data.p_img,
          p_name: res.data.p_name,
          p_content: res.data.p_content,
          p_price: res.data.p_price,
        });
      });

    axios
      .get('http://localhost:8081/api/product/buycommentlist')
      .then((res) => {
        this.setState({
          comments: res.data,
          count: res.data.length,
        });
      });
  }

  history_go() {
    window.sessionStorage.removeItem('idx');
    window.history.go(-1);
  }

  bought = (e) => {
    axios.post('http://localhost:8081/api/product/completebuy', {
      id: window.sessionStorage.getItem('id'),
      p_idx: window.sessionStorage.getItem('idx'),
    });
    axios
      .post('http://localhost:8081/api/product/buyproduct', {
        name: this.state.p_name,
        price: this.state.p_price,
      })
      .catch((err) => console.log(err));
    alert('상품을 구매하였습니다.');
  };

  comment = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:8081/api/product/checkbought', {
        id: window.sessionStorage.getItem('id'),
        p_idx: window.sessionStorage.getItem('idx'),
      })
      .then((res) => {
        if (res.data === 0) {
          alert('상품을 구매한 후에 후기를 작성할 수 있습니다.');
          return false;
        }
        axios.post('http://localhost:8081/api/product/addcomment', {
          content: this.state.comment,
          writer: window.sessionStorage.getItem('id'),
          p_idx: window.sessionStorage.getItem('idx'),
        });
      });
    window.location.reload();
  };
  TextChangehandler = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  };
  enter_go = (e) => {
    if (e.key === 'Enter') {
      this.comment();
    }
  };
  render() {
    return (
      <>
        <br></br>
        <br></br>
        <div className="container">
          <a className="btn btn-primary" onClick={this.history_go}>
            뒤로가기
          </a>
          <br></br>
          <br></br>
          <br></br>
          <h1>상품 정보</h1>
          <hr></hr>
          <div className="row">
            <div className="col-xs-4 item-photo">
              <img
                style={{ width: '600px', height: '300px' }}
                src={this.state.p_img}
              ></img>
            </div>
            <div
              className="col-xs-5"
              style={{ border: '0px solid gray', marginLeft: '50px' }}
            >
              <h3>{this.state.p_name}</h3>

              <h6 className="title-price">
                <small>가격</small>
              </h6>
              <h3 style={{ marginTop: '0px' }}>{this.state.p_price} 원</h3>

              <div className="section">
                <h5>{this.state.p_content}</h5>
              </div>

              <div className="section" style={{ paddingBottom: '20px' }}>
                <h6 className="title-attr">
                  <small>수량</small>
                </h6>
                <div>
                  <button className="btn btn-primary">+</button>
                  <input
                    value="1"
                    style={{
                      marginLeft: '10px',
                      marginRight: '10px',
                      width: '50px',
                      textAlign: 'center',
                      height: '40px',
                    }}
                  />
                  <button className="btn btn-primary">-</button>
                </div>
              </div>
              <div className="section">
                <button className="btn btn-primary" onClick={this.bought}>
                  구매하기
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <hr></hr>
          <h3>후기를 남겨주세요!</h3>
          <br></br>
        </div>
        <div className="container">
          <h5>
            <b>후기 ( {this.state.count} )</b>
          </h5>
          {this.state.comments
            ? this.state.comments.map((k) => {
                return (
                  <B_Comment
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
              onChange={this.TextChangehandler}
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

export default DetailPage;
