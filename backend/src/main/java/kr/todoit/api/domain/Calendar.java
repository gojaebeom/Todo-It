package kr.todoit.api.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.*;

import javax.persistence.*;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.time.LocalDateTime;

@Table(name="calendars")
@Entity
@NoArgsConstructor
@Setter
@Getter
public class Calendar {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

    @Column(name = "name", length = 20, nullable = false)
    private String name;

    @Column(name = "is_private", columnDefinition = "tinyint default 1")
    private Byte isPrivate;

    @Column(name = "is_default", columnDefinition = "tinyint default 0")
    private Byte isDefault;

    @Column(name = "thumbnail", length = 200)
    private String thumbnail;

    @Column(name = "thumbnail_preview", length = 200)
    private String thumbnailPreview;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @Builder
    public Calendar(Long id, User user, String name, Byte isPrivate, Byte isDefault, String thumbnail, String thumbnailPreview) {
        this.id = id;
        this.user = user;
        this.name = name;
        this.isPrivate = isPrivate;
        this.isDefault = isDefault;
        this.thumbnail = thumbnail;
        this.thumbnailPreview = thumbnailPreview;
    }
}
