package com.colardynit.logopihipsterv2.service.impl;

import com.colardynit.logopihipsterv2.service.ThingInStateService;
import com.colardynit.logopihipsterv2.domain.ThingInState;
import com.colardynit.logopihipsterv2.repository.ThingInStateRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service Implementation for managing ThingInState.
 */
@Service
@Transactional
public class ThingInStateServiceImpl implements ThingInStateService {

    private final Logger log = LoggerFactory.getLogger(ThingInStateServiceImpl.class);

    private final ThingInStateRepository thingInStateRepository;

    public ThingInStateServiceImpl(ThingInStateRepository thingInStateRepository) {
        this.thingInStateRepository = thingInStateRepository;
    }

    /**
     * Save a thingInState.
     *
     * @param thingInState the entity to save
     * @return the persisted entity
     */
    @Override
    public ThingInState save(ThingInState thingInState) {
        log.debug("Request to save ThingInState : {}", thingInState);
        ThingInState result = thingInStateRepository.save(thingInState);
        return result;
    }

    /**
     * Get all the thingInStates.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<ThingInState> findAll() {
        log.debug("Request to get all ThingInStates");
        List<ThingInState> result = thingInStateRepository.findAll();

        return result;
    }

    /**
     * Get one thingInState by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public ThingInState findOne(Long id) {
        log.debug("Request to get ThingInState : {}", id);
        ThingInState thingInState = thingInStateRepository.findOne(id);
        return thingInState;
    }

    /**
     * Delete the  thingInState by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ThingInState : {}", id);
        thingInStateRepository.delete(id);
    }
}
