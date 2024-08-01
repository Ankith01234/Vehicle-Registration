package com.springboot.Repository;

import com.springboot.Entity.Area;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AreaRepository extends JpaRepository<Area,Integer>
{
    Optional<Area> findByAreaname(String areaname);

}
