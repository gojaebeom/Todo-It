package kr.todoit.api.dto;

import kr.todoit.api.domain.Notification;
import kr.todoit.api.domain.User;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@ToString
public class NotificationStoreRequest {
    @NotNull(message = "작성자 ID는 필수값입니다.")
    private Long fromUserId;
    @NotNull(message = "받는 회원의 유저코드는 필수값입니다.")
    private String toUserCode;
    @NotNull(message = "알람의 타입은 필수값입니다.") // INVITE_CALENDAR
    private String type;
    @NotNull(message = "action Url은 필수값입니다.")
    private String actionUrl;

    private String content;

    public Notification toNotification(User fromUser, User toUser) {
        return Notification.builder()
                .fromUser(fromUser)
                .toUser(toUser)
                .type(type)
                .content(content)
                .actionUrl(actionUrl)
                .isConfirmed((byte)0)
                .build();
    }

    @Builder
    public NotificationStoreRequest(Long fromUserId, String toUserCode, String type, String actionUrl, String content) {
        this.fromUserId = fromUserId;
        this.toUserCode = toUserCode;
        this.type = type;
        this.actionUrl = actionUrl;
        this.content = content;
    }
}
