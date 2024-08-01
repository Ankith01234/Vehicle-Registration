package com.springboot.Controller;

import com.springboot.Entity.Addvehicle;
import com.springboot.Entity.Buyer;
import com.springboot.Entity.Rtostaff;
import com.springboot.Entity.Transfervehicle;
import com.springboot.Repository.AddvehicleRepository;
import com.springboot.Repository.BuyerRepository;
import com.springboot.Repository.RtoStaffRepository;
import com.springboot.Repository.TransfervehicleRepository;
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
public class TransfervehicleController
{
    @Autowired
    TransfervehicleRepository transfervehicleRepository;

    @Autowired
    AddvehicleRepository addvehicleRepository;

    @Autowired
    BuyerRepository buyerRepository;

    @Autowired
    RtoStaffRepository rtoStaffRepository;

    @PostMapping("/addTransfer/{vehno}/{id}")
    public ResponseEntity<?> addTransferVal(@PathVariable String vehno,@PathVariable String id)
    {
        Optional<Addvehicle> Ad=addvehicleRepository.findById(vehno);
        Optional<Buyer> B=buyerRepository.findById(Integer.parseInt(id));
        if(Ad.isPresent() && B.isPresent())
        {
            Optional<Transfervehicle> T=transfervehicleRepository.findByAddvehicleVehiclenumberAndStatus(vehno,"pending");
            if(T.isPresent())
                return new ResponseEntity<>("Vehicle already Exists",HttpStatus.OK);
            else
            {
                Transfervehicle obj = new Transfervehicle();
                Addvehicle addvehicle = Ad.get();
                Buyer buyer = B.get();
                obj.setBuyer(buyer);
                obj.setAddvehicle(addvehicle);
                obj.setStatus("pending");
                Date d = new Date();
                SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
                String date = dateFormat.format(d);
                obj.setRegdate(date);
                transfervehicleRepository.save(obj);
                return new ResponseEntity<>("Data sent to RTO for Acceptation", HttpStatus.OK);
            }
        }
        else
            return new ResponseEntity<>("Buyer Id or Vehicle Number doesn't exists",HttpStatus.OK);
    }

    @GetMapping("/getTransferVehLists/{id}")
    public ResponseEntity<?> getTransferVehListsVal(@PathVariable String id)
    {
        Optional<Rtostaff> R=rtoStaffRepository.findById(Integer.parseInt(id));
        if(R.isPresent())
        {
            List<Object> lst=transfervehicleRepository.findByTransVeh(Integer.parseInt(id),"pending");
            return new ResponseEntity<>(lst,HttpStatus.OK);
        }
        else
            return new ResponseEntity<>("Rto StaffId Mismatch",HttpStatus.OK);
    }

    @PutMapping("/updateTransferVeh/{vehno}")
    public ResponseEntity<?> updateVehicle(@PathVariable String vehno)
    {
        Optional<Transfervehicle> Tv=transfervehicleRepository.findByAddvehicleVehiclenumberAndStatus(vehno,"pending");
        if(Tv.isPresent())
        {
            Transfervehicle transfervehicle=Tv.get();
            transfervehicle.setStatus("transfercompleted");
            transfervehicleRepository.save(transfervehicle);
            return new ResponseEntity<>("Transfer Vehicle Update",HttpStatus.OK);
        }
        else
            return new ResponseEntity<>("Vehicle Number not found",HttpStatus.OK);
    }

}
