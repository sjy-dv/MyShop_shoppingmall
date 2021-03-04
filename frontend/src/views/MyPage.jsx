import { Component } from 'react';

class MyPage extends Component {
  myfavor() {
    window.location.href = '/myfavor';
  }

  mybasket() {
    window.location.href = '/mybasket';
  }

  mydetail() {
    window.location.href = '/mydetail';
  }

  render() {
    return (
      <>
        <div style={{ textAlign: 'center' }}>
          <div className="container">
            <br></br>
            <br></br>
            <h1>마이페이지</h1>
            <br></br>
            <p>접속한 계정 : {window.sessionStorage.getItem('id')}</p>
            <br></br>
            <button
              style={{ width: '180px' }}
              className="btn btn-primary"
              onClick={this.myfavor}
            >
              내가 찜한 목록보기
            </button>
            <br></br>
            <br></br>
            <br></br>
            <button
              style={{ width: '180px' }}
              className="btn btn-primary"
              onClick={this.mybasket}
            >
              내 장바구니 목록보기
            </button>
            <br></br>
            <br></br>
            <br></br>
            <button
              style={{ width: '180px' }}
              className="btn btn-primary"
              onClick={this.mydetail}
            >
              나의 문의내역 보기
            </button>
            <br></br>
            <br></br>
            <br></br>
            <hr></hr>
          </div>
        </div>
      </>
    );
  }
}

export default MyPage;
