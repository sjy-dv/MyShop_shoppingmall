import { Component } from 'react';
import axios from 'axios';

class Success extends Component {
  componentDidMount() {
    const query = window.location.search.split('=')[1];
    const queryId = query.split('&')[0];

    const payment = window.location.search.split('=')[3];
    const payerId = payment.split('&')[0];

    axios
      .post('http://localhost:8081/api/payment/payok', {
        paymentId: queryId,
        payerID: payerId,
      })
      .then((res) => {
        console.log(res);
        if (res.data === 1) {
          alert('결제가 정상적으로 이루어졌습니다.');
          window.close();
        } else {
          alert('결제가 정상적으로 이루어지지 않았습니다.');
          window.close();
        }
      });
  }

  render() {
    return (
      <div className="container">
        <div style={{ textAlign: 'center', marginTop: '50%' }}></div>
      </div>
    );
  }
}

export default Success;
