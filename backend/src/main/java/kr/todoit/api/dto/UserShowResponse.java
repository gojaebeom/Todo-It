package kr.todoit.api.dto;

import kr.todoit.api.domain.User;
import lombok.Builder;
import lombok.Getter;
import java.time.LocalDateTime;

@Getter
public class UserShowResponse {
    private Long userId;
    private String email;
    private String nickname;
    private String userCode;
    private String profileImg;
    private String profilePreviewImg;
    private LocalDateTime createdAt;

    public static UserShowResponse of(User user) {
        return UserShowResponse.builder()
                .userId(user.getId())
                .email(user.getEmail())
                .userCode(user.getUserCode())
                .nickname(user.getNickname())
                .profileImg(user.getProfileImg())
                .profilePreviewImg(user.getProfilePreviewImg())
                .createdAt(user.getUpdatedAt())
                .build();
    }

    @Builder
    public UserShowResponse(Long userId, String email, String nickname, String userCode, String profileImg, String profilePreviewImg, LocalDateTime createdAt) {
        this.userId = userId;
        this.email = email;
        this.nickname = nickname;
        this.userCode = userCode;
        this.profileImg = profileImg;
        this.profilePreviewImg = profilePreviewImg;
        this.createdAt = createdAt;
    }
}
