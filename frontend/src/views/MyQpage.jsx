import { Component } from 'react';
import MyQ_list from '../components/MyQ_list';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import '../css/page.css';

class MyQpage extends Component {
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
    axios
      .post('http://localhost:8081/api/question/clientlist', {
        id: window.sessionStorage.getItem('id'),
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
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <>
        <div className="container">
          <br></br>
          <h1>내가 문의한 내역</h1>
          <br></br>
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">내 문의번호</th>
                <th scope="col">내가 문의한 제목</th>
                <th scope="col">내가 문의한 날짜</th>
                <th scope="col">답변상태</th>
                <th scope="col">삭제</th>
              </tr>
            </thead>
            {this.state.tableData
              ? this.state.tableData.map((k) => {
                  return (
                    <MyQ_list
                      key={k.idx}
                      idx={k.idx}
                      answered={k.answered}
                      title={k.title}
                      date={k.sending_date}
                    />
                  );
                })
              : 'DB ERROR !! 조그만 기다려주세요.'}
          </table>
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
      </>
    );
  }
}

export default MyQpage;
