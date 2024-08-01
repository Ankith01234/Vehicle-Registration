package com.springboot.Controller;

import com.springboot.Entity.Addvehicle;
import com.springboot.Entity.Crimeadd;
import com.springboot.Entity.Crimevehicle;
import com.springboot.Entity.Policestation;
import com.springboot.Repository.AddvehicleRepository;
import com.springboot.Repository.CrimeaddRepository;
import com.springboot.Repository.CrimevehicleRepository;
import com.springboot.Repository.PolicestationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
public class Crimevehiclecontroller
{
    @Autowired
    CrimevehicleRepository crimevehicleRepository;

    @Autowired
    CrimeaddRepository crimeaddRepository;

    @Autowired
    AddvehicleRepository addvehicleRepository;

    @Autowired
    PolicestationRepository policestationRepository;

    @PostMapping("/addCrimeToVehicle/{crimeid}/{vehno}")
    public ResponseEntity<?> addCrimeVeh(@PathVariable Integer crimeid,@PathVariable String vehno)
    {
        Optional<Crimeadd> Ca=crimeaddRepository.findById(crimeid);
        Optional<Addvehicle> Ad=addvehicleRepository.findById(vehno);
        Crimevehicle obj=new Crimevehicle();
        if(Ad.isPresent() && Ca.isPresent())
        {
            Crimeadd crimeadd=Ca.get();
            Addvehicle addvehicle=Ad.get();
            obj.setAddvehicle(addvehicle);
            obj.setCrimeadd(crimeadd);
            obj.setStatus("active");
            Date d=new Date();
            SimpleDateFormat dateFormat=new SimpleDateFormat("yyyy-MM-dd");
            String date=dateFormat.format(d);
            obj.setCrimedate(date);
            crimevehicleRepository.save(obj);
            return new ResponseEntity<>("Vehicle Crime Added successfully", HttpStatus.OK);
        }
        else
            return new ResponseEntity<>("Vehicle Number or Crime Id Mismatch",HttpStatus.OK);
    }

    @GetMapping("/getAllCrimeVehicle/{stationid}")
    public ResponseEntity<?> getAllCrimeVehicleVal(@PathVariable String stationid)
    {
        Optional<Policestation>Ps=policestationRepository.findById(Integer.parseInt(stationid));
        if(Ps.isPresent())
        {
            String status="active";
            List<Object> lstCrimeVehicle=crimevehicleRepository.findByCrimeVehicleActive(Integer.parseInt(stationid),status);
            return new ResponseEntity<>(lstCrimeVehicle,HttpStatus.OK);
        }
        else
            return new ResponseEntity<>("Station ID Mismatch",HttpStatus.OK);
    }

    @PutMapping("/updateCrime/{crimeid}")
    public ResponseEntity<?> updateCrimeVal(@PathVariable Integer crimeid)
    {
        Optional<Crimeadd>Ca=crimeaddRepository.findById(crimeid);
        if(Ca.isPresent())
        {
            Crimeadd crimeadd=Ca.get();
            crimeadd.setStatus("active");
            crimeaddRepository.save(crimeadd);
            return new ResponseEntity<>("Status updated successfully",HttpStatus.OK);
        }
        else
            return new ResponseEntity<>("Crime Id Mismatch",HttpStatus.OK);
    }

}
