import { Component } from 'react';
import axios from 'axios';

class B_product extends Component {


    backup(idx){

        axios.post('http://localhost:8081/api/product/backup',{
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

    render(){

        return(       
        <tbody>
        <tr>
            <td className="align-middle"><img src={this.props.img} style={{width:'80px',height:'80px'}}></img></td>
            <td className="align-middle">{this.props.name}</td>
            <td className="align-middle">{this.props.content}</td>
            <td className="align-middle">{this.props.price}</td>
            <td className="align-middle"><button className="btn btn-primary" onClick={(e) =>{this.backup(this.props.idx)}}>복원</button></td>
        </tr>
    </tbody>
        )
    }
}

export default B_product;