package kr.todoit.api.v1.service;

import kr.todoit.api.v1.domain.Calendar;
import kr.todoit.api.v1.domain.CalendarGroup;
import kr.todoit.api.v1.domain.Notification;
import kr.todoit.api.v1.domain.User;
import kr.todoit.api.v1.dto.*;
import kr.todoit.api.v1.exception.CustomException;
import kr.todoit.api.v1.exception.ExceptionType;
import kr.todoit.api.v1.mapper.UserMapper;
import kr.todoit.api.v1.repository.CalendarGroupRepository;
import kr.todoit.api.v1.repository.CalendarRepository;
import kr.todoit.api.v1.repository.NotificationRepository;
import kr.todoit.api.v1.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.naming.AuthenticationException;
import java.io.IOException;
import java.util.HashMap;
import java.util.UUID;

@Service
@Transactional
@AllArgsConstructor
@Slf4j
public class UserService {

    private TokenService tokenService;

    private UserRepository userRepository;
    private UserMapper userMapper;

    private CalendarService calendarService;
    private CalendarRepository calendarRepository;
    private CalendarGroupRepository calendarGroupRepository;

    private NotificationRepository notificationRepository;

    private ImageService imageService;

    public TokenResponse joinByOauth(UserJoinRequest userJoinRequest) throws AuthenticationException, IOException {
        User user = userRepository.findByEmail(userJoinRequest.getEmail());

        if(user == null){
            log.info("회원등록이 안된 유저 -> 회원가입 진행");

            String randomCode;
            while (true){
                log.info("랜덤 닉네임 추출 -> 중복시 반복");
                String randomUUID = UUID.randomUUID().toString();
                randomCode = randomUUID.split("-")[4];
                Short userCodeCount = userRepository.countByUserCode(randomCode);
                if(userCodeCount == 0) break;
            }

            userJoinRequest.setUserCode(randomCode);
            user = userJoinRequest.toUser();
            userRepository.save(user);

            CalendarStoreRequest calendarStoreRequest = CalendarStoreRequest.builder()
                    .userId(user.getId())
                    .name("개인일정")
                    .isPrivate((byte) 1)
                    .isDefault((byte) 1)
                    .build();
            calendarService.store(calendarStoreRequest);

            Notification notification = Notification.builder()
                    .toUser(user)
                    .fromUser(user)
                    .type("WELCOME")
                    .content("Todo-it을 방문해주셔서 감사합니다!")
                    .isConfirmed((byte)0)
                    .build();
            notificationRepository.save(notification);
        }

        log.info("자동로그인 진행 -> 토큰 발급");
        HashMap<String, Object> actInfo = tokenService.getAct(user.getId());
        HashMap<String, Object> rftInfo = tokenService.getRft(user.getId());

        return TokenResponse.builder()
                .actInfo(actInfo)
                .rftInfo(rftInfo)
                .build();
    }

    public UserDetailResponse show(Long id) {
        return userMapper.findOneById(id);
    }

    public void joinCalendar(UserJoinCalendarRequest userJoinCalendarRequest) {

        User user = userRepository.findByUserCode(userJoinCalendarRequest.getUserCode());
        if(user == null){
            log.info("유효한 유저코드 없음");
            throw new CustomException(ExceptionType.NOT_FOUND_USER);
        }

        Calendar calendar = calendarRepository.findCalendarById(userJoinCalendarRequest.getCalendarId());
        if(calendar == null){
            log.info("유효한 캘린더가 없음");
            throw new CustomException(ExceptionType.NOT_FOUND_CALENDAR);
        }
        Long calendarGroupCount = calendarGroupRepository.countByUserAndCalendar(user, calendar);
        if(calendarGroupCount != 0){
            log.info("이미 가입한 유저");
            throw new CustomException(ExceptionType.DID_INVITE);
        }

        CalendarGroup calendarGroup = userJoinCalendarRequest.toCalendarGroup(user, calendar);
        calendarGroupRepository.save(calendarGroup);
        log.info("캘린더 가입 완료");
    }

    public void edit(UserEditRequest userEditRequest) throws IOException {
        User user = userRepository.findUserById(userEditRequest.getId());
        if(userEditRequest.getProfileImg() != null){
            log.info("유저 프로필 파일 존재 -> 기존의 프로필, 프로필 프리뷰 삭제.");
            imageService.delete(user.getProfileImg());
            imageService.delete(user.getProfilePreviewImg());

            log.info("유저 프로필 파일 존재 -> 새로운 프로필, 프로필 프리뷰 이미지 생성.");
            HashMap<String, String> imageNameMap = imageService.upload(userEditRequest.getProfileImg());
            user.setProfileImg(imageNameMap.get("origin"));
            user.setProfilePreviewImg(imageNameMap.get("preview"));
        }
        if(userEditRequest.getNickname() != null){
            user.setNickname(userEditRequest.getNickname());
        }
    }

    public void delete(Long id) {
        log.info("회원삭제");
        User user = userRepository.findUserById(id);
        if(user.getProfileImg() != null){
            log.info("유저 프로필 파일 존재 -> 기존의 프로필, 프로필 프리뷰 삭제.");
            imageService.delete(user.getProfileImg());
            imageService.delete(user.getProfilePreviewImg());
        }
        userRepository.delete(user);
    }

    public void deleteImages(Long id) {
        log.info("회원삭제");
        User user = userRepository.findUserById(id);
        if(user.getProfileImg() != null){
            log.info("유저 프로필 파일 존재 -> 기존의 프로필, 프로필 프리뷰 삭제.");
            imageService.delete(user.getProfileImg());
            imageService.delete(user.getProfilePreviewImg());
            user.setProfileImg("");
            user.setProfilePreviewImg("");
        }
    }
}
