import { Component } from 'react';

class NotPage extends Component {
  render() {
    return (
      <div className="album py-5 bg-light">
        <div className="container">
          <h1>
            다음 "{window.sessionStorage.getItem('f_product')}"에 대한 검색결과
          </h1>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <div style={{ textAlign: 'center' }}>
            <h2>관련 상품이 존재하지 않습니다.</h2>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
          </div>
        </div>
      </div>
    );
  }
}

export default NotPage;
