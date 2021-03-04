import { Component } from 'react';

class Logout extends Component {
  logout() {
    window.sessionStorage.clear();
    window.location.href = '/';
  }

  render() {
    return (
      <span>
        {this.props.nickname} 님 어서오세요.&nbsp;
        <a className="btn btn-sm btn-outline-secondary" onClick={this.logout}>
          Logout
        </a>
      </span>
    );
  }
}

export default Logout;
