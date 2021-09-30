package kr.todoit.api.controller;

import kr.todoit.api.dto.CalendarStoreRequest;
import kr.todoit.api.service.CalendarService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/calendars")
@Slf4j
@AllArgsConstructor
public class CalendarController {

    private CalendarService calendarService;

    @PostMapping("")
    public ResponseEntity<?> store(HttpServletRequest request, CalendarStoreRequest storeRequest) throws IOException {
        calendarService.store(storeRequest);

        Map<String, Object> response = new HashMap<>();
        response.put("message","캘린더 생성이 정상적으로 완료되었습니다.");
        response.put("statusCode", 200);
        return ResponseEntity.ok(response);
    }
}
