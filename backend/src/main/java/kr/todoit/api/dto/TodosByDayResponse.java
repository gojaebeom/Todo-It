package kr.todoit.api.dto;

import lombok.Getter;

import java.util.HashMap;
import java.util.List;

@Getter
public class TodosByDayResponse {
    private Long id;
    private String nickname;
    private String profileImg;
    private String profilePreviewImg;
    private List<HashMap<String, Object>> todos;
}
