package kr.todoit.api.dto;

import lombok.Getter;

import java.util.HashMap;
import java.util.List;

@Getter
public class CalendarListResponse {
//    List<HashMap<String, Object>> calendars;
    private Long id;
    private String name;
    private Byte isPrivate;
    private String thumbnail;
    private String thumbnailPreview;
}
