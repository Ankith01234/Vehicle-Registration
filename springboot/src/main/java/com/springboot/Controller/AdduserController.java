package com.springboot.Controller;

import com.springboot.DTO.Emaildata;
import com.springboot.Entity.Adduser;
import com.springboot.Entity.Addvehicle;
import com.springboot.Entity.Buyer;
import com.springboot.Entity.Rtostaff;
import com.springboot.Repository.AdduserRepository;
import com.springboot.Repository.AddvehicleRepository;
import com.springboot.Repository.BuyerRepository;
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
public class AdduserController
{
    @Autowired
    AdduserRepository adduserRepository;

    @Autowired
    Smtpsserviceclass smtpsserviceclass;

    @Autowired
    RtoStaffRepository rtoStaffRepository;

    @Autowired
    BuyerRepository buyerRepository;

    @Autowired
    AddvehicleRepository addvehicleRepository;

    @PostMapping("/addUser/{rtoid}")
    public ResponseEntity<?> addUserVal(@RequestBody Adduser obj,@PathVariable String rtoid)
    {
        Optional<Adduser> U=adduserRepository.findByUseremail(obj.getUseremail());
        if(U.isPresent())
            return new ResponseEntity<>("User Already Exists", HttpStatus.OK);
        else
        {
            Optional<Rtostaff>R=rtoStaffRepository.findById(Integer.parseInt(rtoid));
            if(R.isPresent())
            {
                Rtostaff rtostaff=R.get();
                obj.setRtostaff(rtostaff);
                Random rnd = new Random();
                int id = rnd.nextInt(100000, 999999);
                int password = rnd.nextInt(1000, 9999);
                obj.setUserid(id);
                obj.setUserpswd(String.valueOf(password));
                adduserRepository.save(obj);

//                Emaildata emaildata = new Emaildata();
//                emaildata.setRecipient(obj.getUseremail());
//                emaildata.setSubject("Login Credentials");
//                String message = "Your Name is added to the rto office for more information you can login to your site & your Id:" + id + " Password:" + password;
//                emaildata.setMessage(message);
//
//                String msg = smtpsserviceclass.sendUserEmail(emaildata);
//
//                if (msg.equals("Mail Sent Successfully"))
//                    return new ResponseEntity<>("User Data Added Successfully", HttpStatus.OK);
//                else
//                    return new ResponseEntity<>(msg, HttpStatus.OK);
                return new ResponseEntity<>("User Data Added Successfully",HttpStatus.OK);
            }
            else
                return new ResponseEntity<>("RtoStaff Id is Not Present",HttpStatus.OK);
        }
    }

    @GetMapping("/getUser")
    public ResponseEntity<?> getUserVal()
    {
        List<Adduser>lists=adduserRepository.findAll();
        return new ResponseEntity<>(lists,HttpStatus.OK);
    }

    @GetMapping("/getParticularUser/{id}")
    public ResponseEntity<?> getUserBased(@PathVariable String id)
    {
        List<Adduser>lists=adduserRepository.findByAllUser(Integer.parseInt(id));
        return new ResponseEntity<>(lists,HttpStatus.OK);
    }

    @PostMapping("/addBuyerToUser/{buyername}/{vehno}")
    public ResponseEntity<?> addBuyer(@PathVariable String buyername,@PathVariable String vehno)
    {
        Optional<Buyer> B=buyerRepository.findByBuyername(buyername);
        Optional<Addvehicle> Ad=addvehicleRepository.findById(vehno);
        if(B.isPresent() && Ad.isPresent())
        {
            Buyer buyer=B.get();
            Addvehicle addvehicle=Ad.get();
            Rtostaff rtostaff=addvehicle.getRtostaff();
            Adduser adduser=new Adduser();
            adduser.setUserid(buyer.getBuyerid());
            adduser.setAddress(buyer.getBuyeraddress());
            adduser.setUseremail(buyer.getBuyeremail());
            adduser.setUsername(buyer.getBuyername());
            adduser.setUserphone(buyer.getBuyerphone());
            adduser.setUserpswd(buyer.getBuyerpassword());
            adduser.setRtostaff(rtostaff);
            adduserRepository.save(adduser);
            return new ResponseEntity<>("Buyer Details added to adduser Successfully",HttpStatus.OK);
        }
        else
            return new ResponseEntity<>("Vehicle Number or Buyer Id Mismatch",HttpStatus.OK);
    }

}
