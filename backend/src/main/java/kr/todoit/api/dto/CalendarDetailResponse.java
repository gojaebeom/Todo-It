package kr.todoit.api.dto;

import lombok.Getter;

import java.util.HashMap;
import java.util.List;

@Getter
public class CalendarDetailResponse {
    private Long id;
    private String name;
    private Byte isPrivate;
    private String thumbnail;
    private String thumbnailPreview;
    private List<HashMap<String, Object>> members;
}
