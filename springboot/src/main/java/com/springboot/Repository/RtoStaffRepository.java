package com.springboot.Repository;

import com.springboot.Entity.Rtostaff;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RtoStaffRepository extends JpaRepository<Rtostaff,Integer>
{
    Optional<Rtostaff> findByStaffemail(String staffemail);
}
