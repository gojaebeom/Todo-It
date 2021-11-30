package kr.todoit.api.v1.dto;

import lombok.Getter;

@Getter
public class TodosByMonthResponse {
    private Long id;
    private String title;
    private String isFinished;
    private String matchedDate;
}
