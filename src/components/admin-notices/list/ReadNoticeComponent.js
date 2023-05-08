import React, { Component } from 'react';
import NoticeService from '../../../service/NoticeService';

class ReadNoticeComponent extends Component {
    constructor(props) {
        super(props);

        // this.state에 글 상세보기에 사용될 파라미터 정의
        this.state = { 
            no: this.props.match.params.no,
            notice: {}
        }

    }

    // 페이지가 로딩될때 API와 통신하여 글 객체를 가져온다.
    componentDidMount() {
        NoticeService.getOneNotice(this.state.no).then( res => {
            this.setState({notice: res.data});
        });
    }

    // 파라미터 값에 따라 페이지에 표시할 내용을 변경
    // 게시판 타입별로 표시를 다르게 함
    returnBoardType(typeNo) {
        let type = null;
        if (typeNo == 1) {
            type = "자유게시판";

        } else if (typeNo == 2 ) {
            type = "질문과 답변 게시판";

        } else {
            type = "타입 미지정";
        }

        return (
            <div className = "row">
                <label> Notice Type : </label> {type}
            </div>
        )

    }

    returnDate(cTime, uTime) {
        return (
            <div className = "row">
                <label>생성일 : [ {cTime} ] / 최종 수정일 : [ {uTime} ] </label>
            </div>
        )
    }

    // 글 목록으로 이동하는 함수를 정의
    goToList() {
        this.props.history.push('/notice');
    }

    goToUpdate = (event) => {
        event.preventDefault();
        this.props.history.push(`/create-notice/${this.state.no}`);
    }

    // 글삭제 함수 추가. alert창을 띄워서 삭제할지를 결정.
    // alert창에서 확인 버튼이 클릭되면, API와 통신하여 글을 삭제한후 성공하면 글 목록으로 이동
    deleteView = async function () {
        if(window.confirm("정말로 글을 삭제하시겠습니까?\n삭제된 글은 복구 할 수 없습니다.")) {
            NoticeService.deleteNotice(this.state.no).then( res => {
                console.log("delete result => "+ JSON.stringify(res));
                if (res.status == 200) {
                    this.props.history.push('/notice');
                } else {
                    alert("글 삭제가 실패했습니다.");
                }
            });

        }
    }

    render() {
        return (
            <div>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className ="text-center"> Read Detail</h3>
                    <div className = "card-body">
                            {/* 게시판 타입별로 표시를 다르게 하기 */}
                            {this.returnBoardType(this.state.notice.type)} 
                            <div className = "row">      
                                {/* 파라미터 값을 그대로 표시 */}
                                <label> Title </label> : {this.state.notice.title}
                            </div>

                            <div className = "row">
                                <label> Contents </label> : <br></br>
                                <textarea value={this.state.notice.contents} readOnly/> 
                            </div >

                            <div className = "row">
                                <label> MemberNo  </label>: 
                                {this.state.notice.memberNo}
                            </div>

                            {this.returnDate(this.state.notice.createdTime, this.state.notice.updatedTime) }
                            {/* 글 목록으로 이동하는 함수 바인드 */}
                            <button className="btn btn-primary" onClick={this.goToList.bind(this)} style={{marginLeft:"10px"}}>글 목록으로 이동</button>
                            <button className="btn btn-info" onClick={this.goToUpdate} style={{marginLeft:"10px"}}>글 수정</button>
                            {/* 글 삭제 함수버튼 추가, 글 삭제 함수와 바인드*/}
                            <button className="btn btn-danger" onClick={() => this.deleteView()} style={{marginLeft:"10px"}}>글 삭제</button>
                    </div>
                </div>

            </div>
        );
    }
}

export default ReadNoticeComponent;