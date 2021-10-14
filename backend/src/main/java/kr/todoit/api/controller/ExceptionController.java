package kr.todoit.api.controller;

import kr.todoit.api.exception.CustomException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.BindException;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
@Slf4j
public class ExceptionController {

    @ResponseBody
    @ExceptionHandler(CustomException.class)
    public ResponseEntity<?> customExceptionHandler(CustomException e) {
        System.out.println("-----Custom Err Message------");
        System.out.println(e.getExceptionType());
        System.out.println(e.getErrorMessage());
        System.out.println(e.getErrorCode());
        System.out.println(e.getHttpStatus());

        Map<String, Object> error = new HashMap<>();
        String message = e.getErrorMessage() != null ? e.getErrorMessage() : "요청을 처리하지 못하였습니다.";
        error.put("type", e.getExceptionType());
        error.put("message", message);
        error.put("errorCode", e.getErrorCode());
        error.put("statusCode", e.getHttpStatus());

        Map<String, Object> response = new HashMap<>();
        response.put("error", error);
        return ResponseEntity.ok().body(response);
    }

    @ResponseBody
    @ExceptionHandler(BindException.class)
    public ResponseEntity<?> ExceptionHandler(BindException e) {
        System.out.println("-----Bind Err Message------");
        System.out.println(e.getMessage());

        Map<String, Object> response = new HashMap<>();
        response.put("error", e.getMessage());
        return ResponseEntity.ok().body(response);
    }
}