import { Component } from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      findproduct: '',
    };
  }
  find_go = (e) => {
    console.log(1);
    window.sessionStorage.removeItem('f_product');
    console.log(2);
    window.sessionStorage.setItem('f_product', this.state.findproduct);
    console.log(3);
    window.location.href = '/search';
    console.error();
  };

  TextChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  };
  enter_go = (e) => {
    if (e.key === 'Enter') {
      this.find_go();
    }
  };
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="input-group">
            <span style={{ marginTop: '5px', marginLeft: '10px' }}>
              상품검색 : &nbsp;&nbsp;&nbsp;&nbsp;
            </span>
            <input
              type="text"
              className="form-control"
              name="findproduct"
              value={this.state.findproduct}
              placeholder="상품이름을 검색하세요."
              onChange={this.TextChange}
              onKeyPress={this.enter_go}
            />
            <span className="input-group-btn">
              <button
                className="btn btn-default"
                type="submit"
                onClick={(e) => {
                  this.find_go(this.state.findproduct);
                }}
              >
                <span className="glyphicon glyphicon-search"></span>
              </button>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchBar;
