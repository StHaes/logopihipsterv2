package com.colardynit.logopihipsterv2.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Mode.
 */
@Entity
@Table(name = "mode")
public class Mode implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "code")
    private String code;

    @Column(name = "label")
    private String label;

    @OneToMany(mappedBy = "mode")
    @JsonIgnore
    private Set<ThingInState> thingInStates = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public Mode code(String code) {
        this.code = code;
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getLabel() {
        return label;
    }

    public Mode label(String label) {
        this.label = label;
        return this;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public Set<ThingInState> getThingInStates() {
        return thingInStates;
    }

    public Mode thingInStates(Set<ThingInState> thingInStates) {
        this.thingInStates = thingInStates;
        return this;
    }

    public Mode addThingInState(ThingInState thingInState) {
        this.thingInStates.add(thingInState);
        thingInState.setMode(this);
        return this;
    }

    public Mode removeThingInState(ThingInState thingInState) {
        this.thingInStates.remove(thingInState);
        thingInState.setMode(null);
        return this;
    }

    public void setThingInStates(Set<ThingInState> thingInStates) {
        this.thingInStates = thingInStates;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Mode mode = (Mode) o;
        if (mode.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, mode.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Mode{" +
            "id=" + id +
            ", code='" + code + "'" +
            ", label='" + label + "'" +
            '}';
    }
}
