package com.pushpendra.happyhomes.model.Events;

import java.io.Serializable;

import javax.persistence.*;

import com.pushpendra.happyhomes.model.security.UserAuthenticationDetail;

/**
 * The persistent class for the event_invitees database table.
 * 
 */
@Entity
@Table(name="event_invitees")
@NamedQuery(name="EventInvitee.findAll", query="SELECT e FROM EventInvitee e")
public class EventInvitee implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="event_invitee_id", unique=true, nullable=false)
	private int eventInviteeId;

	@Column(name="REQUIRED_SW")
	private int requiredSw;

	@Column(length=500)
	private String responsibility;

	//bi-directional many-to-one association to EventDetail
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="EVENT_ID")
	private EventDetail eventDetail;

	//uni-directional one-to-one association to UserAuthenticationDetail
	@OneToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="GUEST_ID")
	private UserAuthenticationDetail userAuthenticationDetail;

	public EventInvitee() {
	}

	public int getRequiredSw() {
		return this.requiredSw;
	}

	public void setRequiredSw(int requiredSw) {
		this.requiredSw = requiredSw;
	}

	public String getResponsibility() {
		return this.responsibility;
	}

	public void setResponsibility(String responsibility) {
		this.responsibility = responsibility;
	}

	public EventDetail getEventDetail() {
		return this.eventDetail;
	}

	public void setEventDetail(EventDetail eventDetail) {
		this.eventDetail = eventDetail;
	}

	public UserAuthenticationDetail getUserAuthenticationDetail() {
		return this.userAuthenticationDetail;
	}

	public void setUserAuthenticationDetail(UserAuthenticationDetail userAuthenticationDetail) {
		this.userAuthenticationDetail = userAuthenticationDetail;
	}

}