package com.springboot.Controller;

import com.springboot.Entity.Buyer;
import com.springboot.Entity.Buyerupload;
import com.springboot.Repository.BuyerRepository;
import com.springboot.Repository.BuyeruploadRepository;
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
public class BuyeruploadController
{
    @Autowired
    BuyerRepository buyerRepository;

    @Autowired
    BuyeruploadRepository buyeruploadRepository;

    @PostMapping("/uploadDocument/{id}")
    public ResponseEntity<?> uploadData(@RequestBody Buyerupload obj, @PathVariable String id)
    {
        Optional<Buyer> B=buyerRepository.findById(Integer.parseInt(id));
        if(B.isPresent())
        {
            Buyer buyer=B.get();
            obj.setBuyer(buyer);
            Date d=new Date();
            SimpleDateFormat dateFormat=new SimpleDateFormat("yyyy-MM-dd");
            String date=dateFormat.format(d);
            obj.setUploaddate(date);
            obj.setStatus("active");
            buyeruploadRepository.save(obj);
            return new ResponseEntity<>("Documents Uploaded successfully", HttpStatus.OK);
        }
        else
            return new ResponseEntity<>("Buyer Id Doesn't Exists",HttpStatus.OK);
    }

    @GetMapping("/getAllUploadFile/{id}")
    public ResponseEntity<?> getFile(@PathVariable String id)
    {
        Optional<Buyer> B=buyerRepository.findById(Integer.parseInt(id));
        if(B.isPresent())
        {
            String status="active";
            List<Buyerupload> lists=buyeruploadRepository.findAllFiles(Integer.parseInt(id),status);
            return new ResponseEntity<>(lists,HttpStatus.OK);
        }
        else
            return new ResponseEntity<>("You Have not uploaded any Files",HttpStatus.OK);
    }

    @PutMapping("/deactiveDocument/{id}")
    public ResponseEntity<?> deactiveDocuments(@PathVariable Integer id)
    {
        Optional<Buyerupload> Bl=buyeruploadRepository.findById(id);
        if(Bl.isPresent())
        {
            Buyerupload buyerupload=Bl.get();
            buyerupload.setStatus("deactive");
            buyeruploadRepository.save(buyerupload);
            return new ResponseEntity<>("Deleted Successfully",HttpStatus.OK);
        }
        else
            return new ResponseEntity<>("File Id not present",HttpStatus.OK);
    }

    @GetMapping("/getBuyerUpload/{buyername}")
    public ResponseEntity<?> getFiles(@PathVariable String buyername)
    {
        Optional<Buyer> B=buyerRepository.findByBuyername(buyername);
        if(B.isPresent())
        {
            Buyer buyer=B.get();
            List<Buyerupload> listFiles=buyeruploadRepository.findByBuyerBuyeridAndStatus(buyer.getBuyerid(),"active");
            return new ResponseEntity<>(listFiles,HttpStatus.OK);
        }
        else
            return new ResponseEntity<>("Buyer Name not found",HttpStatus.OK);
    }

}
