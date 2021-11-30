package kr.todoit.api.v1.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Table(name = "users")
@Entity
@Getter
@Setter
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "email", length = 50, nullable = false, unique = true)
    private String email;

    @Column(name ="nickname", length = 20)
    private String nickname;

    @Column(name = "user_code", length = 20, nullable = false, unique = true)
    private String userCode;

    @Column(name = "profile_img", length = 150)
    private String profileImg;

    @Column(name = "profile_preview_img", length = 150)
    private String profilePreviewImg;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @Builder
    public User(Long id, String email, String nickname, String userCode, String profileImg, String profilePreviewImg) {
        this.id = id;
        this.email = email;
        this.nickname = nickname;
        this.userCode = userCode;
        this.profileImg = profileImg;
        this.profilePreviewImg = profilePreviewImg;
    }
}
