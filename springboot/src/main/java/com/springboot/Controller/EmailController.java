package com.springboot.Controller;

import com.springboot.DTO.Emaildata;
import com.springboot.Entity.Adduser;
import com.springboot.Entity.Buyer;
import com.springboot.Entity.Insurance;
import com.springboot.Entity.Policestation;
import com.springboot.Repository.AdduserRepository;
import com.springboot.Repository.BuyerRepository;
import com.springboot.Repository.InsuranceRepo;
import com.springboot.Repository.PolicestationRepository;
import com.springboot.Smtpservice.Smtpsserviceclass;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.Random;

@RestController
@CrossOrigin("*")
public class EmailController
{
    @Autowired
    AdduserRepository adduserRepository;

    @Autowired
    BuyerRepository buyerRepository;

    @Autowired
    InsuranceRepo insuranceRepo;

    @Autowired
    PolicestationRepository policestationRepository;

    @Autowired
    Smtpsserviceclass smtpsserviceclass;

    @GetMapping("/chkEmail/{email}")
    public ResponseEntity<?> checkEmail(@PathVariable String email)
    {
        Optional<Adduser> Ad=adduserRepository.findByUseremail(email);
        Optional<Buyer> B=buyerRepository.findByBuyeremail(email);
        Optional<Policestation> Ps=policestationRepository.findByStationemail(email);
        Optional<Insurance> I=insuranceRepo.findByCompanyemail(email);
        if(Ad.isPresent() || B.isPresent() || Ps.isPresent() || I.isPresent())
        {
            Random rnd=new Random();
            int otp=rnd.nextInt(1000,9999);
            Emaildata emaildata=new Emaildata();
            emaildata.setRecipient(email);
            emaildata.setOtp(otp);
            emaildata.setSubject("Email Verification");
            String Txt="Your otp is:"+String.valueOf(otp);
            emaildata.setMessage(Txt);

            String msg=smtpsserviceclass.verificationSndEmail(emaildata);

            if(msg.equals("Otp sent"))
                return new ResponseEntity<>("Otp Sent your Email Please Check", HttpStatus.OK);
            else
                return new ResponseEntity<>(msg,HttpStatus.OK);
        }
        else
            return new ResponseEntity<>("Email not found",HttpStatus.OK);
    }

    @GetMapping("/chkOtp/{otp}")
    public ResponseEntity<?> checkOtp(@PathVariable Integer otp)
    {
        Emaildata emaildata=new Emaildata();
        emaildata.setOtp(otp);

        String msg=smtpsserviceclass.verifyOtp(emaildata);

        if(msg.equals("Correct otp"))
            return new ResponseEntity<>("Entered Correct Otp",HttpStatus.OK);
        else
            return new ResponseEntity<>(msg,HttpStatus.OK);
    }

    @PutMapping("/updateGmail/{emailid}/{newpassword}")
    public ResponseEntity<?> updateEmail(@PathVariable String emailid,@PathVariable String newpassword)
    {
        Optional<Adduser> Ad=adduserRepository.findByUseremail(emailid);
        Optional<Buyer> B=buyerRepository.findByBuyeremail(emailid);
        Optional<Policestation> Ps=policestationRepository.findByStationemail(emailid);
        Optional<Insurance> I=insuranceRepo.findByCompanyemail(emailid);
        if(Ad.isPresent() && B.isPresent())
        {
            Adduser adduser=Ad.get();
            adduser.setUserpswd(newpassword);
            Buyer buyer=B.get();
            buyer.setBuyerpassword(newpassword);
            adduserRepository.save(adduser);
            buyerRepository.save(buyer);
            return new ResponseEntity<>("Password changed successfully",HttpStatus.OK);
        }
        else if(Ad.isPresent())
        {
            Adduser adduser=Ad.get();
            adduser.setUserpswd(newpassword);
            adduserRepository.save(adduser);
            return new ResponseEntity<>("Password changed successfully",HttpStatus.OK);
        }
        else if(B.isPresent())
        {
            Buyer buyer=B.get();
            buyer.setBuyerpassword(newpassword);
            buyerRepository.save(buyer);
            return new ResponseEntity<>("Password changed successfully",HttpStatus.OK);
        }
        else if(Ps.isPresent())
        {
            Policestation policestation=Ps.get();
            policestation.setStationpassword(newpassword);
            policestationRepository.save(policestation);
            return new ResponseEntity<>("Password changed successfully",HttpStatus.OK);
        }
        else
        {
            Insurance insurance=I.get();
            insurance.setPassword(newpassword);
            insuranceRepo.save(insurance);
            return new ResponseEntity<>("Password changed successfully",HttpStatus.OK);
        }
    }

}
