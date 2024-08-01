package com.springboot.Repository;

import com.springboot.Entity.Addvehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface AddvehicleRepository extends JpaRepository<Addvehicle,String>
{
    Optional<Addvehicle> findByVehiclenumber(String vehno);

    @Query("select ad from Addvehicle ad where ad.rtostaff.staffid=?1")
    List<Addvehicle> findAllVehicle(Integer id);
}
