import { Component } from 'react';
import axios from 'axios';

class Boardbtn extends Component {
  delete_go() {
    axios
      .post('http://localhost:8081/api/board/delete', {
        idx: window.sessionStorage.getItem('boardidx'),
      })
      .catch((err) => console.log(err));
    alert('글이 삭제되었습니다.');
  }
  delete() {
    this.delete_go();
    window.location.href = '/board';
  }

  update() {
    window.location.href = '/b_update';
  }

  render() {
    return (
      <div style={{ textAlign: 'right' }}>
        <a className="btn btn-primary" onClick={this.update}>
          수정
        </a>
        &nbsp;&nbsp;
        <button className="btn btn-danger" onClick={this.delete}>
          삭제
        </button>
      </div>
    );
  }
}

export default Boardbtn;
