package kr.todoit.api.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import javax.naming.AuthenticationException;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
@Slf4j
public class ExceptionController {
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity IllegalArgumentExceptionHandler(IllegalArgumentException e) {
        log.error(e.getMessage());
        Map<String, Object> response = new HashMap<>();
        String message = e.getMessage() != null ? e.getMessage() : "잘못된 요청입니다.";
        response.put("message", message);
        response.put("statusCode", 400);
        return ResponseEntity.badRequest().body(response);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity MethodArgumentNotValidExceptionHandler(MethodArgumentNotValidException e) {
        System.out.println("-----MethodArgumentNotValidException Err------");
        log.error(e.getMessage());
        Map<String, Object> response = new HashMap<>();
        String message = e.getMessage() != null ? e.getMessage() : "잘못된 요청입니다.";
        response.put("message", message);
        response.put("statusCode", 400);
        return ResponseEntity.badRequest().body(response);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity exceptionHandler(Exception e) {
        System.out.println("-----Exception Err------");
        System.out.println(e.getMessage());
        System.out.println(e);
        log.error(e.getMessage());
        Map<String, Object> response = new HashMap<>();
        String message = e.getMessage() != null ? e.getMessage() : "요청을 처리하지 못하였습니다.";
        response.put("message", message);
        response.put("statusCode", 500);
        return ResponseEntity.internalServerError().body(response);
    }

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity AuthenticationException(AuthenticationException e) {
        log.error(e.getMessage());
        Map<String, Object> response = new HashMap<>();
        String message = e.getMessage() != null ? e.getMessage() : "요청을 처리하지 못하였습니다.";
        response.put("message", message);
        response.put("statusCode", 500);
        return ResponseEntity.internalServerError().body(response);
    }
}
