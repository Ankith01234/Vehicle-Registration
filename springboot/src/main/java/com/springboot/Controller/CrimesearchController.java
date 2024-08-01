package com.springboot.Controller;

import com.springboot.Entity.Addvehicle;
import com.springboot.Entity.Crimevehicle;
import com.springboot.Entity.InsuranceCompany;
import com.springboot.Repository.AdduserRepository;
import com.springboot.Repository.AddvehicleRepository;
import com.springboot.Repository.CrimevehicleRepository;
import com.springboot.Repository.InsurancecompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
public class CrimesearchController
{
    @Autowired
    AdduserRepository adduserRepository;

    @Autowired
    AddvehicleRepository addvehicleRepository;

    @Autowired
    InsurancecompanyRepository insurancecompanyRepository;

    @Autowired
    CrimevehicleRepository crimevehicleRepository;

    @GetMapping("/getUserDetails/{vehno}")
    public ResponseEntity<?> getDetails(@PathVariable String vehno)
    {
        Optional<Addvehicle> Ad=addvehicleRepository.findById(vehno);
        if(Ad .isPresent())
        {
            List<Object> lst=adduserRepository.findByUserDetails(vehno);
            return new ResponseEntity<>(lst, HttpStatus.OK);
        }
        else
            return new ResponseEntity<>("Vehicle Number not registered",HttpStatus.OK);
    }

    @GetMapping("/getUserVehDetails/{vehno}")
    public ResponseEntity<?> getVehDetails(@PathVariable String vehno)
    {
        Optional<Addvehicle> Ad=addvehicleRepository.findById(vehno);
        if(Ad.isPresent())
        {
            Addvehicle addvehicle=Ad.get();
            return new ResponseEntity<>(addvehicle,HttpStatus.OK);
        }
        else
            return new ResponseEntity<>("Vehicle number not registered",HttpStatus.OK);
    }

    @GetMapping("/getVehInsurance/{vehno}")
    public ResponseEntity<?> getInsurance(@PathVariable String vehno)
    {
        Optional<InsuranceCompany>Ic=insurancecompanyRepository.findByAddvehicleVehiclenumber(vehno);
        if(Ic.isPresent())
        {
            InsuranceCompany insuranceCompany=Ic.get();
            return new ResponseEntity<>(Ic,HttpStatus.OK);
        }
        else
            return new ResponseEntity<>("Vehicle Doesn't have Insurance",HttpStatus.OK);
    }

    @GetMapping("/getVehCrime/{vehno}")
    public ResponseEntity<?> getVehicleCrime(@PathVariable String vehno)
    {
        Optional<Crimevehicle>Cv=crimevehicleRepository.findByAddvehicleVehiclenumber(vehno);
        if(Cv.isPresent())
        {
            List<Object>lists=crimevehicleRepository.findCrimeVehicle(vehno);
            return new ResponseEntity<>(lists,HttpStatus.OK);
        }
        else
            return new ResponseEntity<>("Vehicle Number has No Crime",HttpStatus.OK);
    }

}
