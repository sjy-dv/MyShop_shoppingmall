import { Component } from 'react';
import '../App.css';
import axios from 'axios';
import { Modal } from 'antd';

class PayPage extends Component {
  constructor() {
    super();
    this.state = {
      isModalVisible: false,
      isModalVisible2: false,
    };
  }

  paypal = () => {
    axios
      .post('http://localhost:8081/api/payment/geturl', {
        amount: window.sessionStorage.getItem('price'),
      })
      .then((res) => {
        if (res.data === -1) {
          alert('결제정보가 일치하지 않습니다.');
        } else {
          window.location.href = res.data;
        }
      });
  };

  import = () => {
    const IMP = window.IMP;
    IMP.init('imp89257980');
    IMP.request_pay(
      {
        pg: 'html5_inicis',
        pay_method: 'card',
        merchant_uid: 'merchant_' + new Date().getTime(),
        name: '주문명:결제테스트',
        amount: this.state.price,
        buyer_tel: '010-1234-5678',
      },
      function (rsp) {
        if (rsp.success) {
          var msg = '결제가 완료되었습니다.';
          msg += '고유ID : ' + rsp.imp_uid;
          msg += '상점 거래ID : ' + rsp.merchant_uid;
          msg += '결제 금액 : ' + rsp.paid_amount;
          msg += '카드 승인번호 : ' + rsp.apply_num;

          axios.post('http://localhost:8081/api/payment/iamport', {
            imp_uid: rsp.imp_uid,
            merchant_uid: rsp.merchant_uid,
          });
          window.close();
        } else {
          var msg = '결제에 실패하였습니다.';
          msg += '에러내용 : ' + rsp.error_msg;
          window.close();
        }

        alert(msg);
      }
    );
  };
  showModal = () => {
    this.setState({
      isModalVisible: true,
    });
  };

  handleOk = () => {
    this.setState({
      isModalVisible: false,
    });
    this.import();
  };

  handleCancel = () => {
    this.setState({
      isModalVisible: false,
    });
  };

  showModal2 = () => {
    this.setState({
      isModalVisible2: true,
    });
  };

  handleOk2 = () => {
    this.setState({
      isModalVisible2: false,
    });
    this.paypal();
  };

  handleCancel2 = () => {
    this.setState({
      isModalVisible2: false,
    });
  };

  TextChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  };
  render() {
    return (
      <>
        <div className="container" style={{ margin: '35%' }}>
          <button
            className="btn btn-primary"
            style={{ width: '200px', height: '70px', fontSize: '20px' }}
            onClick={this.showModal2}
          >
            PayPal 결제
          </button>
          <br />
          <br />
          <button
            className="btn btn-primary"
            style={{ width: '200px', height: '70px', fontSize: '20px' }}
            onClick={this.showModal}
          >
            아임포트 결제
          </button>
        </div>
        <Modal
          title="결제 금액 입력란"
          visible={this.state.isModalVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <div>
            <span>결제대금을 확인하세요.</span>
            <input
              type="text"
              name="price"
              value={window.sessionStorage.getItem('price')}
            />
            (원)
          </div>
        </Modal>
        <Modal
          title="Payment amount input field"
          visible={this.state.isModalVisible2}
          onOk={this.handleOk2}
          onCancel={this.handleCancel2}
        >
          <div>
            <span>Enter the payment amount.</span>
            <input
              type="text"
              name="price"
              value={window.sessionStorage.getItem('price')}
              onChange={this.TextChange}
              required
            />
            ($)
          </div>
        </Modal>
      </>
    );
  }
}

export default PayPage;
