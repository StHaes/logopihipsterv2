package com.colardynit.logopihipsterv2.domain;


import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A ThingInState.
 */
@Entity
@Table(name = "thing_in_state")
public class ThingInState implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "state")
    private Boolean state;

    @ManyToOne
    private Thing thing;

    @ManyToOne
    private Mode mode;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean isState() {
        return state;
    }

    public ThingInState state(Boolean state) {
        this.state = state;
        return this;
    }

    public void setState(Boolean state) {
        this.state = state;
    }

    public Thing getThing() {
        return thing;
    }

    public ThingInState thing(Thing thing) {
        this.thing = thing;
        return this;
    }

    public void setThing(Thing thing) {
        this.thing = thing;
    }

    public Mode getMode() {
        return mode;
    }

    public ThingInState mode(Mode mode) {
        this.mode = mode;
        return this;
    }

    public void setMode(Mode mode) {
        this.mode = mode;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        ThingInState thingInState = (ThingInState) o;
        if (thingInState.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, thingInState.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "ThingInState{" +
            "id=" + id +
            ", state='" + state + "'" +
            '}';
    }
}
