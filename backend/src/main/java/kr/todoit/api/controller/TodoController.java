package kr.todoit.api.controller;

import kr.todoit.api.domain.Todo;
import kr.todoit.api.dto.*;
import kr.todoit.api.service.TodoService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<Map<String, Object>> index(@Valid TodoIndexRequest todoIndexRequest){
        System.out.println(todoIndexRequest);
        Map<String, Object> response = new HashMap<>();
        response.put("message","일정을 성공적으로 불러왔습니다.");
        if(todoIndexRequest.getMatchedDate() != null){
            List<TodosByDayResponse> todosByDayResponse = todoService.findDays(todoIndexRequest);
            response.put("statusCode", 200);
            response.put("data", todosByDayResponse);
        }else{
            List<TodosByMonthResponse> todosByDayResponse = todoService.findMonth(todoIndexRequest);
            response.put("statusCode", 200);
            response.put("data", todosByDayResponse);
        }

        return ResponseEntity.ok(response);
    }

    @PostMapping("")
    public ResponseEntity<Map<String, Object>> store(@Valid TodoStoreRequest todoStoreRequest){
        todoService.store(todoStoreRequest);

        Map<String, Object> response = new HashMap<>();
        response.put("message","일정을 성공적으로 저장했습니다.");
        response.put("statusCode", 200);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> edit(@Valid TodoEditRequest todoEditRequest){
        todoService.edit(todoEditRequest);

        Map<String, Object> response = new HashMap<>();
        response.put("message","일정을 성공적으로 수정했습니다.");
        response.put("statusCode", 200);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> delete(@PathVariable  Long id){
        todoService.delete(id);

        Map<String, Object> response = new HashMap<>();
        response.put("message","일정을 성공적으로 삭제했습니다.");
        response.put("statusCode", 200);
        return ResponseEntity.ok(response);
    }
}
