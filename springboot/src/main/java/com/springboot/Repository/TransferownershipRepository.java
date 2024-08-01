package com.springboot.Repository;

import com.springboot.Entity.Transferownership;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TransferownershipRepository extends JpaRepository<Transferownership,Integer>
{
    List<Transferownership> findByVehicleVehiclenumber(String vehno);
}
