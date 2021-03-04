import { Component } from 'react';
import '../css/blog.css';
import UserStatus from '../components/UserStatus';
import { withRouter } from 'react-router-dom';
import Mypage from '../components/Mypage';
import SearchBar from '../components/SearchBar';

class Appbar extends Component {
  componentDidMount() {
    if (window.location.pathname !== '/auth') {
      window.sessionStorage.removeItem('j_id');
      window.sessionStorage.removeItem('j_pw');
      window.sessionStorage.removeItem('j_email');
      window.sessionStorage.removeItem('auth_code');
    }

    if (
      window.location.pathname !== '/newpw' &&
      window.location.pathname !== '/change_pw'
    ) {
      window.sessionStorage.removeItem('f_id');
      window.sessionStorage.removeItem('f_email');
    }
  }

  home() {
    window.sessionStorage.removeItem('idx');
    window.location.href = '/';
  }

  all() {
    window.location.href = '/category';
  }
  appliances() {
    window.sessionStorage.removeItem('category');
    window.sessionStorage.setItem('category', '가전제품');
    window.location.href =
      '/translation?productname=' + window.sessionStorage.getItem('category');
  }
  clothes() {
    window.sessionStorage.removeItem('category');
    window.sessionStorage.setItem('category', '의류');
    window.location.href =
      '/translation?productname=' + window.sessionStorage.getItem('category');
  }
  cosmetics() {
    window.sessionStorage.removeItem('category');
    window.sessionStorage.setItem('category', '화장품');
    window.location.href =
      '/translation?productname=' + window.sessionStorage.getItem('category');
  }

  inquire() {
    if (window.sessionStorage.getItem('id') === null) {
      alert('로그인이 필요한 기능입니다.');
      return false;
    }
    window.location.href = '/question';
  }

  board() {
    window.location.href = '/board';
  }
  render() {
    return (
      <>
        <div className="container">
          <header className="blog-header py-3">
            <div className="row flex-nowrap justify-content-between align-items-center">
              <Mypage></Mypage>
              <div className="col-4 text-center">
                <a className="blog-header-logo text-dark" onClick={this.home}>
                  MyShop
                </a>
              </div>
              <UserStatus></UserStatus>
            </div>
          </header>
          <div className="nav-scroller py-3 mb-1">
            <nav style={{ textAlign: 'left' }}>
              <a className="p-2 text-muted" onClick={this.all}>
                ALL
              </a>
              <a className="p-2 text-muted" onClick={this.appliances}>
                가전제품
              </a>
              <a className="p-2 text-muted" onClick={this.clothes}>
                의류
              </a>
              <a className="p-2 text-muted" onClick={this.cosmetics}>
                화장품
              </a>
              <a className="p-2 text-muted" onClick={this.inquire}>
                문의하기
              </a>
              <a className="p-2 text-muted" onClick={this.board}>
                고객게시판
              </a>
            </nav>
          </div>
        </div>
        <br></br>
        <br></br>
        <SearchBar></SearchBar>
        <br></br>
        <br></br>
      </>
    );
  }
}

export default withRouter(Appbar);
