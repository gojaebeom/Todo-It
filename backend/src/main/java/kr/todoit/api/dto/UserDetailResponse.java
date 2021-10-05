package kr.todoit.api.dto;

import kr.todoit.api.domain.User;
import lombok.Builder;
import lombok.Getter;
import java.time.LocalDateTime;

@Getter
public class UserEditResponse {
    private Long id;
    private String email;
    private String nickname;
    private String userCode;
    private String profileImg;
    private String profilePreviewImg;
    private LocalDateTime createdAt;
}
