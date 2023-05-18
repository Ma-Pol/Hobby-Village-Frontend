import React, { Component } from 'react';
import NoticeService from '../../../service/NoticeService';

class ListNoticeComponent extends Component {
    constructor(props) {
        super(props)
    // 페이지에 표시될 글 목록데이터를 넣기위한 변수 'boards'를 this.state에 선언
        this.state = { 
            notices: []
        }
        // 글 작성 버튼을 클릭 했을 때 동작하는 'createBoard' 함수를 바인드
		this.createNotice = this.createNotice.bind(this);
    }

    // 'NoticeService'의 메소드를 호출해서 데이터를 가져온다.

    //  componentDidMount() {
    //     NoticeService.getNotices().then((res) => {
    //         this.setState({ notices: res.data});
    //     });
    // }

    // 글 작성 버튼을 클릭시 글작성 페이지로 이동하게 해주는 함수를 정의
    createNotice() {
        this.props.history.push('localhost:3000/notice/create');
    }

    // 글 제목을 클릭 했을 때 글 상세보기 페이지로 이동하게 해주는 함수를 정의
    readNotice(no) {
        this.props.history.push(`/localhost:3000/notice/read/${no}`);
    }

    // render() 함수의 내용이 실제 웹페이지에 표시된다. 
    // maps() 함수를 사용해서 'notices'의 데이터를 출력한다.
    render() {
        return (
            <div>
                <h2 className="text-center">공지사항 목록</h2>
                <div className ="row">
                <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>번호</th>
                                <th>카테고리</th>
                                <th>제목 </th>
                                <th>작성일 </th>
                                <th>조회수 </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.notices.map(
                                    notice => 
                                    <tr key = {notice.notCode}>
                                        {/* 글 제목을 클릭시 글 상세보기 페이지로 이동할 수 있도록 함수를 바인드 */}
                                        <td> <a onClick = {() => this.readNotice(notice.no)}>{notice.title} </a></td>
                                        <td> {notice.notCategory} </td>
                                        <td> {notice.notTitle} </td>
                                        <td> {notice.notDate} </td>
                                        <td> {notice.notView} </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                <div className = "row">
                    <button className="btn btn-primary" onClick={this.createNotice}> 글 작성</button>
                </div>
                </div>
            </div>
        );
    }
}

export default ListNoticeComponent;