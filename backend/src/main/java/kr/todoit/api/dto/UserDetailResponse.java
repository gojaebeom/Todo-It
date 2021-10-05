package kr.todoit.api.dto;

import kr.todoit.api.domain.User;
import lombok.Builder;
import lombok.Getter;
import java.time.LocalDateTime;

@Getter
public class UserDetailResponse {
    private Long id;
    private String email;
    private String nickname;
    private String userCode;
    private String profileImg;
    private String profilePreviewImg;
    private LocalDateTime createdAt;

    @Builder
    public UserDetailResponse(Long id, String email, String nickname, String userCode, String profileImg, String profilePreviewImg, LocalDateTime createdAt) {
        this.id = id;
        this.email = email;
        this.nickname = nickname;
        this.userCode = userCode;
        this.profileImg = profileImg;
        this.profilePreviewImg = profilePreviewImg;
        this.createdAt = createdAt;
    }
}
