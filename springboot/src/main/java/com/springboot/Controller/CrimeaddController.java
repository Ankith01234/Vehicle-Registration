package com.springboot.Controller;

import com.springboot.Entity.Crimeadd;
import com.springboot.Entity.Crimetype;
import com.springboot.Entity.Policestation;
import com.springboot.Repository.CrimeaddRepository;
import com.springboot.Repository.CrimetypeRepository;
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
public class CrimeaddController
{

    @Autowired
    CrimeaddRepository crimeaddRepository;

    @Autowired
    CrimetypeRepository crimetypeRepository;

    @Autowired
    PolicestationRepository policestationRepository;

    @PostMapping("/addCrime/{ctid}/{stationid}")
    public ResponseEntity<?> addCrimeDetails(@RequestBody Crimeadd obj, @PathVariable Integer ctid,@PathVariable String stationid)
    {
        Optional<Crimetype> CT=crimetypeRepository.findById(ctid);
        Optional<Policestation> PS=policestationRepository.findById(Integer.parseInt(stationid));
        if(CT.isPresent() && PS.isPresent())
        {
            Crimetype crimetype=CT.get();
            Policestation policestation=PS.get();
            obj.setCrimetype(crimetype);
            obj.setPolicestation(policestation);
            obj.setStatus("pending");
            Date d=new Date();
            SimpleDateFormat dateFormat=new SimpleDateFormat("yyyy-MM-dd");
            String date=dateFormat.format(d);
            obj.setCrimedate(date);
            crimeaddRepository.save(obj);
            return new ResponseEntity<>("Crime Added Successfully", HttpStatus.OK);
        }
        else
            return new ResponseEntity<>("Crime Type ID or PoliceStation ID Mismatch",HttpStatus.OK);
    }

    @GetMapping("/getCrimeAdd/{stationid}")
    public ResponseEntity<?> getCrime(@PathVariable String stationid)
    {
        Optional<Policestation> Ps=policestationRepository.findById(Integer.parseInt(stationid));
        if(Ps.isPresent())
        {
            String status="pending";
            List<Crimeadd> list=crimeaddRepository.findByPolicestationStationid(Integer.parseInt(stationid),status);
            return new ResponseEntity<>(list,HttpStatus.OK);
        }
        else
            return new ResponseEntity<>("Police Station ID Mismatch",HttpStatus.OK);
    }

}
