import { Component } from 'react';
import B_list from '../components/B_list';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import '../css/page.css';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      tableData: [],
      orgtableData: [],
      perPage: 10,
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
    this.getData();
  }

  getData() {
    axios.get(`http://localhost:8081/api/board/list`).then((res) => {
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
    });
  }

  write_go() {
    if (window.sessionStorage.getItem('id') === null) {
      alert('로그인이 필요한 기능입니다.');
      return false;
    }
    window.location.href = '/b_write';
  }

  render() {
    return (
      <>
        <div className="container">
          <h1>고객 게시판</h1>
          <br></br>
          <table className="table">
            <thead className="thead-dark">
              <th scope="col">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;게시글 번호
              </th>
              <th scope="col">제목</th>
              <th scope="col">작성자</th>
              <th scope="col">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;작성일
              </th>
            </thead>
            {this.state.tableData
              ? this.state.tableData.map((k) => {
                  return (
                    <B_list
                      key={k.idx}
                      idx={k.idx}
                      title={k.title}
                      writer={k.writer}
                      created={k.created}
                    />
                  );
                })
              : 'DB ERROR !! 조그만 기다려주세요.'}
          </table>
          <div style={{ textAlign: 'right' }}>
            <a onClick={this.write_go} className="btn btn-light">
              글쓰기
            </a>
          </div>
          <div>
            <ReactPaginate
              previousLabel={'prev'}
              nextLabel={'next'}
              breakLabel={'...'}
              breakClassName={'break-me'}
              pageCount={this.state.pageCount}
              pageRangeDisplayed={10}
              onPageChange={this.handlePageClick}
              containerClassName={'pagination'}
              marginPagesDisplayed={2}
              subContainerClassName={'pages pagination'}
              activeClassName={'active'}
            />
          </div>
        </div>
      </>
    );
  }
}

export default Board;
