package kr.todoit.api.uuid;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.UUID;

@SpringBootTest
public class RandomNicknameTest {

    @Test
    public void test(){
        String randomId = UUID.randomUUID().toString();
        System.out.println(randomId);
        System.out.println(randomId.split("-")[4]);
    }
}
