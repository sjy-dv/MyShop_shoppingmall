import { Component } from 'react';
import axios from 'axios';

class BasketList extends Component {
  delete(idx) {
    axios
      .post('http://localhost:8081/api/myinform/b_delete', {
        idx: `${this.props.idx}`,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });

    window.location.reload();
  }

  item_go(idx) {
    window.sessionStorage.setItem('idx', this.props.idx);
    window.location.href = '/detail';
  }
  render() {
    return (
      <tbody>
        <tr>
          <td className="align-middle">
            <img
              src={this.props.img}
              style={{ width: '80px', height: '80px' }}
            ></img>
          </td>
          <td className="align-middle">
            <a
              onClick={(e) => {
                this.item_go(this.props.idx);
              }}
            >
              {this.props.name}
            </a>
          </td>
          <td className="align-middle">{this.props.content}</td>
          <td className="align-middle">{this.props.price}</td>
          <td className="align-middle">
            <button
              className="btn btn-primary"
              onClick={(e) => {
                this.delete(this.props.idx);
              }}
            >
              삭제
            </button>
          </td>
        </tr>
      </tbody>
    );
  }
}

export default BasketList;
