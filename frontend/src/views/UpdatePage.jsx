import axios from 'axios';
import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import '../css/blog.css';
import store from '../store/store';

class UpdatePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      p_name: '',
      p_content: '',
      p_price: '',
      idx: '',
      category: '',
    };

    this.admingo = this.admingo.bind(this);
  }

  componentDidMount() {
    store.dispatch({ type: 'login', id: 'admin' });
    store.subscribe(
      function () {
        this.setState({ idx: store.getState().idx });
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
        idx: store.getState().idx,
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        this.setState({
          idx: res.data[0].p_idx,
          p_name: res.data[0].p_name,
          p_content: res.data[0].p_content,
          p_price: res.data[0].p_price,
          category: res.data[0].category,
        });
      });
  }

  sendBackend() {
    axios.post('http://localhost:8081/api/product/updateitem', {
      p_idx: this.state.idx,
      p_name: this.state.p_name,
      p_content: this.state.p_content,
      p_price: this.state.p_price,
      category: this.state.category,
    });
    window.location.href = '/manage';
  }

  alert_func() {
    alert('상품이 변경되었습니다.');
  }

  admingo() {
    this.props.history.push('/manage');
  }

  update_go = (e) => {
    e.preventDefault();
    this.sendBackend();
  };

  FileChange = (e) => {
    this.setState({
      file: e.target.files[0],
      filename: e.target.value,
    });
  };
  TextChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  };
  SelectChange = (e) => {
    this.setState({ category: e.target.value });
  };
  render() {
    return (
      <div className="wrapper fadeInDown">
        <div id="formContent">
          <br></br>
          <h1>상품수정 페이지</h1>
          <br></br>
          <br></br>
          <br></br>
          <form onSubmit={this.update_go}>
            상품 이름{' '}
            <input
              type="text"
              id="inputtext"
              className="fadeIn second"
              name="p_name"
              file={this.state.p_name}
              value={this.state.p_name}
              onChange={this.TextChange}
            />
            <br></br>
            <br></br>
            상품 설명{' '}
            <input
              type="text"
              id="inputtext"
              className="fadeIn second"
              name="p_content"
              file={this.state.p_content}
              value={this.state.p_content}
              onChange={this.TextChange}
            />
            <br></br>
            <br></br>
            상품 가격{' '}
            <input
              type="text"
              id="inputtext"
              className="fadeIn second"
              name="p_price"
              file={this.state.p_price}
              value={this.state.p_price}
              onChange={this.TextChange}
            />
            <br></br>
            <br></br>
            카테고리
            <br></br>
            <select
              className='"custom-select custom-select-lg mb-3"'
              value={this.state.category}
              onChange={this.SelectChange}
            >
              <option category="">----선택해주세요-----</option>
              <option category="appliances">가전제품</option>
              <option category="clothes">의류</option>
              <option category="cosmetics">화장품</option>
            </select>
            <br></br>
            <br></br>
            <input
              type="submit"
              id="inputbtn"
              className="fadeIn fourth"
              value="수정"
            />
            <button
              onClick={this.admingo}
              href=""
              id="inputbtn"
              className="fadeIn fourth"
            >
              뒤로
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(UpdatePage);
