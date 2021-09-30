package kr.todoit.api.domain;

import lombok.Builder;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Table(name="calendars")
@Entity
@NoArgsConstructor
public class Calendar {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", length = 20, nullable = false)
    private String name;

    @Column(name = "is_private")
    @ColumnDefault("false")
    private Boolean isPrivate;

    @Column(name = "thumbnail", length = 150)
    private String thumbnail;

    @Column(name = "thumbnail_preview", length = 150)
    private String thumbnailPreview;

    @Column(name = "subscriber")
    @ColumnDefault("0")
    private Short subscriber;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @Builder
    public Calendar(Long id, String name, Boolean isPrivate, String thumbnail, String thumbnailPreview, Short subscriber) {
        this.id = id;
        this.name = name;
        this.isPrivate = isPrivate;
        this.thumbnail = thumbnail;
        this.thumbnailPreview = thumbnailPreview;
        this.subscriber = subscriber;
    }
}
