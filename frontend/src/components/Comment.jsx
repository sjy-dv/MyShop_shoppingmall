import {Component} from 'react';
import C_delete from './C_delete';

class Comment extends Component{

    render(){
        if(window.sessionStorage.id === this.props.writer){
            var value = 1;
        }
        var idx = this.props.idx;
        return(
            <>
            <br></br>
            <div className="container" style={{border:"1px solid"}}>
            <br></br>
            <p>댓글 내용</p>
            {this.props.content}
              <hr></hr>
            <span>
            작성자 : {this.props.writer}
            </span>
            <br></br><br></br>
            {
                (function(){
                    if(value === 1){
                        return(<C_delete idx ={idx}></C_delete>)
                    }
                })()
            }
            </div>
            </>
        )
    }
}

export default Comment;