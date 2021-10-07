package kr.todoit.api.controller;

import kr.todoit.api.dto.NotificationFindRequest;
import kr.todoit.api.dto.NotificationFindResponse;
import kr.todoit.api.dto.NotificationStoreRequest;
import kr.todoit.api.service.NotificationService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/notifications")
@AllArgsConstructor
@Slf4j
public class NotificationController {
    private NotificationService notificationService;

    @GetMapping("")
    public ResponseEntity<Map<String, Object>> find(NotificationFindRequest notificationFindRequest){
        List<NotificationFindResponse> notificationFindResponses = notificationService.find(notificationFindRequest);

        Map<String, Object> response = new HashMap<>();
        response.put("message","알람을 성공적으로 불러왔습니다.");
        response.put("statusCode", 200);
        response.put("data", notificationFindResponses);
        return ResponseEntity.ok(response);
    }

    @PostMapping("")
    public ResponseEntity<Map<String, Object>> store(NotificationStoreRequest notificationStoreRequest){
        System.out.println(notificationStoreRequest);
        notificationService.store(notificationStoreRequest);

        Map<String, Object> response = new HashMap<>();
        response.put("message","알람을 성공적으로 저장했습니다.");
        response.put("statusCode", 200);
        return ResponseEntity.ok(response);
    }
}
