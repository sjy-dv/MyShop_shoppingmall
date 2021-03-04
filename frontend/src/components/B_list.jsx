import {Component} from 'react';
import Moment from 'react-moment';

class B_list extends Component{

    detail(idx){
        window.sessionStorage.removeItem('boardidx');
        window.sessionStorage.setItem('boardidx',this.props.idx);
        window.location.href = '/boardpage';
    }

    render(){

        return(
            <tbody>
            <th scope="row">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.props.idx}</th>
                <td><a onClick={(e) => {this.detail(this.props.idx)}}>{this.props.title}</a></td>
                <td>{this.props.writer}</td>
                <td><Moment format = "YYYY 년 MM 월 DD 일 HH시 mm분">{this.props.created}</Moment></td>
            </tbody>
        )
    }
}



export default B_list;