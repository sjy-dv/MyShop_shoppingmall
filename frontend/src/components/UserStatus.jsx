import { Component } from 'react';
import store from '../store/store';
import Logout from './Logout';

class UserStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
    };
  }
  componentDidMount() {
    store.subscribe(
      function () {
        this.setState({ id: store.getState().id });
      }.bind(this)
    );
  }

  render() {
    if (window.sessionStorage.getItem('id') === null) {
      var value = 1;
    } else {
      var value = 2;
      var nickname = window.sessionStorage.getItem('id');
    }
    return (
      <div className="col-4 d-flex justify-content-end align-items-center">
        {(function () {
          if (value === 1) {
            return (
              <a className="btn btn-sm btn-outline-secondary" href="/login">
                Login
              </a>
            );
          } else {
            return <Logout nickname={nickname}></Logout>;
          }
        })()}
      </div>
    );
  }
}

export default UserStatus;
