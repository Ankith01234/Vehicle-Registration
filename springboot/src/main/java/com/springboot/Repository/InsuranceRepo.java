package com.springboot.Repository;

import com.springboot.Entity.Insurance;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface InsuranceRepo extends JpaRepository<Insurance,Integer>
{
    Optional<Insurance> findByCompanyemail(String email);
}
