package com.colardynit.logopihipsterv2.service;

import com.colardynit.logopihipsterv2.domain.Mode;

import java.util.List;

/**
 * Service Interface for managing Mode.
 */
public interface ModeService {

    /**
     * Save a mode.
     *
     * @param mode the entity to save
     * @return the persisted entity
     */
    Mode save(Mode mode);

    /**
     * Get all the modes.
     *
     * @return the list of entities
     */
    List<Mode> findAll();

    /**
     * Get the "id" mode.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Mode findOne(Long id);

    /**
     * Delete the "id" mode.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
