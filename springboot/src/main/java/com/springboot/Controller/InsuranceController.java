package com.springboot.Controller;

import com.springboot.DTO.Emaildata;
import com.springboot.Entity.Insurance;
import com.springboot.Repository.InsuranceRepo;
import com.springboot.Smtpservice.Smtpsserviceclass;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Random;

@RestController
@CrossOrigin("*")
public class InsuranceController
{
    @Autowired
    InsuranceRepo insurancecompanyRepo;

    @Autowired
    Smtpsserviceclass smtpsserviceclass;

    @PostMapping("/addInsuranceCompany")
    public ResponseEntity<?> addInsuranceCompanyDetails(@RequestBody Insurance obj)
    {
        Optional<Insurance> I=insurancecompanyRepo.findByCompanyemail(obj.getCompanyemail());
        if(I.isPresent())
            return new ResponseEntity<>("Company Already Exists in the database",HttpStatus.OK);
        else
        {
            Random rnd = new Random();
            int id = rnd.nextInt(100000, 999999);
            int password = rnd.nextInt(1000, 9999);
            obj.setCompanyid(id);
            obj.setPassword(String.valueOf(password));

            Emaildata emaildata=new Emaildata();
            emaildata.setRecipient(obj.getCompanyemail());
            emaildata.setSubject("Login Credentials");
            String txt="Your Insurance Comapany Id: "+id+" Password:"+password;
            emaildata.setMessage(txt);

            String msg=smtpsserviceclass.sendEmail(emaildata);

            if(msg.equals("Mail Sent Successfully"))
            {
                insurancecompanyRepo.save(obj);
                return new ResponseEntity<>("Insurance Company Added Successfully", HttpStatus.OK);
            }
            else
                return new ResponseEntity<>(msg,HttpStatus.OK);
        }
    }

    @GetMapping("/getAllInsurance")
    public ResponseEntity<?> getAllInsuranceVal()
    {
        List<Insurance>lst=insurancecompanyRepo.findAll();
        return new ResponseEntity<>(lst,HttpStatus.OK);
    }

    @GetMapping("/chkInsurance/{userid}/{password}")
    public ResponseEntity<?> chkInsurance(@PathVariable Integer userid,@PathVariable String password)
    {
        Optional<Insurance>L=insurancecompanyRepo.findById(userid);
        if(L.isPresent())
        {
            Insurance insurancecompany=L.get();
            if(insurancecompany.getPassword().equals(password))
                return new ResponseEntity<>("Correct Password",HttpStatus.OK);
            else
                return new ResponseEntity<>("Incorrect Password",HttpStatus.OK);
        }
        else
            return new ResponseEntity<>("Don't have Insurance Account",HttpStatus.OK);
    }

}
