package com.springboot.Controller;

import com.springboot.Entity.Addvehicle;
import com.springboot.Entity.Insurance;
import com.springboot.Entity.InsuranceCompany;
import com.springboot.Repository.AddvehicleRepository;
import com.springboot.Repository.InsuranceRepo;
import com.springboot.Repository.InsurancecompanyRepository;
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
public class InsurancecompanyController
{

    @Autowired
    InsurancecompanyRepository insurancecompanyRepository;

    @Autowired
    AddvehicleRepository addvehicleRepository;

    @Autowired
    InsuranceRepo insuranceRepo;

    @PostMapping("/addVehicleInsurance/{id}/{vehno}")
    public ResponseEntity<?> addInsuranceToVehicle(@RequestBody InsuranceCompany obj, @PathVariable String id,@PathVariable String vehno)
    {
        Optional<Addvehicle> Ad=addvehicleRepository.findById(vehno);
        Optional<Insurance> I=insuranceRepo.findById(Integer.parseInt(id));
        if(Ad.isPresent() && I.isPresent())
        {
            Addvehicle addvehicle=Ad.get();
            Optional<InsuranceCompany>IC=insurancecompanyRepository.findByAddvehicleVehiclenumber(addvehicle.getVehiclenumber());
            if(IC.isPresent())
                return new ResponseEntity<>("Vehicle Name Already Exists",HttpStatus.ALREADY_REPORTED);
            else
            {
                Insurance insurance = I.get();
                Date d=new Date();
                SimpleDateFormat dateFormat=new SimpleDateFormat("yyyy-MM-dd");
                String date=dateFormat.format(d);
                obj.setStartdate(date);
                String []v=date.split("-");
                String year=String.valueOf(Integer.parseInt(v[0])+1);
                String enddate=String.format(year+"-"+v[1]+"-"+v[2]);
                obj.setEnddate(enddate);
                obj.setInsurance(insurance);
                obj.setAddvehicle(addvehicle);
                obj.setStatus("active");
                insurancecompanyRepository.save(obj);
                return new ResponseEntity<>("Insurance Added Successfully for the " + vehno + " number", HttpStatus.OK);
            }
        }
        else
            return new ResponseEntity<>("Vehicle Number or Insurance Company Mismatch", HttpStatus.OK);
    }

    @GetMapping("/getVehicleInsurance/{id}")
    public ResponseEntity<?> getVehicleInsuranceVal(@PathVariable String id)
    {
        Optional<Insurance> I=insuranceRepo.findById(Integer.parseInt(id));
        if(I.isPresent())
        {
            List<InsuranceCompany> vehlst=insurancecompanyRepository.findAllInsuranceVehicle(Integer.parseInt(id));
            return new ResponseEntity<>(vehlst,HttpStatus.OK);
        }
        else
            return new ResponseEntity<>("Insurance Company Id Mismatch",HttpStatus.OK);
    }

}
