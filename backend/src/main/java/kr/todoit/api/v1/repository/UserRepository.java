package kr.todoit.api.v1.repository;

import kr.todoit.api.v1.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByEmail(String email);

    Short countByNickname(String randomNickname);

    User findUserById(Long userId);

    Short countByUserCode(String randomCode);

    User findByUserCode(String userCode);
}
