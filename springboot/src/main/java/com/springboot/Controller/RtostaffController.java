package com.springboot.Controller;

import com.springboot.DTO.Emaildata;
import com.springboot.Entity.Rtostaff;
import com.springboot.Repository.RtoStaffRepository;
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
public class RtostaffController
{
    @Autowired
    RtoStaffRepository rtoRepository;

    @Autowired
    Smtpsserviceclass smtpsserviceclass;

    @PostMapping("/addRtoStaff")
    public ResponseEntity<?> addStaff(@RequestBody Rtostaff obj)
    {
        Optional<Rtostaff>L=rtoRepository.findByStaffemail(obj.getStaffemail());
        if(L.isPresent())
            return new ResponseEntity<>("Email ID Aready Exists", HttpStatus.OK);
        else
        {
            Random rnd=new Random();
            int id=rnd.nextInt(100000,999999);
            int password=rnd.nextInt(1000,9999);
            obj.setStaffid(id);
            obj.setStaffpassword(String.valueOf(password));

            Emaildata emaildata=new Emaildata();
            emaildata.setRecipient(obj.getStaffemail());
            String Message="Congrajulations You have been selected as Rto Staff & your ID:"+id+" Password:"+password;
            emaildata.setMessage(Message);
            emaildata.setSubject("Login Credentials");

            String msg=smtpsserviceclass.sendEmail(emaildata);

            if(msg.equals("Mail Sent Successfully"))
            {
                rtoRepository.save(obj);
                return new ResponseEntity<>("Rto Staff Added Successfully",HttpStatus.OK);
            }
            else
                return new ResponseEntity<>(msg,HttpStatus.OK);
        }
    }

    @GetMapping("/getAllStaff")
    public ResponseEntity<?> getAllStaffVal()
    {
        List<Rtostaff> list=rtoRepository.findAll();
        return new ResponseEntity<>(list,HttpStatus.OK);
    }

    @GetMapping("/chkRto/{userid}/{password}")
    public ResponseEntity<?> checkRTO(@PathVariable Integer userid,@PathVariable String password)
    {
        Optional<Rtostaff>L=rtoRepository.findById(userid);
        if(L.isPresent())
        {
            Rtostaff rtostaff=L.get();
            if(rtostaff.getStaffpassword().equals(password))
                return new ResponseEntity<>("Correct Password",HttpStatus.OK);
            else
                return new ResponseEntity<>("Incorrect Password",HttpStatus.OK);
        }
        else
            return new ResponseEntity<>("You Don't have an Account",HttpStatus.OK);
    }

}
