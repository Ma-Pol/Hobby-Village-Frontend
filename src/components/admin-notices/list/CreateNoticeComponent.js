import React, { Component } from 'react';
import NoticeService from '../../../service/NoticeService';
import { Button } from '@mui/material';
class CreateNoticeComponent extends Component {
    constructor(props) {
        super(props);

        // this.state에 폼 양식에서 사용될 파라미터를 정의.
        this.state = {
            type: '',
            title: '',
            contents: '',
        }

        //  - 폼 양식에 값이 입력되면 this.state에 정의 된 변수의 값을 변경하도록 바인드
        // 'Save' 버튼을 클릭시 API에 글 작성 리퀘스트를 보내는 함수를 바인드

        this.changeTypeHandler = this.changeTypeHandler.bind(this);
        this.changeTitleHandler = this.changeTitleHandler.bind(this);
        this.changeContentsHandler = this.changeContentsHandler.bind(this);
        this.changeMemberNoHandler = this.changeMemberNoHandler.bind(this);
        this.createNotice = this.createNotice.bind(this);
    }

    // this.setState로 this.state에 정의된 변수에 값을 대입하게 해주는 함수를 선언
    changeTypeHandler = (event) => {
        this.setState({type: event.target.value});
    }
    
    changeTitleHandler = (event) => {
        this.setState({title: event.target.value});
    }
    
    changeContentsHandler = (event) => {
        this.setState({contents: event.target.value});
    }
   
    changeMemberNoHandler = (event) => {
        this.setState({memberNo: event.target.value});
    }

    // 'Save' 버튼을 클릭시 API에 글 작성 또는 글 수정 리퀘스트를 보냄
    createNotice = (event) => {
        event.preventDefault();
        let notice = {
            type: this.state.type,
            title: this.state.title,
            contents: this.state.contents,
        };
        console.log("notice => "+ JSON.stringify(notice));
        if (this.state.no === '_create') {
            NoticeService.createNotice(notice).then(res => {
                this.props.history.push('/notice');
            });
        } else {
            NoticeService.updateNotice(this.state.no, notice).then(res => {
                this.props.history.push('/notice');
            });
        }
    }


    // 글 작성 취소버튼이 클릭되었을때 글목록 페이지로 이동하는 함수를 선언
    cancel() {
        this.props.history.push('/notice');
    }

    // 페이지 타이틀을 글 작성인지 수정인지에 따라서 구분해서 출력 
    getTitle() {
        if (this.state.no === '_create') {
            return <h3 className="text-center">새글을 작성해주세요</h3>
        } else {
            return <h3 className="text-center">{this.state.no}글을 수정 합니다.</h3>
        }
    }

    // 페이지 로딩시 글 작성이면 비어있는 폼을, 글 수정이면 글의 객체 값을 가져와서 바인딩
    componentDidMount() {
        if (this.state.no === '_create') {
            return
        } else {
            NoticeService.getOneNotice(this.state.no).then( (res) => {
                let notice = res.data;
                console.log("notice => "+ JSON.stringify(notice));
                
                this.setState({
                        type: notice.type,
                        title: notice.title,
                        contents: notice.contents,
                    });
            });
        }
    }

    render() {
        return (
            <div>
                <div className = "container">
                    <div className = "row">
                        <div className = "card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center">공지사항 {'>'} 등록</h3>
                            <div className = "card-body">
                                <form>
                                    <div className = "form-group">
                                        <label><b> 제목 </b></label>
                                        <input type="text" name="title" className="form-control"
                                        value={this.state.title} onChange={this.changeTitleHandler}/>
                                    </div>
                                    <div className = "form-group">
                                        <label><b> 카테고리 </b></label>
                                        <select name="type" className="form-control" 
                                        value={this.state.type} onChange={this.changeTypeHandler}>
                                            <option value="1">전체</option>
                                            <option value="2">안내</option>
                                            <option value="3">이벤트</option>
                                        </select>
                                    </div>
                                    <div className = "form-group">
                                        <label><b> 내용 </b></label>
                                        <textarea name="contents" className="form-control" 
                                        value={this.state.contents} onChange={this.changeContentsHandler} cols="80" rows="20"/>
                                    </div>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft:"300px", marginTop:"100px"}}>취소</button>
                                    <button className="btn btn-success" onClick={this.createNotice} style={{backgroundColor:'#C3C36A'}}>등록</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default CreateNoticeComponent;