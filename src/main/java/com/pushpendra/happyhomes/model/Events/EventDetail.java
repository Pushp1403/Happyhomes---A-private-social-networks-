package com.pushpendra.happyhomes.model.Events;

import java.io.Serializable;

import javax.persistence.*;

import com.pushpendra.happyhomes.model.security.UserAuthenticationDetail;
import com.pushpendra.happyhomes.model.society.Society;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;


/**
 * The persistent class for the event_details database table.
 * 
 */
@Entity
@Table(name="event_details")
@NamedQuery(name="EventDetail.findAll", query="SELECT e FROM EventDetail e")
public class EventDetail implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="EVENT_ID", unique=true, nullable=false)
	private int eventId;

	@Column(name="CREATED_BY", length=100)
	private String createdBy;

	@Temporal(TemporalType.DATE)
	@Column(name="CREATED_DATE")
	private Date createdDate;

	@Column(name="EDITABLE_BY_GUESTS")
	private int editableByGuests;

	@Column(name="EVENT_DESCRIPTION", length=2000)
	private String eventDescription;

	@Temporal(TemporalType.DATE)
	@Column(name="EVENT_END_DATE")
	private Date eventEndDate;

	@Column(name="EVENT_END_TIME", nullable=false)
	private Timestamp eventEndTime;

	@Temporal(TemporalType.DATE)
	@Column(name="EVENT_START_DATE")
	private Date eventStartDate;

	@Column(name="EVENT_START_TIME", nullable=false)
	private Timestamp eventStartTime;

	@Column(name="EVENT_TITLE", length=100)
	private String eventTitle;

	@Temporal(TemporalType.DATE)
	@Column(name="RECURSE_ON")
	private Date recurseOn;

	@Column(name="RECURSIVE_SW")
	private int recursiveSw;

	@Column(name="UPDATED_BY", length=100)
	private String updatedBy;

	@Temporal(TemporalType.DATE)
	@Column(name="UPDATED_DATE")
	private Date updatedDate;

	//bi-directional many-to-one association to Society
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="SOCIETY_ID")
	private Society society;

	//uni-directional one-to-one association to EventType
	@OneToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="EVENT_TYPE_ID")
	private EventType eventType;

	//bi-directional one-to-one association to UserAuthenticationDetail
	@OneToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="HOST_ID")
	private UserAuthenticationDetail userAuthenticationDetail;

	//bi-directional many-to-one association to EventInvitee
	@OneToMany(mappedBy="eventDetail")
	private List<EventInvitee> eventInvitees;

	public EventDetail() {
	}

	public int getEventId() {
		return this.eventId;
	}

	public void setEventId(int eventId) {
		this.eventId = eventId;
	}

	public String getCreatedBy() {
		return this.createdBy;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	public Date getCreatedDate() {
		return this.createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public int getEditableByGuests() {
		return this.editableByGuests;
	}

	public void setEditableByGuests(int editableByGuests) {
		this.editableByGuests = editableByGuests;
	}

	public String getEventDescription() {
		return this.eventDescription;
	}

	public void setEventDescription(String eventDescription) {
		this.eventDescription = eventDescription;
	}

	public Date getEventEndDate() {
		return this.eventEndDate;
	}

	public void setEventEndDate(Date eventEndDate) {
		this.eventEndDate = eventEndDate;
	}

	public Timestamp getEventEndTime() {
		return this.eventEndTime;
	}

	public void setEventEndTime(Timestamp eventEndTime) {
		this.eventEndTime = eventEndTime;
	}

	public Date getEventStartDate() {
		return this.eventStartDate;
	}

	public void setEventStartDate(Date eventStartDate) {
		this.eventStartDate = eventStartDate;
	}

	public Timestamp getEventStartTime() {
		return this.eventStartTime;
	}

	public void setEventStartTime(Timestamp eventStartTime) {
		this.eventStartTime = eventStartTime;
	}

	public String getEventTitle() {
		return this.eventTitle;
	}

	public void setEventTitle(String eventTitle) {
		this.eventTitle = eventTitle;
	}

	public Date getRecurseOn() {
		return this.recurseOn;
	}

	public void setRecurseOn(Date recurseOn) {
		this.recurseOn = recurseOn;
	}

	public int getRecursiveSw() {
		return this.recursiveSw;
	}

	public void setRecursiveSw(int recursiveSw) {
		this.recursiveSw = recursiveSw;
	}

	public String getUpdatedBy() {
		return this.updatedBy;
	}

	public void setUpdatedBy(String updatedBy) {
		this.updatedBy = updatedBy;
	}

	public Date getUpdatedDate() {
		return this.updatedDate;
	}

	public void setUpdatedDate(Date updatedDate) {
		this.updatedDate = updatedDate;
	}

	public Society getSociety() {
		return this.society;
	}

	public void setSociety(Society society) {
		this.society = society;
	}

	public EventType getEventType() {
		return this.eventType;
	}

	public void setEventType(EventType eventType) {
		this.eventType = eventType;
	}

	public UserAuthenticationDetail getUserAuthenticationDetail() {
		return this.userAuthenticationDetail;
	}

	public void setUserAuthenticationDetail(UserAuthenticationDetail userAuthenticationDetail) {
		this.userAuthenticationDetail = userAuthenticationDetail;
	}

	public List<EventInvitee> getEventInvitees() {
		return this.eventInvitees;
	}

	public void setEventInvitees(List<EventInvitee> eventInvitees) {
		this.eventInvitees = eventInvitees;
	}

	public EventInvitee addEventInvitee(EventInvitee eventInvitee) {
		getEventInvitees().add(eventInvitee);
		eventInvitee.setEventDetail(this);

		return eventInvitee;
	}

	public EventInvitee removeEventInvitee(EventInvitee eventInvitee) {
		getEventInvitees().remove(eventInvitee);
		eventInvitee.setEventDetail(null);

		return eventInvitee;
	}

}