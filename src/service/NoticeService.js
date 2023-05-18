import axios from 'axios'; 

// 1. spring boot api의 URL을 정의
const NOTICE_API_BASE_URL = "http://localhost:8080/m/notices";
class NoticeService {

// 2. 글 목록 데이터 불러오기
    getNotices() {
        return axios.get(NOTICE_API_BASE_URL);
    }

    createNotice(notice) {
        return axios.post(NOTICE_API_BASE_URL, notice);
    }

    // 글 상세보기 함수 추가; 경로 파라미터로 글 번호를 설정하여 통신한다
    getOneNotice(no) {
        return axios.get(NOTICE_API_BASE_URL + "/" + no);
    }

    // 글 수정 함수 추가; 경로 파라미터로 글 번호를 설정, 수정할 객체정보를 body에 담아 통신
    updateNotice(no, notice) {
        return axios.put(NOTICE_API_BASE_URL + "/" + no, notice);
    }

    // 글 수정 함수 추가; 경로 파라미터로 글 번호를 설정, 글 번호에 해당하는 글을 삭제
    deleteBoard(no) {
        return axios.delete(NOTICE_API_BASE_URL + "/" + no);
    }
}

export default new NoticeService();
