import { Component } from 'react';
import { withRouter } from 'react-router-dom';

import axios from 'axios';

class C_product extends Component {
  //이미지 사이즈 350 225

  event1(idx) {
    if (window.sessionStorage.getItem('id')) {
      axios
        .post('http://localhost:8081/api/myinform/favorite', {
          idx: `${this.props.idx}`,
          id: window.sessionStorage.getItem('id'),
        })
        .then((res) => {
          console.log(res);
          console.log(res.data);
        })
        .catch((error) => console.log(error));
      alert('상품이 찜 되었습니다.');
    } else {
      alert('로그인을 해주세요.');
    }
  }

  event2(idx) {
    if (window.sessionStorage.getItem('id')) {
      axios
        .post('http://localhost:8081/api/myinform/basket', {
          idx: `${this.props.idx}`,
          id: window.sessionStorage.getItem('id'),
        })
        .then((res) => {
          console.log(res);
          console.log(res.data);
        })
        .catch((error) => console.log(error));
      alert('장바구니에 추가 되었습니다.');
    } else {
      alert('로그인을 해주세요.');
    }
  }

  item_go(idx) {
    window.sessionStorage.setItem('idx', this.props.idx);
    this.props.history.push('/detail');
  }

  render() {
    return (
      <>
        <div className="col-md-4">
          <div className="card mb-4 shadow-sm">
            <img
              className="bd-placeholder-img card-img-top"
              onClick={(e) => {
                this.item_go(this.props.idx);
              }}
              style={{ width: '348px', height: '180px' }}
              src={this.props.img}
              preserveAspectRatio="xMidYMid slice"
              focusable="false"
              aria-label="Placeholder: Thumbnail"
            ></img>
            <div className="card-body">
              <p
                className="card-text"
                onClick={(e) => {
                  this.item_go(this.props.idx);
                }}
              >
                <h4>{this.props.name}</h4>
                {this.props.content}
                <br></br>
                {this.props.price} 원
              </p>
              <div className="d-flex justify-content-between align-items-center">
                <div className="btn-group">
                  <button
                    type="button"
                    onClick={(e) => {
                      this.event1(this.props.idx);
                    }}
                    className="btn btn-sm btn-outline-secondary"
                  >
                    찜하기
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      this.event2(this.props.idx);
                    }}
                    className="btn btn-sm btn-outline-secondary"
                  >
                    추가
                  </button>
                </div>
                <small className="text-muted">
                  <a
                    onClick={(e) => {
                      this.item_go(this.props.idx);
                    }}
                  >
                    자세히보기&gt;&gt;&gt;{' '}
                  </a>
                </small>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(C_product);
