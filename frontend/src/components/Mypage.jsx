import { Component } from 'react';

class Mypage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
    };
  }

  render() {
    if (window.sessionStorage.getItem('id') === null) {
      var value = 1;
    } else {
      var value = 2;
      if (window.sessionStorage.getItem('id') === 'admin') {
        var value = 3;
      }
    }
    return (
      <div className="col-4 pt-1">
        {(function () {
          if (value === 1) {
            return (
              <a className="text-muted" href="/join">
                회원가입
              </a>
            );
          } else if (value === 2) {
            return (
              <a className="text-muted" href="/mypage">
                내정보
              </a>
            );
          } else {
            return (
              <a className="text-muted" href="/manage">
                관리자 페이지
              </a>
            );
          }
        })()}
      </div>
    );
  }
}

export default Mypage;
