import { Component } from 'react';
import FavorList from '../components/FavorList';
import axios from 'axios';

class MyFavor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: '',
    };
  }

  componentDidMount() {
    this.sendBackend();
  }
  sendBackend() {
    axios
      .post('http://localhost:8081/api/myinform/favorlist', {
        id: window.sessionStorage.getItem('id'),
      })
      .then((res) => {
        console.log(res);
        this.setState({ product: res.data });
      })
      .catch((error) => console.log(error));
  }
  history_go() {
    window.location.href = '/mypage';
  }
  render() {
    return (
      <div className="container">
        <br></br>
        <div style={{ textAlign: 'right' }}>
          <button className="btn btn-primary" onClick={this.history_go}>
            뒤로가기
          </button>
        </div>
        <hr></hr>
        <h1>내가 찜한 목록</h1>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">상품</th>
              <th scope="col">상품 이름</th>
              <th scope="col">상품 설명</th>
              <th scope="col">상품 가격</th>
              <th scope="col">삭제</th>
            </tr>
          </thead>
          {this.state.product
            ? this.state.product.map((k) => {
                return (
                  <FavorList
                    key={k.p_idx}
                    idx={k.p_idx}
                    img={k.p_img}
                    name={k.p_name}
                    content={k.p_content}
                    price={k.p_price}
                  />
                );
              })
            : 'DB ERROR !! 조그만 기다려주세요.'}
        </table>
      </div>
    );
  }
}

export default MyFavor;
