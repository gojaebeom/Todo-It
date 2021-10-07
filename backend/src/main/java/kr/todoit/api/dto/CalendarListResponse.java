package kr.todoit.api.dto;

import lombok.Getter;

import java.util.HashMap;
import java.util.List;

@Getter
public class CalendarListResponse {
    private Long id;
    private String name;
    private Byte isPrivate;
    private String thumbnailPreview;
    private List<HashMap<String, Object>> members;
}
