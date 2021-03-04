import { Component } from 'react';
import axios from 'axios';

class C_delete extends Component {
  delete(idx) {
    axios.post('http://localhost:8081/api/board/commentdelete', {
      idx: this.props.idx,
    });
    window.location.reload();
  }

  render() {
    return (
      <>
        <div style={{ textAlign: 'right' }}>
          <button
            className="btn btn-danger"
            onClick={(e) => {
              this.delete(this.props.idx);
            }}
          >
            삭제
          </button>
        </div>
        <br></br>
      </>
    );
  }
}

export default C_delete;
