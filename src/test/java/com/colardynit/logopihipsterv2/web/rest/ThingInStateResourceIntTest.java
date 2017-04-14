package com.colardynit.logopihipsterv2.web.rest;

import com.colardynit.logopihipsterv2.Logopihipsterv2App;

import com.colardynit.logopihipsterv2.domain.ThingInState;
import com.colardynit.logopihipsterv2.repository.ThingInStateRepository;
import com.colardynit.logopihipsterv2.service.ThingInStateService;
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
 * Test class for the ThingInStateResource REST controller.
 *
 * @see ThingInStateResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Logopihipsterv2App.class)
public class ThingInStateResourceIntTest {

    private static final Boolean DEFAULT_STATE = false;
    private static final Boolean UPDATED_STATE = true;

    @Autowired
    private ThingInStateRepository thingInStateRepository;

    @Autowired
    private ThingInStateService thingInStateService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restThingInStateMockMvc;

    private ThingInState thingInState;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        ThingInStateResource thingInStateResource = new ThingInStateResource(thingInStateService);
        this.restThingInStateMockMvc = MockMvcBuilders.standaloneSetup(thingInStateResource)
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
    public static ThingInState createEntity(EntityManager em) {
        ThingInState thingInState = new ThingInState()
            .state(DEFAULT_STATE);
        return thingInState;
    }

    @Before
    public void initTest() {
        thingInState = createEntity(em);
    }

    @Test
    @Transactional
    public void createThingInState() throws Exception {
        int databaseSizeBeforeCreate = thingInStateRepository.findAll().size();

        // Create the ThingInState
        restThingInStateMockMvc.perform(post("/api/thing-in-states")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(thingInState)))
            .andExpect(status().isCreated());

        // Validate the ThingInState in the database
        List<ThingInState> thingInStateList = thingInStateRepository.findAll();
        assertThat(thingInStateList).hasSize(databaseSizeBeforeCreate + 1);
        ThingInState testThingInState = thingInStateList.get(thingInStateList.size() - 1);
        assertThat(testThingInState.isState()).isEqualTo(DEFAULT_STATE);
    }

    @Test
    @Transactional
    public void createThingInStateWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = thingInStateRepository.findAll().size();

        // Create the ThingInState with an existing ID
        thingInState.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restThingInStateMockMvc.perform(post("/api/thing-in-states")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(thingInState)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<ThingInState> thingInStateList = thingInStateRepository.findAll();
        assertThat(thingInStateList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllThingInStates() throws Exception {
        // Initialize the database
        thingInStateRepository.saveAndFlush(thingInState);

        // Get all the thingInStateList
        restThingInStateMockMvc.perform(get("/api/thing-in-states?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(thingInState.getId().intValue())))
            .andExpect(jsonPath("$.[*].state").value(hasItem(DEFAULT_STATE.booleanValue())));
    }

    @Test
    @Transactional
    public void getThingInState() throws Exception {
        // Initialize the database
        thingInStateRepository.saveAndFlush(thingInState);

        // Get the thingInState
        restThingInStateMockMvc.perform(get("/api/thing-in-states/{id}", thingInState.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(thingInState.getId().intValue()))
            .andExpect(jsonPath("$.state").value(DEFAULT_STATE.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingThingInState() throws Exception {
        // Get the thingInState
        restThingInStateMockMvc.perform(get("/api/thing-in-states/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateThingInState() throws Exception {
        // Initialize the database
        thingInStateService.save(thingInState);

        int databaseSizeBeforeUpdate = thingInStateRepository.findAll().size();

        // Update the thingInState
        ThingInState updatedThingInState = thingInStateRepository.findOne(thingInState.getId());
        updatedThingInState
            .state(UPDATED_STATE);

        restThingInStateMockMvc.perform(put("/api/thing-in-states")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedThingInState)))
            .andExpect(status().isOk());

        // Validate the ThingInState in the database
        List<ThingInState> thingInStateList = thingInStateRepository.findAll();
        assertThat(thingInStateList).hasSize(databaseSizeBeforeUpdate);
        ThingInState testThingInState = thingInStateList.get(thingInStateList.size() - 1);
        assertThat(testThingInState.isState()).isEqualTo(UPDATED_STATE);
    }

    @Test
    @Transactional
    public void updateNonExistingThingInState() throws Exception {
        int databaseSizeBeforeUpdate = thingInStateRepository.findAll().size();

        // Create the ThingInState

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restThingInStateMockMvc.perform(put("/api/thing-in-states")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(thingInState)))
            .andExpect(status().isCreated());

        // Validate the ThingInState in the database
        List<ThingInState> thingInStateList = thingInStateRepository.findAll();
        assertThat(thingInStateList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteThingInState() throws Exception {
        // Initialize the database
        thingInStateService.save(thingInState);

        int databaseSizeBeforeDelete = thingInStateRepository.findAll().size();

        // Get the thingInState
        restThingInStateMockMvc.perform(delete("/api/thing-in-states/{id}", thingInState.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ThingInState> thingInStateList = thingInStateRepository.findAll();
        assertThat(thingInStateList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ThingInState.class);
    }
}
