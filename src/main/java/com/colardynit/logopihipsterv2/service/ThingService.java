package com.colardynit.logopihipsterv2.service;

import com.colardynit.logopihipsterv2.domain.Thing;

import java.util.List;

/**
 * Service Interface for managing Thing.
 */
public interface ThingService {

    /**
     * Save a thing.
     *
     * @param thing the entity to save
     * @return the persisted entity
     */
    Thing save(Thing thing);

    /**
     * Get all the things.
     *
     * @return the list of entities
     */
    List<Thing> findAll();

    /**
     * Get the "id" thing.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Thing findOne(Long id);

    /**
     * Delete the "id" thing.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
