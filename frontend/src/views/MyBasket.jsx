import { Component } from 'react';
import axios from 'axios';
import BasketList from '../components/BasketList';

class MyBasket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: '',
      total: 0,
    };
  }

  componentDidMount() {
    this.sendBackend();
  }
  sendBackend() {
    axios
      .post('http://localhost:8081/api/myinform/basketlist', {
        id: window.sessionStorage.getItem('id'),
      })
      .then((res) => {
        console.log(res);
        this.setState({ product: res.data });
        console.log(res.data[0].p_price);
        var sum = 0;
        for (var i = 0; i < res.data.length; i++) {
          sum += res.data[i].p_price;
          this.setState({
            total: sum,
          });
        }
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
        <h1>장바구니 목록</h1>
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
                  <BasketList
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
        <hr></hr>
        <br></br>
        <br></br>
        <br></br>
        <div>
          <h1>
            <p>
              총계 : {this.state.total}&nbsp;&nbsp;&nbsp;
              <button className="btn btn-primary">구매하기</button>
            </p>
          </h1>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
        </div>
      </div>
    );
  }
}

export default MyBasket;
