package kr.todoit.api.controller;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@Slf4j
@AllArgsConstructor
public class AuthController {

    @GetMapping("/silent-refresh")
    public ResponseEntity<?> authentication(@CookieValue(name = "rft") String cookie) {

        System.out.println(cookie);

        Map<String, Object> response = new HashMap<>();
        response.put("message","인증");
        response.put("statusCode", 200);
        response.put("data", "hello");
        return ResponseEntity.ok(response);
    }
}
