package com.colardynit.logopihipsterv2.repository;

import com.colardynit.logopihipsterv2.domain.ThingInState;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the ThingInState entity.
 */
@SuppressWarnings("unused")
public interface ThingInStateRepository extends JpaRepository<ThingInState, Long> {

}
