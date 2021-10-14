package kr.todoit.api.controller;

import kr.todoit.api.dto.NotificationFindRequest;
import kr.todoit.api.dto.NotificationFindResponse;
import kr.todoit.api.dto.NotificationStoreRequest;
import kr.todoit.api.service.NotificationService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
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
    public ResponseEntity<Map<String, Object>> find(@Valid NotificationFindRequest notificationFindRequest){
        List<NotificationFindResponse> notificationFindResponses = notificationService.find(notificationFindRequest);

        Map<String, Object> response = new HashMap<>();
        response.put("message","알람을 성공적으로 불러왔습니다.");
        response.put("statusCode", 200);
        response.put("data", notificationFindResponses);
        return ResponseEntity.ok(response);
    }

    @PostMapping("")
    public ResponseEntity<Map<String, Object>> store(@Valid NotificationStoreRequest notificationStoreRequest){
        notificationService.store(notificationStoreRequest);

        Map<String, Object> response = new HashMap<>();
        response.put("message","알람을 성공적으로 저장했습니다.");
        response.put("statusCode", 200);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}/is-confirmed")
    public ResponseEntity<Map<String, Object>> editIsConfirmed(@PathVariable Long id){
        notificationService.editIsConfirmed(id);

        Map<String, Object> response = new HashMap<>();
        response.put("message","알람을 성공적으로 수정했습니다.");
        response.put("statusCode", 200);
        return ResponseEntity.ok(response);
    }
}