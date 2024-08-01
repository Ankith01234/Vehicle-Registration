package com.springboot.Controller;

import com.springboot.Entity.Area;
import com.springboot.Repository.AreaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
public class AreaController
{
    @Autowired
    AreaRepository areaRepository;

    @PostMapping("/addArea")
    public ResponseEntity<?> addAreaVal(@RequestBody Area obj)
    {
        Optional<Area>L=areaRepository.findByAreaname(obj.getAreaname());
        if(L.isPresent())
            return new ResponseEntity<>("Area Name Already Exists", HttpStatus.ALREADY_REPORTED);
        else
        {
            areaRepository.save(obj);
            return new ResponseEntity<>("Areaname Added Successfully",HttpStatus.OK);
        }
    }

    @GetMapping("/getAllArea")
    public ResponseEntity<?> getArea()
    {
        List<Area>lists=areaRepository.findAll();
        return new ResponseEntity<>(lists,HttpStatus.OK);
    }

}
