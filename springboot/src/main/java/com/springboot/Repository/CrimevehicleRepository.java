package com.springboot.Repository;

import com.springboot.Entity.Crimevehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface CrimevehicleRepository extends JpaRepository<Crimevehicle,Integer>
{
    @Query("select ca.cid,ca.crimetype.ctid,ca.crimename,ca.crimedesc,cv.crimedate,cv.addvehicle.vehiclenumber from Crimevehicle cv inner join Crimeadd ca on cv.crimeadd.cid=ca.cid where ca.policestation.stationid=?1 and cv.status=?2")
    List<Object> findByCrimeVehicleActive(Integer stationid,String status);

    Optional<Crimevehicle> findByAddvehicleVehiclenumber(String vehno);

    @Query("select ct.ctid,ca.crimename,ca.crimedesc,ca.crimedate from Crimeadd ca inner join Crimetype ct on ct.ctid=ca.crimetype.ctid inner join Crimevehicle cv on ca.cid=cv.crimeadd.cid where cv.addvehicle.vehiclenumber=?1")
    List<Object> findCrimeVehicle(String vehno);

}
