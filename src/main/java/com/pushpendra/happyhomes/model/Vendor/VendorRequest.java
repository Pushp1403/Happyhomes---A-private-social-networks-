package com.pushpendra.happyhomes.model.Vendor;

import java.io.Serializable;
import javax.persistence.*;
import java.util.Date;


/**
 * The persistent class for the vendor_request database table.
 * 
 */
@Entity
@Table(name="vendor_request")
@NamedQuery(name="VendorRequest.findAll", query="SELECT v FROM VendorRequest v")
public class VendorRequest implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="VENDOR_REQUEST_ID", unique=true, nullable=false)
	private int vendorRequestId;

	@Column(name="REQUEST_COMPLETED")
	private int requestCompleted;

	@Column(name="REQUEST_DATA", length=1000)
	private String requestData;

	@Column(name="REQUESTED_BY", length=50)
	private String requestedBy;

	@Temporal(TemporalType.DATE)
	@Column(name="REQUESTED_DATE")
	private Date requestedDate;

	@Temporal(TemporalType.DATE)
	@Column(name="UPDATED_DATE")
	private Date updatedDate;

	//bi-directional many-to-one association to Vendor
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="VENDOR_ID")
	private Vendor vendor;

	public VendorRequest() {
	}

	public int getVendorRequestId() {
		return this.vendorRequestId;
	}

	public void setVendorRequestId(int vendorRequestId) {
		this.vendorRequestId = vendorRequestId;
	}

	public int getRequestCompleted() {
		return this.requestCompleted;
	}

	public void setRequestCompleted(int requestCompleted) {
		this.requestCompleted = requestCompleted;
	}

	public String getRequestData() {
		return this.requestData;
	}

	public void setRequestData(String requestData) {
		this.requestData = requestData;
	}

	public String getRequestedBy() {
		return this.requestedBy;
	}

	public void setRequestedBy(String requestedBy) {
		this.requestedBy = requestedBy;
	}

	public Date getRequestedDate() {
		return this.requestedDate;
	}

	public void setRequestedDate(Date requestedDate) {
		this.requestedDate = requestedDate;
	}

	public Date getUpdatedDate() {
		return this.updatedDate;
	}

	public void setUpdatedDate(Date updatedDate) {
		this.updatedDate = updatedDate;
	}

	public Vendor getVendor() {
		return this.vendor;
	}

	public void setVendor(Vendor vendor) {
		this.vendor = vendor;
	}

}