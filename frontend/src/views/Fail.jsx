import { Component } from 'react';

class Fail extends Component {
  componentDidMount() {
    alert('결제정보가 일치하지않거나 오류가 발생하였습니다.');
    window.close();
  }

  render() {
    return (
      <div className="container">
        <div style={{ textAlign: 'center', marginTop: '50%' }}></div>
      </div>
    );
  }
}

export default Fail;
