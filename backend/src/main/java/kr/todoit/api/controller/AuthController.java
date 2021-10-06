package kr.todoit.api.controller;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import kr.todoit.api.dto.TokenResponse;
import kr.todoit.api.service.AuthService;
import kr.todoit.api.service.TokenService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.naming.AuthenticationException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@Slf4j
@AllArgsConstructor
public class AuthController {

    private AuthService authService;

    @GetMapping("/silent-refresh")
    public ResponseEntity<?> authentication(@CookieValue(name = "rft", required = false) String token) throws AuthenticationException {
        log.info("[ 토큰 자동 갱신 컨트롤러 ]");

        if(token == null){
            log.info("쿠키 확인 -> 저장된 토큰 없음( 로그인 하지 않은 유저 )");
            throw new AuthenticationException("ERR:NOT_FINE_RFT");
        }

        TokenResponse tokenResponse = authService.verify(token);
        Map<String, Object> response = new HashMap<>();
        response.put("message","인증");
        response.put("statusCode", 200);
        response.put("act", tokenResponse.getActInfo());
        final Long time = 3600 * 24 * 14L;
        ResponseCookie responseCookie = ResponseCookie.from("rft", tokenResponse.getRftInfo().get("token").toString())
                .httpOnly(true)
                .path("/")
                .maxAge(time)
                .sameSite("Strict")
                .build();
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, responseCookie.toString()).body(response);
    }
}
