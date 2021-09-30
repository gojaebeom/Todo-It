package kr.todoit.api.domain;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Table(name = "calendar_groups")
@Entity
public class CalendarGroup {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "calendar_id")
    private Calendar calendar;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "is_superuser")
    @ColumnDefault("false")
    private Boolean isSuperUser;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
