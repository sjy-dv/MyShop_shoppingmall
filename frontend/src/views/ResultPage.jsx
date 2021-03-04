import { Component } from 'react';
import C_product from '../components/C_product';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import '../css/page.css';

class ResultPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      tableData: [],
      orgtableData: [],
      perPage: 9,
      currentPage: 0,
    };
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState(
      {
        currentPage: selectedPage,
        offset: offset,
      },
      () => {
        this.loadMoreData();
      }
    );
  };

  loadMoreData() {
    const data = this.state.orgtableData;

    const slice = data.slice(
      this.state.offset,
      this.state.offset + this.state.perPage
    );
    this.setState({
      pageCount: Math.ceil(data.length / this.state.perPage),
      tableData: slice,
    });
  }
  componentDidMount() {
    axios
      .post('http://localhost:8081/api/product/search', {
        name: window.sessionStorage.getItem('f_product'),
      })
      .then((res) => {
        var data = res.data;

        var slice = data.slice(
          this.state.offset,
          this.state.offset + this.state.perPage
        );

        this.setState({
          pageCount: Math.ceil(data.length / this.state.perPage),
          orgtableData: res.data,
          tableData: slice,
        });
        if (res.data.length === 0) {
          window.location.href = '/notfound';
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <>
        <div className="album py-5 bg-light">
          <div className="container">
            <h1>
              다음 "{window.sessionStorage.getItem('f_product')}"에 대한
              검색결과
            </h1>
            <br></br>
            <br></br>
            <div className="row">
              {this.state.tableData
                ? this.state.tableData.map((k) => {
                    return (
                      <C_product
                        key={k.p_idx}
                        idx={k.p_idx}
                        img={k.p_img}
                        name={k.p_name}
                        content={k.p_content}
                        price={k.p_price}
                      />
                    );
                  })
                : 'DB ERROR !! 조금만 기다려주세요.'}
            </div>
          </div>
        </div>
        <div>
          <ReactPaginate
            previousLabel={'prev'}
            nextLabel={'next'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={this.state.pageCount}
            pageRangeDisplayed={9}
            onPageChange={this.handlePageClick}
            containerClassName={'pagination'}
            marginPagesDisplayed={2}
            subContainerClassName={'pages pagination'}
            activeClassName={'active'}
          />
        </div>
      </>
    );
  }
}

export default ResultPage;
