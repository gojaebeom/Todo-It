package kr.todoit.api.v1.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Table(name = "calendar_customizes")
@Entity
@NoArgsConstructor
@Setter
@Getter
public class CalendarCustomize {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "calendar_id")
    private Calendar calendar;

    @Column(name = "matched_date")
    private String matchedDate;

    @Column(name = "color")
    private String color;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @Builder
    public CalendarCustomize(Long id, User user, Calendar calendar, String matchedDate, String color) {
        this.id = id;
        this.user = user;
        this.calendar = calendar;
        this.matchedDate = matchedDate;
        this.color = color;
    }
}
