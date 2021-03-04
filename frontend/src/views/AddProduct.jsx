import axios from 'axios';
import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import '../css/blog.css';
import store from '../store/store';

class AddProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      file: null,
      filename: '',
      file2: null,
      filename2: '',
      p_name: '',
      p_content: '',
      p_price: '',
      category: '',
    };
  }

  componentDidMount() {
    store.dispatch({ type: 'login', id: 'admin' });
  }

  sendBackend() {
    const formData = new FormData();
    formData.append('img', this.state.file);
    formData.append('img2', this.state.file2);
    formData.append('p_name', this.state.p_name);
    formData.append('p_content', this.state.p_content);
    formData.append('p_price', this.state.p_price);
    formData.append('category', this.state.category);
    if (this.state.category === '') {
      alert('카테고리를 설정해주세요.');
      return false;
    }
    axios
      .post('http://localhost:8081/api/product/additem', formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    this.setState({
      file: null,
      filename: '',
      p_name: '',
      p_content: '',
      p_price: '',
      category: '',
    });
    this.alert_func();
  }

  alert_func() {
    alert('상품이 등록되었습니다.');
  }

  add_go = (e) => {
    e.preventDefault();
    this.sendBackend();
  };

  FileChange = (e) => {
    this.setState({
      file: e.target.files[0],
      filename: e.target.value,
    });
  };
  FileChange2 = (e) => {
    this.setState({
      file2: e.target.files[0],
      filename2: e.target.value,
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
          <h1>상품추가 페이지</h1>
          <br></br>
          <br></br>
          <br></br>
          <form onSubmit={this.add_go}>
            상품 이미지 :{' '}
            <input
              type="file"
              className="fadeIn second"
              name="file"
              file={this.state.file}
              value={this.state.filename}
              onChange={this.FileChange}
              required
            />
            <br></br>
            <br></br>
            상품 상세이미지 :{' '}
            <input
              type="file"
              className="fadeIn second"
              name="file2"
              file={this.state.file2}
              value={this.state.filename2}
              onChange={this.FileChange2}
              required
            />
            <br></br>
            <br></br>
            상품 이름{' '}
            <input
              type="text"
              id="inputtext"
              className="fadeIn second"
              name="p_name"
              file={this.state.p_name}
              value={this.state.p_name}
              onChange={this.TextChange}
              required
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
              required
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
              required
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
              value="추가"
            />
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(AddProduct);
