package kr.todoit.api.dto;

import kr.todoit.api.domain.User;
import lombok.Builder;
import lombok.Getter;
import java.time.LocalDateTime;

@Getter
public class UserShowResponse {
    private Long userId;
    private String name;
    private String nickname;
    private String profileImg;
    private String profilePreviewImg;
    private LocalDateTime createdAt;

    public static UserShowResponse of(User user) {
        return UserShowResponse.builder()
                .userId(user.getId())
                .name(user.getName())
                .nickname(user.getNickname())
                .profileImg(user.getProfileImg())
                .profilePreviewImg(user.getProfilePreviewImg())
                .createdAt(user.getCreatedAt())
                .build();
    }

    @Builder
    public UserShowResponse(Long userId, String name, String nickname, String profileImg, String profilePreviewImg, LocalDateTime createdAt) {
        this.userId = userId;
        this.name = name;
        this.nickname = nickname;
        this.profileImg = profileImg;
        this.profilePreviewImg = profilePreviewImg;
        this.createdAt = createdAt;
    }
}
