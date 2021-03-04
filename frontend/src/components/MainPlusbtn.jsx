import { Component } from 'react';
import axios from 'axios';

class MainPlusbtn extends Component {
  mainselect(idx) {
    axios.get('http://localhost:8081/api/product/mainlist').then((res) => {
      if (res.data.length === 6) {
        alert('메인은 6개까지만 추가가 가능합니다.');
      } else {
        axios
          .post('http://localhost:8081/api/product/setmain', {
            idx: `${this.props.idx}`,
          })
          .then((res) => {
            console.log(res);
          })
          .catch((error) => {
            console.log(error);
          });
        alert('메인 상품으로 설정되었습니다.');
        window.location.reload();
      }
    });
  }

  render() {
    return (
      <td className="align-middle">
        <button
          className="btn btn-outline-warning"
          onClick={(e) => {
            this.mainselect(this.props.idx);
          }}
        >
          메인에 노출
        </button>
      </td>
    );
  }
}

export default MainPlusbtn;
