package com.colardynit.logopihipsterv2.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.colardynit.logopihipsterv2.domain.Thing;
import com.colardynit.logopihipsterv2.service.ThingService;
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
 * REST controller for managing Thing.
 */
@RestController
@RequestMapping("/api")
public class ThingResource {

    private final Logger log = LoggerFactory.getLogger(ThingResource.class);

    private static final String ENTITY_NAME = "thing";

    private final ThingService thingService;

    public ThingResource(ThingService thingService) {
        this.thingService = thingService;
    }

    /**
     * POST  /things : Create a new thing.
     *
     * @param thing the thing to create
     * @return the ResponseEntity with status 201 (Created) and with body the new thing, or with status 400 (Bad Request) if the thing has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/things")
    @Timed
    public ResponseEntity<Thing> createThing(@RequestBody Thing thing) throws URISyntaxException {
        log.debug("REST request to save Thing : {}", thing);
        if (thing.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new thing cannot already have an ID")).body(null);
        }
        Thing result = thingService.save(thing);
        return ResponseEntity.created(new URI("/api/things/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /things : Updates an existing thing.
     *
     * @param thing the thing to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated thing,
     * or with status 400 (Bad Request) if the thing is not valid,
     * or with status 500 (Internal Server Error) if the thing couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/things")
    @Timed
    public ResponseEntity<Thing> updateThing(@RequestBody Thing thing) throws URISyntaxException {
        log.debug("REST request to update Thing : {}", thing);
        if (thing.getId() == null) {
            return createThing(thing);
        }
        Thing result = thingService.save(thing);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, thing.getId().toString()))
            .body(result);
    }

    /**
     * GET  /things : get all the things.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of things in body
     */
    @GetMapping("/things")
    @Timed
    public List<Thing> getAllThings() {
        log.debug("REST request to get all Things");
        return thingService.findAll();
    }

    /**
     * GET  /things/:id : get the "id" thing.
     *
     * @param id the id of the thing to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the thing, or with status 404 (Not Found)
     */
    @GetMapping("/things/{id}")
    @Timed
    public ResponseEntity<Thing> getThing(@PathVariable Long id) {
        log.debug("REST request to get Thing : {}", id);
        Thing thing = thingService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(thing));
    }

    /**
     * DELETE  /things/:id : delete the "id" thing.
     *
     * @param id the id of the thing to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/things/{id}")
    @Timed
    public ResponseEntity<Void> deleteThing(@PathVariable Long id) {
        log.debug("REST request to delete Thing : {}", id);
        thingService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

}
