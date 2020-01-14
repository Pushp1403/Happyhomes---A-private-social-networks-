package com.pushpendra.happyhomes.model.Events;

import java.io.Serializable;
import javax.persistence.*;


/**
 * The persistent class for the event_type database table.
 * 
 */
@Entity
@Table(name="event_type")
@NamedQuery(name="EventType.findAll", query="SELECT e FROM EventType e")
public class EventType implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="EVENT_TYPE_ID", unique=true, nullable=false)
	private int eventTypeId;

	@Column(name="EVENT_TYPE", length=100)
	private String eventType;

	@Column(name="EVENT_TYPE_DESCRIPTION", length=1000)
	private String eventTypeDescription;

	public EventType() {
	}

	public int getEventTypeId() {
		return this.eventTypeId;
	}

	public void setEventTypeId(int eventTypeId) {
		this.eventTypeId = eventTypeId;
	}

	public String getEventType() {
		return this.eventType;
	}

	public void setEventType(String eventType) {
		this.eventType = eventType;
	}

	public String getEventTypeDescription() {
		return this.eventTypeDescription;
	}

	public void setEventTypeDescription(String eventTypeDescription) {
		this.eventTypeDescription = eventTypeDescription;
	}

}