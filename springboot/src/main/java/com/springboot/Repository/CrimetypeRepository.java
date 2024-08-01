package com.springboot.Repository;

import com.springboot.Entity.Crimetype;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CrimetypeRepository extends JpaRepository<Crimetype,Integer>
{
    Optional<Crimetype> findByCrimetypename(String cname);
}
