import { Component } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import '../css/page.css';
import A_list from '../components/A_list';

class AnswerList extends Component {
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
      .get('http://localhost:8081/api/question/admin_alist')
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
          <h1>답변 내역</h1>
          <br></br>
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">문의번호</th>
                <th scope="col">답변한 제목</th>
                <th scope="col">답변한 아이디</th>
                <th scope="col">답변한 날짜</th>
                <th scope="col">삭제</th>
              </tr>
            </thead>
            {this.state.tableData
              ? this.state.tableData.map((k) => {
                  return (
                    <A_list
                      key={k.idx}
                      idx={k.idx}
                      id={k.id}
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

export default AnswerList;
