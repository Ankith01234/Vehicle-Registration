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
public class AddvehicleController
{
    @Autowired
    AddvehicleRepository addvehicleRepository;

    @Autowired
    RtoStaffRepository rtoStaffRepository;

    @Autowired
    AdduserRepository adduserRepository;

    @Autowired
    BuyerRepository buyerRepository;

    @Autowired
    Smtpsserviceclass smtpsserviceclass;

    @PostMapping("/addVehicle/{rtoid}/{userid}")
    public ResponseEntity<?> addVehicleVal(@RequestBody Addvehicle obj, @PathVariable String rtoid, @PathVariable Integer userid)
    {
        Random rnd=new Random();
        Optional<Rtostaff>R=rtoStaffRepository.findById(Integer.parseInt(rtoid));
        Optional<Adduser> A=adduserRepository.findById(userid);
        if(R.isPresent() && A.isPresent())
        {
            Rtostaff rtostaff=R.get();
            Adduser adduser=A.get();
            obj.setAdduser(adduser);
            obj.setRtostaff(rtostaff);
            String vehno="KA 09 M ";
            for(int i=0;i<=3;i++)
            {
                int num=rnd.nextInt(0,9);
                vehno=vehno+String.valueOf(num);
            }
            //System.out.println(vehno);
            Optional<Addvehicle>Ad=addvehicleRepository.findByVehiclenumber(vehno);
            if(Ad.isPresent())
                return new ResponseEntity<>("Vehicle Number Exists",HttpStatus.ALREADY_REPORTED);
            else
            {
                obj.setVehiclenumber(vehno);

                Emaildata emaildata=new Emaildata();
                emaildata.setRecipient(adduser.getUseremail());
                emaildata.setSubject("Vehicle Added to Rto Database");
                String txt="Your Vehicle "+ vehno+" added to the Rto Data datbase";
                emaildata.setMessage(txt);

                String msg=smtpsserviceclass.sendEmail(emaildata);

                if(msg.equals("Mail Sent Successfully"))
                {
                    addvehicleRepository.save(obj);
                    return new ResponseEntity<>("Vehicle Details Added Successfully", HttpStatus.OK);
                }
                else
                    return new ResponseEntity<>(msg,HttpStatus.OK);
            }
        }
        else
            return new ResponseEntity<>("RtoStaff ID or User ID Mismatch",HttpStatus.OK);
    }

    @GetMapping("/getVehicle/{id}")
    public ResponseEntity<?> getVehicles(@PathVariable String id)
    {
        List<Addvehicle> list=addvehicleRepository.findAllVehicle(Integer.parseInt(id));
        return new ResponseEntity<>(list,HttpStatus.OK);
    }

    @GetMapping("/getVehDetailsToRto/{vehno}")
    public ResponseEntity<?> findByVeh(@PathVariable String vehno)
    {
        Optional<Addvehicle>Ad=addvehicleRepository.findById(vehno);
        if(Ad.isPresent())
        {
            Addvehicle addvehicle=Ad.get();
            return new ResponseEntity<>(addvehicle,HttpStatus.OK);
        }
        else
            return new ResponseEntity<>("Vehicle Number Mismatch",HttpStatus.OK);
    }

    @PutMapping("/setBuyeridToUserid/{buyername}/{vehno}")
    public ResponseEntity<?> setVal(@PathVariable String buyername,@PathVariable String vehno)
    {
        Optional<Addvehicle>Ad=addvehicleRepository.findById(vehno);
        Optional<Buyer>B=buyerRepository.findByBuyername(buyername);
        if(Ad.isPresent() && B.isPresent())
        {
            Addvehicle addvehicle=Ad.get();
            Buyer buyer=B.get();
            Optional<Adduser> Au=adduserRepository.findById(buyer.getBuyerid());
            if(Au.isPresent())
            {
                Adduser adduser=Au.get();
                addvehicle.setAdduser(adduser);
                addvehicleRepository.save(addvehicle);
                return new ResponseEntity<>("Vehicle Transered from User to Buyer",HttpStatus.OK);
            }
            else
                return new ResponseEntity<>("Buyer id has not added to Adduser table",HttpStatus.OK);
        }
        else
            return new ResponseEntity<>("Vehicle Number or Buyer name Mismatch",HttpStatus.OK);
    }

}
