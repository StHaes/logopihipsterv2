package com.colardynit.logopihipsterv2.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.colardynit.logopihipsterv2.domain.ThingInState;
import com.colardynit.logopihipsterv2.service.ThingInStateService;
import com.colardynit.logopihipsterv2.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing ThingInState.
 */
@RestController
@RequestMapping("/api")
public class ThingInStateResource {

    private final Logger log = LoggerFactory.getLogger(ThingInStateResource.class);

    private static final String ENTITY_NAME = "thingInState";

    private final ThingInStateService thingInStateService;

    public ThingInStateResource(ThingInStateService thingInStateService) {
        this.thingInStateService = thingInStateService;
    }

    /**
     * POST  /thing-in-states : Create a new thingInState.
     *
     * @param thingInState the thingInState to create
     * @return the ResponseEntity with status 201 (Created) and with body the new thingInState, or with status 400 (Bad Request) if the thingInState has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/thing-in-states")
    @Timed
    public ResponseEntity<ThingInState> createThingInState(@RequestBody ThingInState thingInState) throws URISyntaxException {
        log.debug("REST request to save ThingInState : {}", thingInState);
        if (thingInState.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new thingInState cannot already have an ID")).body(null);
        }
        ThingInState result = thingInStateService.save(thingInState);
        return ResponseEntity.created(new URI("/api/thing-in-states/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /thing-in-states : Updates an existing thingInState.
     *
     * @param thingInState the thingInState to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated thingInState,
     * or with status 400 (Bad Request) if the thingInState is not valid,
     * or with status 500 (Internal Server Error) if the thingInState couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/thing-in-states")
    @Timed
    public ResponseEntity<ThingInState> updateThingInState(@RequestBody ThingInState thingInState) throws URISyntaxException {
        log.debug("REST request to update ThingInState : {}", thingInState);
        if (thingInState.getId() == null) {
            return createThingInState(thingInState);
        }
        ThingInState result = thingInStateService.save(thingInState);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, thingInState.getId().toString()))
            .body(result);
    }

    /**
     * GET  /thing-in-states : get all the thingInStates.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of thingInStates in body
     */
    @GetMapping("/thing-in-states")
    @Timed
    public List<ThingInState> getAllThingInStates() {
        log.debug("REST request to get all ThingInStates");
        return thingInStateService.findAll();
    }

    /**
     * GET  /thing-in-states/:id : get the "id" thingInState.
     *
     * @param id the id of the thingInState to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the thingInState, or with status 404 (Not Found)
     */
    @GetMapping("/thing-in-states/{id}")
    @Timed
    public ResponseEntity<ThingInState> getThingInState(@PathVariable Long id) {
        log.debug("REST request to get ThingInState : {}", id);
        ThingInState thingInState = thingInStateService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(thingInState));
    }

    /**
     * DELETE  /thing-in-states/:id : delete the "id" thingInState.
     *
     * @param id the id of the thingInState to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/thing-in-states/{id}")
    @Timed
    public ResponseEntity<Void> deleteThingInState(@PathVariable Long id) {
        log.debug("REST request to delete ThingInState : {}", id);
        thingInStateService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

}
