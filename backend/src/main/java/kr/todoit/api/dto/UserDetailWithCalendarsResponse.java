package kr.todoit.api.dto;

import lombok.Getter;

import java.util.HashMap;
import java.util.List;

@Getter
public class UserDetailWithCalendarsResponse {
    private Long id;
    private HashMap<String, Object> user;
    private List<HashMap<String, Object>> calendars;
}
