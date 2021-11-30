package kr.todoit.api.v1.domain;

import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Table(name = "notifications")
@Entity
@NoArgsConstructor
@Setter
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "to_user")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User toUser;

    @ManyToOne
    @JoinColumn(name = "from_user")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User fromUser;

    @Column(name = "content", length = 100)
    private String content;

    @Column(name ="type")
    private String type;

    @Column(name = "is_confirmed")
    private Byte isConfirmed;

    @Column(name = "action_url")
    private String actionUrl;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @Builder
    public Notification(Long id, User toUser, User fromUser, String content, String type, Byte isConfirmed, String actionUrl) {
        this.id = id;
        this.toUser = toUser;
        this.fromUser = fromUser;
        this.content = content;
        this.type = type;
        this.isConfirmed = isConfirmed;
        this.actionUrl = actionUrl;
    }
}
