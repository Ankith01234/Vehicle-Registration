package com.springboot.Repository;

import com.springboot.Entity.Crimeadd;
import com.springboot.Entity.Policestation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CrimeaddRepository extends JpaRepository<Crimeadd,Integer>
{
    @Query("select ca from Crimeadd ca where ca.policestation.stationid=?1 and ca.status=?2")
    List<Crimeadd> findByPolicestationStationid(Integer pid,String status);
}
