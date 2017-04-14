package com.colardynit.logopihipsterv2.repository;

import com.colardynit.logopihipsterv2.domain.Mode;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Mode entity.
 */
@SuppressWarnings("unused")
public interface ModeRepository extends JpaRepository<Mode, Long> {

}
