package kr.todoit.api.v1.dto;

import lombok.Getter;

@Getter
public class NotificationFindResponse {
    private Long id;
    private String type;
    private String actionUrl;
    private String content;
}
