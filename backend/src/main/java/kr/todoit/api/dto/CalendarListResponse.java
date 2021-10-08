package kr.todoit.api.dto;

import kr.todoit.api.domain.User;
import lombok.Builder;
import lombok.Getter;

import java.util.HashMap;
import java.util.List;

@Getter
public class CalendarListResponse {
    private Long id;
    private Long userId;
    private String name;
    private Byte isPrivate;
    private String thumbnailPreview;
    private List<User> members;

    @Builder
    public CalendarListResponse(Long id, Long userId, String name, Byte isPrivate, String thumbnailPreview, List<User> members) {
        this.id = id;
        this.userId = userId;
        this.name = name;
        this.isPrivate = isPrivate;
        this.thumbnailPreview = thumbnailPreview;
        this.members = members;
    }

    public static CalendarListResponse of(HashMap<String, Object> calendar, List<User> users) {
        return CalendarListResponse.builder()
                .id(Long.parseLong(calendar.get("id").toString()))
                .userId(Long.parseLong(calendar.get("user_id").toString()))
                .name(calendar.get("name").toString())
                .thumbnailPreview(calendar.get("thumbnail_preview").toString())
                .isPrivate(Byte.parseByte(calendar.get("is_private").toString()))
                .members(users)
                .build();
    }
}
