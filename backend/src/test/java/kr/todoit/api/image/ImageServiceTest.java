package kr.todoit.api.image;

import org.imgscalr.Scalr;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockMultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

@SpringBootTest
public class ImageServiceTest {
    @Value("${custom.path.upload-images}")
    String uploadPath;

    @Test
    public void uploadTest(){

    }

    @Test
    public void pathTest() throws IOException {
        String fileName = "cover";
        String contentType = "jpg";
        String path = "C:/images/cover.jpg";

        FileInputStream fileInputStream = new FileInputStream(new File(path));
        MockMultipartFile multipartFile = new MockMultipartFile(fileName, fileName + "." + contentType, contentType, fileInputStream);

        // 날짜별 폴더 생성
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
        Date date = new Date();
        String today = sdf.format(date);
        uploadPath = uploadPath.concat("/"+today);
        System.out.println(uploadPath);
        File uploadFile = new File(uploadPath);
        // 저장할 위치의 디렉토리가 존지하지 않을 경우
        if(!uploadFile.exists()){
            // mkdir() 함수와 다른 점은 상위 디렉토리가 존재하지 않을 때 그것까지 생성
            uploadFile.mkdirs();
        }
        String randomFileName = UUID.randomUUID().toString();
        final String EXT = "png";

        uploadFile = new File(uploadPath.concat("/"+randomFileName+"."+EXT));
        multipartFile.transferTo(uploadFile);

        // 썸네일 저장 편
        BufferedImage thumbnailImg = ImageIO.read(uploadFile);
        int imgWidth = Math.min(thumbnailImg.getHeight(), thumbnailImg.getWidth());
        int imgHeight = imgWidth;

        BufferedImage scaledImage = Scalr.crop(thumbnailImg, (thumbnailImg.getWidth() - imgWidth)/2, (thumbnailImg.getHeight() - imgHeight)/2, imgWidth, imgHeight, null);
        BufferedImage thumbnail = Scalr.resize(scaledImage, 200, 200, null);

        File thumbnailFile = new File(uploadPath.concat("/"+randomFileName+"-p"+"."+EXT));
        ImageIO.write(thumbnail, EXT, thumbnailFile);
    }
}
