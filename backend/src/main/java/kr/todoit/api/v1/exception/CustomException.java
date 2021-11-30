package kr.todoit.api.v1.exception;

import lombok.Getter;

public class CustomException extends RuntimeException{

    @Getter
    private BaseExceptionType exceptionType;

    public CustomException(BaseExceptionType exceptionType) {
        super(exceptionType.getErrorMessage());
        this.exceptionType = exceptionType;
    }

    public String getErrorMessage(){
        return exceptionType.getErrorMessage();
    }

    public int getErrorCode(){
        return exceptionType.getErrorCode();
    }

    public int getHttpStatus(){
        return exceptionType.getHttpStatus();
    }
}
