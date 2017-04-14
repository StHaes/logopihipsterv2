package com.colardynit.logopihipsterv2.repository;

import com.colardynit.logopihipsterv2.domain.Thing;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Thing entity.
 */
@SuppressWarnings("unused")
public interface ThingRepository extends JpaRepository<Thing, Long> {

}
