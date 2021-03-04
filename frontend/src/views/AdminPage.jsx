import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import AdminList from '../components/AdminList';
import AddProduct from './AddProduct';
import AnswerList from './AnswerList';
import BakcupPage from './BakcupPage';
import QuestionPage from './QuestionPage';

class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
    };
  }
  productlist = () => {
    this.setState({
      value: 1,
    });
  };
  addproduct = () => {
    this.setState({
      value: 2,
    });
  };

  backupproduct = () => {
    this.setState({
      value: 3,
    });
  };

  inquirelist = () => {
    this.setState({
      value: 4,
    });
  };

  answerlist = () => {
    this.setState({
      value: 5,
    });
  };
  render() {
    var value = this.state.value;
    return (
      <>
        <div className="container">
          <br></br>
          <div style={{ textAlign: 'right' }}>
            <button className="btn btn-secondary" onClick={this.productlist}>
              상품 리스트
            </button>
            &nbsp;
            <button className="btn btn-primary" onClick={this.addproduct}>
              상품 추가하기
            </button>
            &nbsp;
            <button className="btn btn-danger" onClick={this.backupproduct}>
              상품 삭제내역
            </button>
            &nbsp;
            <button className="btn btn-info" onClick={this.inquirelist}>
              문의받은 내역
            </button>
            &nbsp;
            <button className="btn btn-warning" onClick={this.answerlist}>
              답변한 내역
            </button>
          </div>
          <hr></hr>
        </div>
        {(function () {
          if (value === 1) {
            return <AdminList></AdminList>;
          } else if (value === 2) {
            return <AddProduct></AddProduct>;
          } else if (value === 3) {
            return <BakcupPage></BakcupPage>;
          } else if (value === 4) {
            return <QuestionPage></QuestionPage>;
          } else if (value === 5) {
            return <AnswerList></AnswerList>;
          }
        })()}
      </>
    );
  }
}

export default withRouter(AdminPage);
