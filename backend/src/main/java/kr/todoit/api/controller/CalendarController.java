package kr.todoit.api.controller;

import kr.todoit.api.dto.CalendarListResponse;
import kr.todoit.api.dto.CalendarStoreRequest;
import kr.todoit.api.service.CalendarService;
import kr.todoit.api.service.TokenService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.naming.AuthenticationException;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/calendars")
@Slf4j
@AllArgsConstructor
public class CalendarController {

    private CalendarService calendarService;

    @PostMapping("")
    public ResponseEntity<?> store(HttpServletRequest request, @Valid CalendarStoreRequest storeRequest) throws IOException, AuthenticationException {
        TokenService.isMatched(storeRequest.getUserId(), Long.parseLong(request.getAttribute("id").toString()));

        System.out.println(storeRequest);
        List<CalendarListResponse> calendarListResponse = calendarService.store(storeRequest);

        Map<String, Object> response = new HashMap<>();
        response.put("message","캘린더 생성이 정상적으로 완료되었습니다.");
        response.put("statusCode", 200);
        response.put("data", calendarListResponse);
        return ResponseEntity.ok(response);
    }
}
