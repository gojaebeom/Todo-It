package kr.todoit.api.v1.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class NotificationFindRequest {
    private Long toUserId;
}
