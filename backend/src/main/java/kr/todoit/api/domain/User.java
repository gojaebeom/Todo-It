package kr.todoit.api.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Table(name = "users")
@Entity
@Getter
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "email", length = 50, nullable = false, unique = true)
    private String email;

    @Column(name ="name", length = 20)
    private String name;

    @Column(name = "nickname", length = 20, nullable = false, unique = true)
    private String nickname;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @Builder
    public User(Long id, String email, String name, String nickname) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.nickname = nickname;
    }
}
