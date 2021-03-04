import { Component } from 'react';
import Scrollbtn from '../components/Scrollbtn';

class Footbar extends Component {
  render() {
    return (
      <>
        <div className="container">
          <footer className="page-footer font-small blue">
            <div className="footer-copyright text-center py-3">
              © 2021 Copyright:
              <a href=""> 배고프면 개발하는 사람</a>
            </div>
          </footer>
        </div>
        <Scrollbtn></Scrollbtn>
      </>
    );
  }
}

export default Footbar;
