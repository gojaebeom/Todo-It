package kr.todoit.api.service;

import kr.todoit.api.domain.Notification;
import kr.todoit.api.domain.User;
import kr.todoit.api.dto.NotificationFindRequest;
import kr.todoit.api.dto.NotificationFindResponse;
import kr.todoit.api.dto.NotificationStoreRequest;
import kr.todoit.api.mapper.NotificationMapper;
import kr.todoit.api.repository.NotificationRepository;
import kr.todoit.api.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@Slf4j
@AllArgsConstructor
public class NotificationService {

    private UserRepository userRepository;
    private NotificationRepository notificationRepository;
    private NotificationMapper notificationMapper;

    public void store(NotificationStoreRequest notificationStoreRequest){
        User toUser = userRepository.findByUserCode(notificationStoreRequest.getToUserCode());
        if(toUser == null){
            throw new IllegalArgumentException("받는 회원을 확인할 수 없습니다.");
        }
        User fromUser = userRepository.findUserById(notificationStoreRequest.getFromUserId());
        if(fromUser == null){
            throw new IllegalArgumentException(("작성자를 확인할 수 없습니다."));
        }

        Notification notification = notificationStoreRequest.toNotification(fromUser, toUser);
        notificationRepository.save(notification);
    }

    public List<NotificationFindResponse> find(NotificationFindRequest notificationFindRequest) {
        return notificationMapper.findAllByToUserId(notificationFindRequest.getToUserId());
    }
}
