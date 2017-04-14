package com.colardynit.logopihipsterv2.service;

import com.colardynit.logopihipsterv2.domain.ThingInState;

import java.util.List;

/**
 * Service Interface for managing ThingInState.
 */
public interface ThingInStateService {

    /**
     * Save a thingInState.
     *
     * @param thingInState the entity to save
     * @return the persisted entity
     */
    ThingInState save(ThingInState thingInState);

    /**
     * Get all the thingInStates.
     *
     * @return the list of entities
     */
    List<ThingInState> findAll();

    /**
     * Get the "id" thingInState.
     *
     * @param id the id of the entity
     * @return the entity
     */
    ThingInState findOne(Long id);

    /**
     * Delete the "id" thingInState.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
