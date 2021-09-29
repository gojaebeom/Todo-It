package kr.todoit.api.controller;

import kr.todoit.api.dto.UserJoinRequest;
import kr.todoit.api.dto.UserJoinResponse;
import kr.todoit.api.service.OAuth2Service;
import kr.todoit.api.service.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/users")
@Slf4j
@AllArgsConstructor
public class UserController {

    private OAuth2Service oAuth2Service;
    private UserService userService;

    @PostMapping("/join-by-oauth")
    public ResponseEntity<?> joinByOauth(HttpServletRequest request, @Valid @RequestBody UserJoinRequest joinRequest) throws Exception {
        String accessTokenString = request.getHeader("authorization");
        String email = oAuth2Service.getKakaoEmailByAccessToken(accessTokenString);
        joinRequest.setEmail(email);

        String act = userService.joinByOauth(joinRequest);

        Map<String, Object> response = new HashMap<>();
        response.put("message","로그인이 정상적으로 처리되었습니다.");
        response.put("statusCode", 200);
        response.put("data", act);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> show(@PathVariable Long id) {

        Map<String, Object> response = new HashMap<>();
        response.put("message","로그인이 정상적으로 처리되었습니다.");
        response.put("statusCode", 200);
        response.put("data", "hello");
        return ResponseEntity.ok(response);
    }
}
