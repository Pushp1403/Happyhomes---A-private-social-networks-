package com.pushpendra.happyhomes.model.society;

import java.io.Serializable;
import javax.persistence.*;
import java.sql.Timestamp;


/**
 * The persistent class for the visitor database table.
 * 
 */
@Entity
@Table(name="visitor")
@NamedQuery(name="Visitor.findAll", query="SELECT v FROM Visitor v")
public class Visitor implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="VISITOR_ID", unique=true, nullable=false)
	private int visitorId;

	@Column(name="FLAT_TO_VISIT")
	private int flatToVisit;

	@Column(name="RECURSE_ON", length=50)
	private String recurseOn;

	@Column(name="REPEATED_VISITOR_SWITCH")
	private int repeatedVisitorSwitch;

	@Column(name="VISIT_PURPOSE", length=100)
	private String visitPurpose;

	@Column(name="VISIT_TIME", nullable=false)
	private Timestamp visitTime;

	@Column(name="VISITOR_NAME", length=100)
	private String visitorName;

	@Column(name="VISTOR_ADDRESS", length=100)
	private String vistorAddress;

	public Visitor() {
	}

	public int getVisitorId() {
		return this.visitorId;
	}

	public void setVisitorId(int visitorId) {
		this.visitorId = visitorId;
	}

	public int getFlatToVisit() {
		return this.flatToVisit;
	}

	public void setFlatToVisit(int flatToVisit) {
		this.flatToVisit = flatToVisit;
	}

	public String getRecurseOn() {
		return this.recurseOn;
	}

	public void setRecurseOn(String recurseOn) {
		this.recurseOn = recurseOn;
	}

	public int getRepeatedVisitorSwitch() {
		return this.repeatedVisitorSwitch;
	}

	public void setRepeatedVisitorSwitch(int repeatedVisitorSwitch) {
		this.repeatedVisitorSwitch = repeatedVisitorSwitch;
	}

	public String getVisitPurpose() {
		return this.visitPurpose;
	}

	public void setVisitPurpose(String visitPurpose) {
		this.visitPurpose = visitPurpose;
	}

	public Timestamp getVisitTime() {
		return this.visitTime;
	}

	public void setVisitTime(Timestamp visitTime) {
		this.visitTime = visitTime;
	}

	public String getVisitorName() {
		return this.visitorName;
	}

	public void setVisitorName(String visitorName) {
		this.visitorName = visitorName;
	}

	public String getVistorAddress() {
		return this.vistorAddress;
	}

	public void setVistorAddress(String vistorAddress) {
		this.vistorAddress = vistorAddress;
	}

}