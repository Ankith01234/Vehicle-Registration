package com.springboot.Controller;

import com.springboot.DTO.Emaildata;
import com.springboot.Entity.Buyer;
import com.springboot.Repository.BuyerRepository;
import com.springboot.Smtpservice.Smtpsserviceclass;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.Random;

@RestController
@CrossOrigin("*")
public class BuyerController
{
    @Autowired
    BuyerRepository buyerRepository;

    @Autowired
    Smtpsserviceclass smtpsserviceclass;

    @PostMapping("/addBuyer")
    public ResponseEntity<?> addBuyerRegister(@RequestBody Buyer obj)
    {
        Optional<Buyer> B=buyerRepository.findByBuyeremail(obj.getBuyeremail());
        if(B.isPresent())
            return new ResponseEntity<>("Buyer Already Exists", HttpStatus.ALREADY_REPORTED);
        else
        {
            Random rnd=new Random();
            int id=rnd.nextInt(100000,999999);
            int password=rnd.nextInt(1000,9999);
            obj.setBuyerid(id);
            obj.setBuyerpassword(String.valueOf(password));
            buyerRepository.save(obj);

            Emaildata emaildata=new Emaildata();
            emaildata.setRecipient(obj.getBuyeremail());
            emaildata.setSubject("Login Credentials");
            String Message="You have Successfully created the Account as Buyer your Id:"+id+" Password:"+password;
            emaildata.setMessage(Message);

            String msg=smtpsserviceclass.sendBuyerEmail(emaildata);

            if(msg.equals("Mail sent Successfully"))
                return new ResponseEntity<>("Buyer account Registered Successfully",HttpStatus.OK);
            else
                return new ResponseEntity<>(msg,HttpStatus.OK);

            //return new ResponseEntity<>("Buyer account Registered Successfully",HttpStatus.OK);
        }
    }

    @PostMapping("/chkBuyer/{userid}/{password}")
    public ResponseEntity<?> chkBuyerAccount(@PathVariable Integer userid,@PathVariable String password)
    {
        Optional<Buyer> B=buyerRepository.findById(userid);
        if(B.isPresent())
        {
            Buyer buyer=B.get();
            if(buyer.getBuyerpassword().equals(password))
                return new ResponseEntity<>("Correct Password",HttpStatus.OK);
            else
                return new ResponseEntity<>("Incorrect Password",HttpStatus.OK);
        }
        else
            return new ResponseEntity<>("Buyer has no Account",HttpStatus.OK);
    }

    @GetMapping("/getBuyerDetailsToRto/{buyername}")
    public ResponseEntity<?> getBuyerDet(@PathVariable String buyername)
    {
        Optional<Buyer> B=buyerRepository.findByBuyername(buyername);
        if(B.isPresent())
        {
            Buyer buyer=B.get();
            return new ResponseEntity<>(buyer,HttpStatus.OK);
        }
        else
            return new ResponseEntity<>("Buyer not Found",HttpStatus.OK);
    }

}

//  .   ____          _            __ _ _
// /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
//( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
// \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
//  '  |____| .__|_| |_|_| |_\__, | / / / /
// =========|_|==============|___/=/_/_/_/
