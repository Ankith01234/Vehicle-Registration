package com.springboot.Repository;

import com.springboot.Entity.Buyer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BuyerRepository extends JpaRepository<Buyer,Integer>
{
    Optional<Buyer> findByBuyeremail(String email);

    Optional<Buyer> findByBuyername(String buyername);

}
