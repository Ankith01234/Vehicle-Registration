package com.springboot.Smtpservice;

import com.springboot.DTO.Emaildata;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

@Service
public class Smtpsserviceclass
{

    @Value("${spring.mail.username}") private String sender;

    @Autowired
    JavaMailSender javaMailSender;

    private static int token;

    public String sendEmail(@RequestBody Emaildata details)
    {
        MimeMessage mimeMessage=javaMailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper;

        try{
            mimeMessageHelper=new MimeMessageHelper(mimeMessage,true);
            mimeMessageHelper.setTo(details.getRecipient());
            mimeMessageHelper.setFrom(sender);
            mimeMessageHelper.setSubject(details.getSubject());
            mimeMessageHelper.setText(details.getMessage());

            javaMailSender.send(mimeMessage);
            return "Mail Sent Successfully";
        }
        catch (MessagingException e1)
        {
            return "Mail can't send some error!!";
        }

    }

    public String sendUserEmail(@RequestBody Emaildata details)
    {
        MimeMessage mimeMessage=javaMailSender.createMimeMessage();

        MimeMessageHelper mimeMessageHelper;

        try
        {
            mimeMessageHelper=new MimeMessageHelper(mimeMessage,true);
            mimeMessageHelper.setFrom(sender);
            mimeMessageHelper.setTo(details.getRecipient());
            mimeMessageHelper.setSubject(details.getSubject());
            mimeMessageHelper.setText(details.getMessage());

            javaMailSender.send(mimeMessage);
            return "Mail Sent Successfully";

        }
        catch (MessagingException e2){
            return "Mail can't sent, something went wrong!!!";
        }

    }

    public String sendBuyerEmail(@RequestBody Emaildata details)
    {
        MimeMessage mimeMessage=javaMailSender.createMimeMessage();

        MimeMessageHelper mimeMessageHelper;

        try {
            mimeMessageHelper=new MimeMessageHelper(mimeMessage,true);

            mimeMessageHelper.setFrom(sender);
            mimeMessageHelper.setTo(details.getRecipient());
            mimeMessageHelper.setText(details.getMessage());
            mimeMessageHelper.setSubject(details.getSubject());

            javaMailSender.send(mimeMessage);
            return "Mail sent Successfully";
        }
        catch (MessagingException e3){
            return "Mail can't sent something went wrong!!";
        }
    }

    public String verificationSndEmail(@RequestBody Emaildata details)
    {
        MimeMessage mimeMessage=javaMailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper;
        try{
            mimeMessageHelper=new MimeMessageHelper(mimeMessage,true);
            mimeMessageHelper.setFrom(sender);
            mimeMessageHelper.setTo(details.getRecipient());
            mimeMessageHelper.setSubject(details.getSubject());
            mimeMessageHelper.setText(details.getMessage());

            token=details.getOtp();

            javaMailSender.send(mimeMessage);
            return "Otp sent";
        }
        catch (MessagingException e5){
            return "Otp can't sent something went wrong";
        }
    }

    public String verifyOtp(@RequestBody Emaildata details)
    {
        if(details.getOtp()==token)
            return "Correct otp";
        else
            return "Incorrect otp";
    }

}

//  .   ____          _            __ _ _
// /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
//( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
// \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
//  '  |____| .__|_| |_|_| |_\__, | / / / /
// =========|_|==============|___/=/_/_/_/

