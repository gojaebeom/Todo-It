package kr.todoit.api.controller;

import kr.todoit.api.dto.TodoIndexRequest;
import kr.todoit.api.dto.TodoStoreRequest;
import kr.todoit.api.dto.TodosByDayResponse;
import kr.todoit.api.service.TodoService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/todos")
@AllArgsConstructor
@Slf4j
public class TodoController {
    private TodoService todoService;

    @GetMapping("")
    public ResponseEntity<?> index(@Valid TodoIndexRequest todoIndexRequest){
        System.out.println(todoIndexRequest);
        List<TodosByDayResponse> todosByDayResponse = todoService.index(todoIndexRequest);
        Map<String, Object> response = new HashMap<>();
        response.put("message","일정을 성공적으로 불러왔습니다.");
        response.put("statusCode", 200);
        response.put("data", todosByDayResponse);
        return ResponseEntity.ok(response);
    }

    @PostMapping("")
    public ResponseEntity<?> store(@Valid TodoStoreRequest todoStoreRequest){
        todoService.store(todoStoreRequest);

        Map<String, Object> response = new HashMap<>();
        response.put("message","일정을 성공적으로 저장했습니다.");
        response.put("statusCode", 200);
        return ResponseEntity.ok(response);
    }
}
