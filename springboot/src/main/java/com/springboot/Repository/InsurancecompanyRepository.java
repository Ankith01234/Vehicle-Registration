package com.springboot.Repository;

import com.springboot.Entity.InsuranceCompany;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface InsurancecompanyRepository extends JpaRepository<InsuranceCompany,Integer>
{
    Optional<InsuranceCompany> findByAddvehicleVehiclenumber(String vehno);

    @Query("select m from InsuranceCompany m where m.insurance.companyid=?1")
    List<InsuranceCompany> findAllInsuranceVehicle(Integer id);

}
