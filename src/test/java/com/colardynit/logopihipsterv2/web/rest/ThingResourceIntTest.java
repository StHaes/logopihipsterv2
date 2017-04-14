package com.colardynit.logopihipsterv2.web.rest;

import com.colardynit.logopihipsterv2.Logopihipsterv2App;

import com.colardynit.logopihipsterv2.domain.Thing;
import com.colardynit.logopihipsterv2.repository.ThingRepository;
import com.colardynit.logopihipsterv2.service.ThingService;
import com.colardynit.logopihipsterv2.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ThingResource REST controller.
 *
 * @see ThingResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Logopihipsterv2App.class)
public class ThingResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_LOGO_ID = "AAAAAAAAAA";
    private static final String UPDATED_LOGO_ID = "BBBBBBBBBB";

    private static final Boolean DEFAULT_CURRENT_STATE = false;
    private static final Boolean UPDATED_CURRENT_STATE = true;

    private static final Boolean DEFAULT_DESIRED_STATE = false;
    private static final Boolean UPDATED_DESIRED_STATE = true;

    @Autowired
    private ThingRepository thingRepository;

    @Autowired
    private ThingService thingService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restThingMockMvc;

    private Thing thing;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        ThingResource thingResource = new ThingResource(thingService);
        this.restThingMockMvc = MockMvcBuilders.standaloneSetup(thingResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     * <p>
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Thing createEntity(EntityManager em) {
        Thing thing = new Thing()
            .name(DEFAULT_NAME)
            .logoId(DEFAULT_LOGO_ID)
            .currentState(DEFAULT_CURRENT_STATE)
            .desiredState(DEFAULT_DESIRED_STATE);
        return thing;
    }

    @Before
    public void initTest() {
        thing = createEntity(em);
    }

    @Test
    @Transactional
    public void createThing() throws Exception {
        int databaseSizeBeforeCreate = thingRepository.findAll().size();

        // Create the Thing
        restThingMockMvc.perform(post("/api/things")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(thing)))
            .andExpect(status().isCreated());

        // Validate the Thing in the database
        List<Thing> thingList = thingRepository.findAll();
        assertThat(thingList).hasSize(databaseSizeBeforeCreate + 1);
        Thing testThing = thingList.get(thingList.size() - 1);
        assertThat(testThing.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testThing.getLogoId()).isEqualTo(DEFAULT_LOGO_ID);
        assertThat(testThing.isCurrentState()).isEqualTo(DEFAULT_CURRENT_STATE);
        assertThat(testThing.isDesiredState()).isEqualTo(DEFAULT_DESIRED_STATE);
    }

    @Test
    @Transactional
    public void createThingWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = thingRepository.findAll().size();

        // Create the Thing with an existing ID
        thing.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restThingMockMvc.perform(post("/api/things")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(thing)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<Thing> thingList = thingRepository.findAll();
        assertThat(thingList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllThings() throws Exception {
        // Initialize the database
        thingRepository.saveAndFlush(thing);

        // Get all the thingList
        restThingMockMvc.perform(get("/api/things?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(thing.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].logoId").value(hasItem(DEFAULT_LOGO_ID.toString())))
            .andExpect(jsonPath("$.[*].currentState").value(hasItem(DEFAULT_CURRENT_STATE.booleanValue())))
            .andExpect(jsonPath("$.[*].desiredState").value(hasItem(DEFAULT_DESIRED_STATE.booleanValue())));
    }

    @Test
    @Transactional
    public void getThing() throws Exception {
        // Initialize the database
        thingRepository.saveAndFlush(thing);

        // Get the thing
        restThingMockMvc.perform(get("/api/things/{id}", thing.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(thing.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.logoId").value(DEFAULT_LOGO_ID.toString()))
            .andExpect(jsonPath("$.currentState").value(DEFAULT_CURRENT_STATE.booleanValue()))
            .andExpect(jsonPath("$.desiredState").value(DEFAULT_DESIRED_STATE.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingThing() throws Exception {
        // Get the thing
        restThingMockMvc.perform(get("/api/things/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateThing() throws Exception {
        // Initialize the database
        thingService.save(thing);

        int databaseSizeBeforeUpdate = thingRepository.findAll().size();

        // Update the thing
        Thing updatedThing = thingRepository.findOne(thing.getId());
        updatedThing
            .name(UPDATED_NAME)
            .logoId(UPDATED_LOGO_ID)
            .currentState(UPDATED_CURRENT_STATE)
            .desiredState(UPDATED_DESIRED_STATE);

        restThingMockMvc.perform(put("/api/things")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedThing)))
            .andExpect(status().isOk());

        // Validate the Thing in the database
        List<Thing> thingList = thingRepository.findAll();
        assertThat(thingList).hasSize(databaseSizeBeforeUpdate);
        Thing testThing = thingList.get(thingList.size() - 1);
        assertThat(testThing.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testThing.getLogoId()).isEqualTo(UPDATED_LOGO_ID);
        assertThat(testThing.isCurrentState()).isEqualTo(UPDATED_CURRENT_STATE);
        assertThat(testThing.isDesiredState()).isEqualTo(UPDATED_DESIRED_STATE);
    }

    @Test
    @Transactional
    public void updateNonExistingThing() throws Exception {
        int databaseSizeBeforeUpdate = thingRepository.findAll().size();

        // Create the Thing

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restThingMockMvc.perform(put("/api/things")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(thing)))
            .andExpect(status().isCreated());

        // Validate the Thing in the database
        List<Thing> thingList = thingRepository.findAll();
        assertThat(thingList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteThing() throws Exception {
        // Initialize the database
        thingService.save(thing);

        int databaseSizeBeforeDelete = thingRepository.findAll().size();

        // Get the thing
        restThingMockMvc.perform(delete("/api/things/{id}", thing.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Thing> thingList = thingRepository.findAll();
        assertThat(thingList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Thing.class);
    }
}
