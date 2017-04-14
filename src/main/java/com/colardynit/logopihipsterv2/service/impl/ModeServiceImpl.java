package com.colardynit.logopihipsterv2.service.impl;

import com.colardynit.logopihipsterv2.service.ModeService;
import com.colardynit.logopihipsterv2.domain.Mode;
import com.colardynit.logopihipsterv2.repository.ModeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service Implementation for managing Mode.
 */
@Service
@Transactional
public class ModeServiceImpl implements ModeService {

    private final Logger log = LoggerFactory.getLogger(ModeServiceImpl.class);

    private final ModeRepository modeRepository;

    public ModeServiceImpl(ModeRepository modeRepository) {
        this.modeRepository = modeRepository;
    }

    /**
     * Save a mode.
     *
     * @param mode the entity to save
     * @return the persisted entity
     */
    @Override
    public Mode save(Mode mode) {
        log.debug("Request to save Mode : {}", mode);
        Mode result = modeRepository.save(mode);
        return result;
    }

    /**
     * Get all the modes.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Mode> findAll() {
        log.debug("Request to get all Modes");
        List<Mode> result = modeRepository.findAll();

        return result;
    }

    /**
     * Get one mode by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Mode findOne(Long id) {
        log.debug("Request to get Mode : {}", id);
        Mode mode = modeRepository.findOne(id);
        return mode;
    }

    /**
     * Delete the  mode by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Mode : {}", id);
        modeRepository.delete(id);
    }
}
