package com.colardynit.logopihipsterv2.domain;


import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Thing.
 */
@Entity
@Table(name = "thing")
public class Thing implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "logo_id")
    private String logoId;

    @Column(name = "current_state")
    private Boolean currentState;

    @Column(name = "desired_state")
    private Boolean desiredState;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Thing name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLogoId() {
        return logoId;
    }

    public Thing logoId(String logoId) {
        this.logoId = logoId;
        return this;
    }

    public void setLogoId(String logoId) {
        this.logoId = logoId;
    }

    public Boolean isCurrentState() {
        return currentState;
    }

    public Thing currentState(Boolean currentState) {
        this.currentState = currentState;
        return this;
    }

    public void setCurrentState(Boolean currentState) {
        this.currentState = currentState;
    }

    public Boolean isDesiredState() {
        return desiredState;
    }

    public Thing desiredState(Boolean desiredState) {
        this.desiredState = desiredState;
        return this;
    }

    public void setDesiredState(Boolean desiredState) {
        this.desiredState = desiredState;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Thing thing = (Thing) o;
        if (thing.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, thing.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Thing{" +
            "id=" + id +
            ", name='" + name + "'" +
            ", logoId='" + logoId + "'" +
            ", currentState='" + currentState + "'" +
            ", desiredState='" + desiredState + "'" +
            '}';
    }
}
