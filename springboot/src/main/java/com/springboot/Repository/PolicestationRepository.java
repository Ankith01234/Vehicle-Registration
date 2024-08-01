package com.springboot.Repository;

import com.springboot.Entity.Policestation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PolicestationRepository extends JpaRepository<Policestation,Integer>
{
    Optional<Policestation> findByAreaAreaid(int areaid);
    Optional<Policestation> findByStationemail(String email);


}
