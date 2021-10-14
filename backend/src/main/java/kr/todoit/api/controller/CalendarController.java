package kr.todoit.api.controller;

import kr.todoit.api.dto.*;
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

    @GetMapping("")
    public ResponseEntity<Map<String, Object>> index(@Valid CalendarIndexRequest calendarIndexRequest){
        List<CalendarListResponse> calendarListResponse = calendarService.find(calendarIndexRequest);

        Map<String, Object> response = new HashMap<>();
        response.put("message","캘린더를 정상적으로 가져왔습니다.");
        response.put("statusCode", 200);
        response.put("data", calendarListResponse);
        return ResponseEntity.ok(response);
    }

    @PostMapping("")
    public ResponseEntity<Map<String, Object>> store(HttpServletRequest request, @Valid CalendarStoreRequest storeRequest) throws IOException, AuthenticationException {
        TokenService.isMatched(storeRequest.getUserId(), Long.parseLong(request.getAttribute("id").toString()));
        storeRequest.setIsPrivate((byte)0);
        System.out.println(storeRequest);
        List<CalendarListResponse> calendarListResponse = calendarService.store(storeRequest);

        Map<String, Object> response = new HashMap<>();
        response.put("message","캘린더 생성이 정상적으로 완료되었습니다.");
        response.put("statusCode", 200);
        response.put("data", calendarListResponse);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> edit(HttpServletRequest request, @Valid CalendarEditRequest editRequest) throws IOException, AuthenticationException {
        TokenService.isMatched(editRequest.getUserId(), Long.parseLong(request.getAttribute("id").toString()));
        System.out.println(editRequest);
        calendarService.edit(editRequest);

        Map<String, Object> response = new HashMap<>();
        response.put("message","캘린더 수정이 정상적으로 완료되었습니다.");
        response.put("statusCode", 200);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> delete(@PathVariable Long id){
        calendarService.delete(id);

        Map<String, Object> response = new HashMap<>();
        response.put("message","캘린더 삭제가 정상적으로 완료되었습니다.");
        response.put("statusCode", 200);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}/images")
    public ResponseEntity<Map<String, Object>> deleteImg(@PathVariable Long id){
        calendarService.deleteImages(id);

        Map<String, Object> response = new HashMap<>();
        response.put("message","캘린더 이미지 삭제가 정상적으로 완료되었습니다.");
        response.put("statusCode", 200);
        return ResponseEntity.ok(response);
    }

}