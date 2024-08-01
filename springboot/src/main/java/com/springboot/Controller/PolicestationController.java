package com.springboot.Controller;

import com.springboot.DTO.Emaildata;
import com.springboot.Entity.Area;
import com.springboot.Entity.Policestation;
import com.springboot.Repository.AreaRepository;
import com.springboot.Repository.PolicestationRepository;
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
public class PolicestationController
{
    @Autowired
    PolicestationRepository policestationRepository;

    @Autowired
    AreaRepository areaRepository;

    @Autowired
    Smtpsserviceclass smtpsserviceclass;

    @PostMapping("/addStation/{areaid}")
    public ResponseEntity<?> addStationVal(@RequestBody Policestation obj,@PathVariable Integer areaid)
    {
        Optional<Area>A=areaRepository.findById(areaid);
        if(A.isPresent())
        {
            Optional<Policestation>P1=policestationRepository.findByAreaAreaid(areaid);
            Optional<Policestation>P2=policestationRepository.findByStationemail(obj.getStationemail());
            if(P1.isPresent() || P2.isPresent())
                return new ResponseEntity<>("Only one police Station is allowed in one area",HttpStatus.OK);
            else
            {
                Area area=A.get();
                Random rnd=new Random();
                int id=rnd.nextInt(100000,999999);
                int password=rnd.nextInt(1000,9999);
                obj.setStationid(id);
                obj.setStationpassword(String.valueOf(password));
                obj.setArea(area);

                Emaildata emaildata=new Emaildata();
                emaildata.setRecipient(obj.getStationemail());
                emaildata.setSubject("Login Credentials");
                String txt="Your Police station Id: "+id+",Password:"+password;
                emaildata.setMessage(txt);

                String msg=smtpsserviceclass.sendEmail(emaildata);

                if(msg.equals("Mail Sent Successfully"))
                {
                    policestationRepository.save(obj);
                    return new ResponseEntity<>("Police Station added Successfully", HttpStatus.OK);
                }
                else
                    return new ResponseEntity<>(msg,HttpStatus.OK);
            }
        }
        else
            return new ResponseEntity<>("Area Id Not Found",HttpStatus.OK);
    }

    @GetMapping("/getAllStations")
    public ResponseEntity<?> getAllPoliceStation()
    {
        List<Policestation> list=policestationRepository.findAll();
        return new ResponseEntity<>(list,HttpStatus.OK);
    }

    @GetMapping("/chkStation/{userid}/{password}")
    public ResponseEntity<?> chkPoliceStation(@PathVariable Integer userid,@PathVariable String password)
    {
        Optional<Policestation>L=policestationRepository.findById(userid);
        if(L.isPresent())
        {
            Policestation policestation=L.get();
            if(policestation.getStationpassword().equals(password))
                return new ResponseEntity<>("Correct Password",HttpStatus.OK);
            else
                return new ResponseEntity<>("Incorrect Password",HttpStatus.OK);
        }
        else
            return new ResponseEntity<>("Police Station ID not found",HttpStatus.OK);
    }

}
