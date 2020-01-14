package com.pushpendra.happyhomes.model.Vendor;

import java.io.Serializable;

import javax.persistence.*;

import com.pushpendra.happyhomes.model.society.Society;

import java.util.Date;
import java.util.List;


/**
 * The persistent class for the vendors database table.
 * 
 */
@Entity
@Table(name="vendors")
@NamedQuery(name="Vendor.findAll", query="SELECT v FROM Vendor v")
public class Vendor implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="VENDOR_ID", unique=true, nullable=false)
	private int vendorId;

	@Column(name="ACTIVE_SWITCH")
	private int activeSwitch;

	@Column(name="CREATED_BY", length=100)
	private String createdBy;

	@Temporal(TemporalType.DATE)
	@Column(name="CREATED_DATE")
	private Date createdDate;

	@Column(name="HOME_DELIEVERY_AVAILABLE")
	private int homeDelieveryAvailable;

	@Column(name="UPDATED_BY", length=100)
	private String updatedBy;

	@Temporal(TemporalType.DATE)
	@Column(name="UPDATED_DATE")
	private Date updatedDate;

	@Column(name="VENDOR_ADDRESS", length=100)
	private String vendorAddress;

	@Column(name="VENDOR_MAP_LOCATION", length=100)
	private String vendorMapLocation;

	@Column(name="VENDOR_NAME", length=100)
	private String vendorName;

	@Column(name="VENDOR_PRIMARY_CONTACT_NO")
	private int vendorPrimaryContactNo;

	@Column(name="VENDOR_PRIMARY_CONTACT_PERSON", length=100)
	private String vendorPrimaryContactPerson;

	@Column(name="VENDOR_RATING")
	private int vendorRating;

	@Column(name="VENDOR_SECONDARY_CONTACT_NO")
	private int vendorSecondaryContactNo;

	@Column(name="VENDOR_SECONDARY_CONTACT_PERSON", length=100)
	private String vendorSecondaryContactPerson;

	//bi-directional many-to-one association to VendorType
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="VENDOR_TYPE_ID")
	private VendorType vendorType;

	//bi-directional many-to-many association to Society
	@ManyToMany(mappedBy="vendors")
	private List<Society> societies;

	//bi-directional many-to-one association to VendorRequest
	@OneToMany(mappedBy="vendor")
	private List<VendorRequest> vendorRequests;

	public Vendor() {
	}

	public int getVendorId() {
		return this.vendorId;
	}

	public void setVendorId(int vendorId) {
		this.vendorId = vendorId;
	}

	public int getActiveSwitch() {
		return this.activeSwitch;
	}

	public void setActiveSwitch(int activeSwitch) {
		this.activeSwitch = activeSwitch;
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

	public int getHomeDelieveryAvailable() {
		return this.homeDelieveryAvailable;
	}

	public void setHomeDelieveryAvailable(int homeDelieveryAvailable) {
		this.homeDelieveryAvailable = homeDelieveryAvailable;
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

	public String getVendorAddress() {
		return this.vendorAddress;
	}

	public void setVendorAddress(String vendorAddress) {
		this.vendorAddress = vendorAddress;
	}

	public String getVendorMapLocation() {
		return this.vendorMapLocation;
	}

	public void setVendorMapLocation(String vendorMapLocation) {
		this.vendorMapLocation = vendorMapLocation;
	}

	public String getVendorName() {
		return this.vendorName;
	}

	public void setVendorName(String vendorName) {
		this.vendorName = vendorName;
	}

	public int getVendorPrimaryContactNo() {
		return this.vendorPrimaryContactNo;
	}

	public void setVendorPrimaryContactNo(int vendorPrimaryContactNo) {
		this.vendorPrimaryContactNo = vendorPrimaryContactNo;
	}

	public String getVendorPrimaryContactPerson() {
		return this.vendorPrimaryContactPerson;
	}

	public void setVendorPrimaryContactPerson(String vendorPrimaryContactPerson) {
		this.vendorPrimaryContactPerson = vendorPrimaryContactPerson;
	}

	public int getVendorRating() {
		return this.vendorRating;
	}

	public void setVendorRating(int vendorRating) {
		this.vendorRating = vendorRating;
	}

	public int getVendorSecondaryContactNo() {
		return this.vendorSecondaryContactNo;
	}

	public void setVendorSecondaryContactNo(int vendorSecondaryContactNo) {
		this.vendorSecondaryContactNo = vendorSecondaryContactNo;
	}

	public String getVendorSecondaryContactPerson() {
		return this.vendorSecondaryContactPerson;
	}

	public void setVendorSecondaryContactPerson(String vendorSecondaryContactPerson) {
		this.vendorSecondaryContactPerson = vendorSecondaryContactPerson;
	}

	public VendorType getVendorType() {
		return this.vendorType;
	}

	public void setVendorType(VendorType vendorType) {
		this.vendorType = vendorType;
	}

	public List<Society> getSocieties() {
		return this.societies;
	}

	public void setSocieties(List<Society> societies) {
		this.societies = societies;
	}

	public List<VendorRequest> getVendorRequests() {
		return this.vendorRequests;
	}

	public void setVendorRequests(List<VendorRequest> vendorRequests) {
		this.vendorRequests = vendorRequests;
	}

	public VendorRequest addVendorRequest(VendorRequest vendorRequest) {
		getVendorRequests().add(vendorRequest);
		vendorRequest.setVendor(this);

		return vendorRequest;
	}

	public VendorRequest removeVendorRequest(VendorRequest vendorRequest) {
		getVendorRequests().remove(vendorRequest);
		vendorRequest.setVendor(null);

		return vendorRequest;
	}

}