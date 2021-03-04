import { Component } from 'react';
import axios from 'axios';

class MainSubbtn extends Component {
  exceptmain(idx) {
    axios
      .post('http://localhost:8081/api/product/uncheckitem', {
        idx: `${this.props.idx}`,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
    alert('메인 설정이 해제되었습니다.');
    window.location.reload();
  }

  render() {
    return (
      <td className="align-middle">
        <button
          className="btn btn-outline-warning"
          onClick={(e) => {
            this.exceptmain(this.props.idx);
          }}
        >
          메인 노출해제
        </button>
      </td>
    );
  }
}

export default MainSubbtn;
