package kr.todoit.api.v1.controller;

import kr.todoit.api.v1.dto.*;
import kr.todoit.api.v1.service.CalendarService;
import kr.todoit.api.v1.service.OAuth2Service;
import kr.todoit.api.v1.service.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/users")
@Slf4j
@AllArgsConstructor
public class UserController {

    private OAuth2Service oAuth2Service;
    private UserService userService;
    private CalendarService calendarService;

    @PostMapping("/join-by-oauth")
    public ResponseEntity<Map<String, Object>> joinByOauth(HttpServletRequest request,@Valid @RequestBody UserJoinRequest joinRequest) throws Exception {
        String accessTokenString = request.getHeader("authorization");
        String email = oAuth2Service.getKakaoEmailByAccessToken(accessTokenString);
        joinRequest.setEmail(email);

        TokenResponse tokenResponse = userService.joinByOauth(joinRequest);

        Map<String, Object> response = new HashMap<>();
        response.put("message","로그인이 정상적으로 처리되었습니다.");
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

    @GetMapping("/{userCode}/join/calendars/{calendarId}")
    public ResponseEntity<Map<String, Object>> joinCalendar(@Valid UserJoinCalendarRequest userJoinCalendarRequest){
        System.out.println(userJoinCalendarRequest);
        userService.joinCalendar(userJoinCalendarRequest);

        Map<String, Object> response = new HashMap<>();
        response.put("message","캘린더 가입이 성공하였습니다.");
        response.put("statusCode", 200);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/logout")
    public ResponseEntity<Map<String, Object>> logout(){
        log.info("로그아웃 요청 -> RFT 쿠키 제거");
        Map<String, Object> response = new HashMap<>();
        ResponseCookie responseCookie = ResponseCookie.from("rft", null)
                .httpOnly(true)
                .path("/")
                .maxAge(0)
                .sameSite("Strict")
                .build();
        response.put("message","로그아웃이 정상적으로 처리되었습니다.");
        response.put("statusCode", 200);
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, responseCookie.toString()).body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> show(@PathVariable Long id) {
        UserDetailResponse userDetailResponse = userService.show(id);
        List<CalendarListResponse> calendarListResponseList = calendarService.find(id);

        Map<String, Object> data = new HashMap<>();
        data.put("user", userDetailResponse);
        data.put("calendars", calendarListResponseList);

        Map<String, Object> response = new HashMap<>();
        response.put("message","회원 데이터를 정상적으로 가져왔습니다.");
        response.put("statusCode", 200);
        response.put("data", data);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> edit(@Valid UserEditRequest userEditRequest) throws IOException {
        userService.edit(userEditRequest);

        Map<String, Object> response = new HashMap<>();
        response.put("message","회원 데이터를 정상적으로 수정하였습니다.");
        response.put("statusCode", 200);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> delete(@PathVariable Long id) {
        userService.delete(id);
        Map<String, Object> response = new HashMap<>();
        response.put("message","회원 데이터를 정상적으로 삭제했습니다.");
        response.put("statusCode", 200);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}/images")
    public ResponseEntity<Map<String, Object>> deleteImages(@PathVariable Long id) {
        userService.deleteImages(id);
        Map<String, Object> response = new HashMap<>();
        response.put("message","회원 이미지를 정상적으로 삭제했습니다.");
        response.put("statusCode", 200);
        return ResponseEntity.ok(response);
    }
}