import {Component} from 'react';
import A_product from '../components/A_product';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import '../css/page.css';

class AdminList extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            offset: 0,
            tableData: [],
            orgtableData: [],
            perPage: 5,
            currentPage: 0
        }
        this.handlePageClick = this.handlePageClick.bind(this);
    }

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.loadMoreData()
        });

    };

    loadMoreData() {
		const data = this.state.orgtableData;
		
		const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
		this.setState({
			pageCount: Math.ceil(data.length / this.state.perPage),
			tableData:slice
		})
	
    }

    componentDidMount(){
        this.getData();
    }

    getData() {
        axios
            .get(`http://localhost:8081/api/product/itemlist`)
            .then(res => {
                var data = res.data;
				
                var slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
                

                this.setState({
                    pageCount: Math.ceil(data.length / this.state.perPage),
                    orgtableData :res.data,
                    tableData:slice
                })
            });
    }
    render(){

        return(
        <>
        <div className="container">
            <br></br>
            <h1>상품 리스트</h1>
            <br></br>
                <table className="table">
                <thead className="thead-dark">
                <tr>
                    <th scope="col">상품</th>
                    <th scope="col">상품 이름</th>
                    <th scope="col">상품 설명</th>
                    <th scope="col">상품 가격</th>
                    <th scope="col">수정</th>
                    <th scope="col">삭제</th>
                    <th scope="col">메인 노출여부</th>
                </tr>
                </thead>
                {
                this.state.tableData ?
                this.state.tableData.map(k =>{
                    return (<A_product
                        key = {k.p_idx}
                        idx = {k.p_idx}
                        img = {k.p_img}
                        name = {k.p_name}
                        content = {k.p_content}
                        price = {k.p_price}
                                />)
                        }) : "DB ERROR !! 조그만 기다려주세요."
                }
                </table>
            </div>
            <div>
                <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    marginPagesDisplayed={2}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
            </div>
        </>
        )
    }
}


export default AdminList;