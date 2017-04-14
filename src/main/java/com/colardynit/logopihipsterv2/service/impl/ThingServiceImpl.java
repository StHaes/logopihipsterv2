package com.colardynit.logopihipsterv2.service.impl;

import com.colardynit.logopihipsterv2.service.ThingService;
import com.colardynit.logopihipsterv2.domain.Thing;
import com.colardynit.logopihipsterv2.repository.ThingRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service Implementation for managing Thing.
 */
@Service
@Transactional
public class ThingServiceImpl implements ThingService {

    private final Logger log = LoggerFactory.getLogger(ThingServiceImpl.class);

    private final ThingRepository thingRepository;

    public ThingServiceImpl(ThingRepository thingRepository) {
        this.thingRepository = thingRepository;
    }

    /**
     * Save a thing.
     *
     * @param thing the entity to save
     * @return the persisted entity
     */
    @Override
    public Thing save(Thing thing) {
        log.debug("Request to save Thing : {}", thing);
        Thing result = thingRepository.save(thing);
        return result;
    }

    /**
     * Get all the things.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Thing> findAll() {
        log.debug("Request to get all Things");
        List<Thing> result = thingRepository.findAll();

        return result;
    }

    /**
     * Get one thing by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Thing findOne(Long id) {
        log.debug("Request to get Thing : {}", id);
        Thing thing = thingRepository.findOne(id);
        return thing;
    }

    /**
     * Delete the  thing by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Thing : {}", id);
        thingRepository.delete(id);
    }
}
