package kr.todoit.api.dto;

import lombok.Getter;

import javax.validation.constraints.NotNull;
import java.util.HashMap;
import java.util.List;

@Getter
public class CalendarDetailResponse {
    @NotNull(message = "캘린더 아이디는 필수값입니다.")
    private Long id;
    private String name;
    private Byte isPrivate;
    private String thumbnail;
    private String thumbnailPreview;
    private List<HashMap<String, Object>> members;
}
