import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import B_product from '../components/B_product';

class BackupPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: '',
    };
  }

  componentDidMount() {
    this.fromBackend()
      .then((res) => this.setState({ product: res }))
      .catch((err) => console.log(err));
  }
  fromBackend = async () => {
    const response = await fetch('http://localhost:8081/api/product/backlist');
    const data = await response.json();
    console.log(data);
    return data;
  };

  render() {
    return (
      <div className="container">
        <br></br>
        <h1>상품 삭제리스트</h1>
        <br></br>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">상품</th>
              <th scope="col">상품 이름</th>
              <th scope="col">상품 설명</th>
              <th scope="col">상품 가격</th>
              <th scope="col">복원</th>
            </tr>
          </thead>
          {this.state.product
            ? this.state.product.map((k) => {
                return (
                  <B_product
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

export default withRouter(BackupPage);
