package kr.todoit.api.controller;

import kr.todoit.api.exception.BaseExceptionType;
import kr.todoit.api.exception.CustomException;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.naming.AuthenticationException;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
@Slf4j
public class ExceptionController {

    @ResponseBody
    @ExceptionHandler(CustomException.class)
    public ResponseEntity<?> exceptionHandler(CustomException e) {
        System.out.println("-----Custom Err Message------");
        System.out.println(e.getExceptionType());
        System.out.println(e.getErrorMessage());
        System.out.println(e.getErrorCode());
        System.out.println(e.getHttpStatus());

        Map<String, Object> error = new HashMap<>();
        String message = e.getErrorMessage() != null ? e.getErrorMessage() : "요청을 처리하지 못하였습니다.";
        error.put("message", message);
        error.put("errorCode", e.getErrorMessage());
        error.put("statusCode", e.getHttpStatus());

        Map<String, Object> response = new HashMap<>();
        response.put("error", error);
        return ResponseEntity.ok().body(response);
    }
}
