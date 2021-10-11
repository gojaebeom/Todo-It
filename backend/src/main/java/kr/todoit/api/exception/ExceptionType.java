package kr.todoit.api.exception;

import lombok.Getter;

@Getter
public enum ExceptionType implements BaseExceptionType{
    // 유저
    NOT_FOUND_USER(1001, 200, "해당하는 사용자가 존재하지 않습니다."),
    DUPLICATED_USER(1002, 200, "이미 존재하는 사용자 아이디입니다."),
    LOGIN_INFO_NOT_FOUND(1003, 200, "로그인 정보를 찾을 수 없습니다.(세션 만료)"),
    // 캘린더
    NOT_FOUND_CALENDAR(2001, 200, "유효한 캘린더가 없습니다"),
    DID_INVITE(2002, 200, "캘린더에 존재하는 유저입니다."),
    // 알림
    NOT_FOUND_FROM_USER(3001, 200, "받는 회원을 확인할 수 없습니다."),
    NOT_FOUND_TO_USER(3002, 200, "발송자를 확인할 수 없습니다.");

    private int errorCode;
    private int httpStatus;
    private String errorMessage;

    ExceptionType(int errorCode, int httpStatus, String errorMessage){
        this.errorCode = errorCode;
        this.httpStatus = httpStatus;
        this.errorMessage = errorMessage;
    }
}
