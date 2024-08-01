package com.springboot.Controller;

import com.springboot.Entity.Admin;
import com.springboot.Repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@CrossOrigin("*")
public class AdminController
{
    @Autowired
    AdminRepository adminRepository;

    @PostMapping("/addAdmin")
    public ResponseEntity<?> addAdmin(@RequestBody Admin obj)
    {
        adminRepository.save(obj);
        return new ResponseEntity<>("Admin Data Saved in the Database", HttpStatus.OK);
    }

    @PostMapping("/verifyAdminLogin")
    public ResponseEntity<?> verifyLogin(@RequestBody Admin obj)
    {
        Optional<Admin>L=adminRepository.findById(obj.getUserid());
        if(L.isPresent())
        {
            Admin admin=L.get();
            if(admin.getPassword().equals(obj.getPassword()))
                return new ResponseEntity<>("Correct Password",HttpStatus.OK);
            else
                return new ResponseEntity<>("Incorrect Password",HttpStatus.OK);
        }
        else
            return new ResponseEntity<>("Data not Found",HttpStatus.OK);
    }

}
