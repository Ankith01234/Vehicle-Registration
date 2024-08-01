package com.springboot.Controller;

import com.springboot.Entity.Crimetype;
import com.springboot.Repository.CrimetypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
public class Crimetypecontroller
{
    @Autowired
    CrimetypeRepository crimetypeRepository;

    @PostMapping("/addCrimeType")
    public ResponseEntity<?> addCrimeTypeVal(@RequestBody Crimetype obj)
    {
        Optional<Crimetype> C=crimetypeRepository.findByCrimetypename(obj.getCrimetypename());
        if(C.isPresent())
            return new ResponseEntity<>("Crime Type Name already Exists", HttpStatus.ALREADY_REPORTED);
        else
        {
            crimetypeRepository.save(obj);
            return new ResponseEntity<>("Crimetype name Added Successfully",HttpStatus.OK);
        }
    }

    @GetMapping("/getAllCrimeType")
    public ResponseEntity<?> getAllCrimeType()
    {
        List<Crimetype> list=crimetypeRepository.findAll();
        return new ResponseEntity<>(list,HttpStatus.OK);
    }

}
