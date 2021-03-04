import React,{Component} from 'react';
import { withRouter } from 'react-router-dom';
import "../css/blog.css";
import axios from 'axios';
import store from '../store/store';
import MainPlusbtn from './MainPlusbtn';
import MainSubbtn from './MainSubbtn';

class A_product extends Component{
    constructor(props){
        super(props);
        this.state = {
            value : 1
        }
    }
    componentDidMount(){
        axios.post('http://localhost:8081/api/product/checkitem',{
            idx : `${this.props.idx}`
        })
        .then(res =>{
            console.log(res)
            if(res.data.length===0){
                this.setState({
                    value : 1
                })
            }else{
                this.setState({
                    value : 2
                })
            }
        })
        .catch((error) =>{
            console.log(error)
        })

    }
    delete_go(idx){
        console.log(idx);
        axios.post('http://localhost:8081/api/product/delitem',{
            idx : `${this.props.idx}`
        })
        .then(res =>{
            console.log(res)
        })
        .catch((error) =>{
            console.log(error)
        })

        window.location.reload();
    }
    update_go(idx){
        store.dispatch({type:'update', idx:this.props.idx}); 
        this.props.history.push('/update')
    }

    render(){
        var value = this.state.value;
        var idx = this.props.idx;
        return(
            <tbody>
                <tr>
                    <td className="align-middle"><img src={this.props.img} style={{width:'80px',height:'80px'}}></img></td>
                    <td className="align-middle">{this.props.name}</td>
                    <td className="align-middle">{this.props.content}</td>
                    <td className="align-middle">{this.props.price}</td>
                    <td className="align-middle"><button className="btn btn-primary" onClick={(e) =>{this.update_go(this.props.idx)}}>수정</button></td>
                    <td className="align-middle"><button className="btn btn-danger" onClick={(e) =>{this.delete_go(this.props.idx)}}>삭제</button></td>
                   {
                        (function(){
                            if(value===1){
                                return (<MainPlusbtn idx={idx}></MainPlusbtn>)
                            }else{
                                return (<MainSubbtn idx={idx}></MainSubbtn>)
                            }
                                })()                    
                    }
                </tr>
            </tbody>
        )
    }
}

export default withRouter(A_product);