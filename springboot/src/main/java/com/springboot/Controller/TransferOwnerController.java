package com.springboot.Controller;

import com.springboot.Entity.Addvehicle;
import com.springboot.Entity.Buyer;
import com.springboot.Entity.Transferownership;
import com.springboot.Repository.AddvehicleRepository;
import com.springboot.Repository.BuyerRepository;
import com.springboot.Repository.TransferownershipRepository;
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
public class TransferOwnerController
{
    @Autowired
    TransferownershipRepository transferownershipRepository;

    @Autowired
    BuyerRepository buyerRepository;

    @Autowired
    AddvehicleRepository addvehicleRepository;

    @PostMapping("/transferOwnership/{vehno}/{buyername}")
    public ResponseEntity<?> transferOwner(@PathVariable String vehno,@PathVariable String buyername)
    {
        Optional<Buyer> B=buyerRepository.findByBuyername(buyername);
        Optional<Addvehicle> Ad=addvehicleRepository.findById(vehno);
        //System.out.println(vehno+"-"+buyername);
        if(B.isPresent() && Ad.isPresent())
        {
            Buyer buyer=B.get();
            Addvehicle addvehicle=Ad.get();
            Transferownership transferownership=new Transferownership();
            transferownership.setBuyerid(buyer);
            transferownership.setVehicle(addvehicle);
            transferownership.setUser(addvehicle.getAdduser());
            Date d=new Date();
            SimpleDateFormat dateFormat=new SimpleDateFormat("yyyy-MM-dd");
            String date=dateFormat.format(d);
            transferownership.setTransferdate(date);
            transferownership.setStatus("transfered");
            transferownershipRepository.save(transferownership);
            return new ResponseEntity<>("Vehicle Transfered Successfully", HttpStatus.OK);
        }
        else
            return new ResponseEntity<>("Buyer Id or Vehicle Number Mismatch----",HttpStatus.OK);
    }

    @GetMapping("/getVehOwner/{vehno}")
    public ResponseEntity<?> getAllVehicle(@PathVariable String vehno)
    {
        Optional<Addvehicle> Ad=addvehicleRepository.findById(vehno);
        if(Ad.isPresent())
        {
            List<Transferownership> L = transferownershipRepository.findByVehicleVehiclenumber(vehno);
            return new ResponseEntity<>(L, HttpStatus.OK);
        }
        else
            return new ResponseEntity<>("This Vehicle is not registered",HttpStatus.OK);
    }

}
