package kr.todoit.api.v1.exception;

import lombok.Getter;

@Getter
public enum ExceptionType implements BaseExceptionType{
    // 유저
    NOT_FOUND_USER(1001, 200, "해당하는 사용자가 존재하지 않습니다."),
    DUPLICATED_USER(1002, 200, "이미 존재하는 사용자 아이디입니다."),
    LOGIN_INFO_NOT_FOUND(1003, 200, "로그인 정보를 찾을 수 없습니다.(세션 만료)"),
    NOT_MATCHED_OAUTH_TOKEN(1004, 200, "Oauth 토큰 인증에 실패하였습니다."),
    LOGIN_FAILS(1005, 200, "로그인에 실패하였습니다."),
    EXPIRED_TOKEN(1006, 200, "토큰이 만료되었습니다."),
    NOT_MATCHED_TOKEN(1007, 200, "토큰이 일치하지 않습니다."),
    // 캘린더
    NOT_FOUND_CALENDAR(2001, 200, "유효한 캘린더가 없습니다"),
    DID_INVITE(2002, 200, "캘린더에 존재하는 유저입니다."),
    OVERFLOW_CALENDAR_NAME(2003, 200, "캘린더 이름은 10글자 이하로 작성해주세요."),
    NOT_DELETED_DEFAULT_CALENDAR(2004, 200, "기본 캘린더는 삭제할 수 없습니다."),
    // 투두
    TODO_STORE_FAILS(3001, 200, "저장하려는 일정정보의 회원, 또는 캘린더가 존재하지 않습니다."),
    // 알림
    NOT_FOUND_FROM_USER(4001, 200, "발송자를 확인할 수 없습니다."),
    NOT_FOUND_TO_USER(4002, 200, "받는 회원을 확인할 수 없습니다."),
    // 파일
    FILE_SIZE_OVERFLOW(5001,200, "File Size Overflow: 파일 하나의 사이즈는 최대 2MB로 제한됩니다."),
    NOT_MATCHED_FILE_TYPE(5002, 200, "Is Not Image File: jpg, png, gif, bmp 확장자 파일만 사용할 수 있습니다.");

    private int errorCode;
    private int httpStatus;
    private String errorMessage;

    ExceptionType(int errorCode, int httpStatus, String errorMessage){
        this.errorCode = errorCode;
        this.httpStatus = httpStatus;
        this.errorMessage = errorMessage;
    }
}
