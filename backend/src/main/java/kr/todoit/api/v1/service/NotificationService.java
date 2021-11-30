package kr.todoit.api.v1.service;

import kr.todoit.api.v1.domain.Notification;
import kr.todoit.api.v1.domain.User;
import kr.todoit.api.v1.dto.NotificationFindRequest;
import kr.todoit.api.v1.dto.NotificationFindResponse;
import kr.todoit.api.v1.dto.NotificationStoreRequest;
import kr.todoit.api.v1.exception.CustomException;
import kr.todoit.api.v1.exception.ExceptionType;
import kr.todoit.api.v1.mapper.NotificationMapper;
import kr.todoit.api.v1.repository.NotificationRepository;
import kr.todoit.api.v1.repository.UserRepository;
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
            throw new CustomException(ExceptionType.NOT_FOUND_TO_USER);
        }
        User fromUser = userRepository.findUserById(notificationStoreRequest.getFromUserId());
        if(fromUser == null){
            throw new CustomException(ExceptionType.NOT_FOUND_FROM_USER);
        }

        Notification notification = notificationStoreRequest.toNotification(fromUser, toUser);
        notificationRepository.save(notification);
    }

    public List<NotificationFindResponse> find(NotificationFindRequest notificationFindRequest) {
        return notificationMapper.findAllByToUserId(notificationFindRequest.getToUserId());
    }

    public void editIsConfirmed(Long id) {
        Notification notification = notificationRepository.findOneById(id);
        notification.setIsConfirmed((byte)1);
    }
}
