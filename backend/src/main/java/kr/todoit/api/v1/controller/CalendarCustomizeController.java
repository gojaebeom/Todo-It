package kr.todoit.api.v1.controller;

import kr.todoit.api.v1.dto.CustomizeFindRequest;
import kr.todoit.api.v1.dto.CustomizeFindResponse;
import kr.todoit.api.v1.dto.CustomizeStoreRequest;
import kr.todoit.api.v1.service.CalendarCustomizeService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/calendar-customizes")
@AllArgsConstructor
public class CalendarCustomizeController {

    private CalendarCustomizeService calendarCustomizeService;

    @GetMapping("")
    public ResponseEntity<Map<String, Object>> findByOptions(CustomizeFindRequest customizeFindRequest){
        List<CustomizeFindResponse> customizeFindResponses = calendarCustomizeService.findByOptions(customizeFindRequest);

        Map<String, Object> response = new HashMap<>();
        response.put("message","캘린더사용자정보를 성공적으로 가져왔습니다.");
        response.put("statusCode", 200);
        response.put("data", customizeFindResponses);
        return ResponseEntity.ok(response);
    }


    @PostMapping("")
    public ResponseEntity<Map<String, Object>> store(CustomizeStoreRequest customizeStoreRequest){
        calendarCustomizeService.store(customizeStoreRequest);

        Map<String, Object> response = new HashMap<>();
        response.put("message","캘린더사용자정보를 성공적으로 수정했습니다.");
        response.put("statusCode", 200);
        return ResponseEntity.ok(response);
    }
}
