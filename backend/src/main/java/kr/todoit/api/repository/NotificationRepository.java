package kr.todoit.api.repository;

import kr.todoit.api.domain.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findAllByToUserId(Long toUserId);

    Notification findOneById(Long id);
}
