import { Component } from 'react';
import '../css/blog.css';

class Jumbotron extends Component {
  render() {
    return (
      <div className="container">
        <br></br>
        <div className="jumbotron">
          <h1 className="display-4">My Shopping mall</h1>
          <br></br>
          <p className="lead">나만의 작은 쇼핑몰</p>
          <br></br>
          <br></br>
          <p style={{ textAlign: 'right' }} className="leand">
            출처 : https://blog.naver.com/ks2414e(저작권 없는 이미지입니다.)
          </p>
        </div>
      </div>
    );
  }
}

export default Jumbotron;
