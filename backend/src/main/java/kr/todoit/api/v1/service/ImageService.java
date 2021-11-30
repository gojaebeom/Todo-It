package kr.todoit.api.v1.service;

import kr.todoit.api.v1.exception.CustomException;
import kr.todoit.api.v1.exception.ExceptionType;
import lombok.extern.slf4j.Slf4j;
import org.imgscalr.Scalr;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.*;
import java.text.SimpleDateFormat;
import java.util.*;

@Slf4j
@Component
public class ImageService {

    @Value("${custom.path.upload-images}")
    private String uploadPath;

    // 단일 파일에 대응하는 이미지 업로드
    public HashMap<String, String> upload(MultipartFile file) throws IOException {
        // 이미지 유효성 검사
        verifyFile(file);

        // 날짜별 폴더 생성
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
        Date date = new Date();
        String today = sdf.format(date);
        File uploadFile = new File(uploadPath+"/"+today);
        // 저장할 위치의 디렉토리가 존지하지 않을 경우
        if(!uploadFile.exists()){
            // mkdir() 함수와 다른 점은 상위 디렉토리가 존재하지 않을 때 그것까지 생성
            uploadFile.mkdirs();
        }

        String randomFileName = UUID.randomUUID().toString();
        final String EXT = "png";
        final String ORIGIN_FILE = "/"+today+"/"+randomFileName+"."+EXT;
        final String PREVIEW_FILE = "/"+today+"/"+randomFileName+"-p"+"."+EXT;
        final String ORIGIN_PATH = uploadPath.concat(ORIGIN_FILE);
        final String PREVIEW_PATH = uploadPath.concat(PREVIEW_FILE);
        uploadFile = new File(ORIGIN_PATH);
        file.transferTo(uploadFile);

        // 썸네일 저장 편
        BufferedImage thumbnailImg = ImageIO.read(uploadFile);
        int imgWidth = Math.min(thumbnailImg.getHeight(), thumbnailImg.getWidth());
        int imgHeight = imgWidth;

        BufferedImage scaledImage = Scalr.crop(thumbnailImg, (thumbnailImg.getWidth() - imgWidth)/2, (thumbnailImg.getHeight() - imgHeight)/2, imgWidth, imgHeight, null);
        BufferedImage thumbnail = Scalr.resize(scaledImage, 200, 200, null);

        File thumbnailFile = new File(PREVIEW_PATH);
        ImageIO.write(thumbnail, EXT, thumbnailFile);

        HashMap<String, String> imageName = new HashMap<>();
        imageName.put("origin", ORIGIN_FILE);
        imageName.put("preview", PREVIEW_FILE);

        return imageName;
    }

    // 여러 파일에 대응하는 이미지 업로드
    public List<HashMap<String, String>> uploads(List<MultipartFile> files) throws Exception {
        // TODO: 이미지 파일 없을 시 바로 리턴
        if(files.isEmpty()) return null;

        List<HashMap<String, String>> fileNames = new ArrayList<>();
        for(MultipartFile file : files) {
           HashMap<String,String> fileName = upload(file);
           fileNames.add(fileName);
        }
        return fileNames;
    }

    private void verifyFile(MultipartFile file) {
        String fileName = file.getOriginalFilename().replaceAll("\\s+","");
        log.info("[ 이미지 파일명 ]");
        log.info(fileName);
        long fileSize = file.getSize();

        String regExp = "^([\\S]+(\\.(?i)(jpg|png|gif|bmp))$)";
        System.out.println("파일 이름 : "+ fileName);
        // TODO: 이미지 파일 타입 검사
        if(!fileName.matches(regExp)){
            throw new CustomException(ExceptionType.NOT_MATCHED_FILE_TYPE);
        }
        log.info("[ 확장자 검사 OK ]");

        System.out.println("파일 사이즈 : "+ fileSize);
        final int limitSize = 2000000;
        // TODO: 이미지 사이즈 초과시 실패 응답
        if( fileSize > limitSize  ){
            throw new CustomException(ExceptionType.FILE_SIZE_OVERFLOW);
        }
        log.info("[ 파일 사이즈 검사 OK ]");
    }

    public void delete(String profileImg) {
        // 파일의 경로 + 파일명
        String filePath = uploadPath+profileImg;

        File deleteFile = new File(filePath);

        // 파일이 존재하는지 체크 존재할경우 true, 존재하지않을경우 false
        if(deleteFile.exists()) {
            // 파일을 삭제합니다.
            deleteFile.delete();
            log.info("파일을 삭제하였습니다.");
        } else {
            log.info("파일이 존재하지 않습니다.");
        }
    }
}
