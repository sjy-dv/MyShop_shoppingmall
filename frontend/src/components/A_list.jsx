import {Component} from 'react';
import Moment from 'react-moment';
import {withRouter} from 'react-router-dom';

class A_list extends Component{

    incontent(idx){
        window.sessionStorage.removeItem('contentid');
        window.sessionStorage.setItem('contentid',this.props.idx);
        this.props.history.push('/adminAnswer');
    }

    render(){

        return(
        <tbody>
            <tr>
                <td className="align-middle">{this.props.idx}</td>
                <td className="align-middle"><a onClick={(e) =>{this.incontent(this.props.idx)}}>{this.props.title}</a></td>
                <td className="align-middle">{this.props.id}</td>
                <td className="align-middle"><Moment format = "YYYY 년 MM 월 DD 일 HH시 mm분">{this.props.date}</Moment></td>
                <td className="align-middle"><button className="btn btn-danger" onClick={(e) =>{this.delete(this.props.idx)}}>삭제</button></td>
            </tr>
        </tbody>
        )
    }
}

export default withRouter(A_list);