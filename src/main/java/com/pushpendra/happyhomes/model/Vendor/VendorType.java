package com.pushpendra.happyhomes.model.Vendor;

import java.io.Serializable;
import javax.persistence.*;
import java.util.Date;
import java.util.List;


/**
 * The persistent class for the vendor_type database table.
 * 
 */
@Entity
@Table(name="vendor_type")
@NamedQuery(name="VendorType.findAll", query="SELECT v FROM VendorType v")
public class VendorType implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="VENDOR_TYPEID", unique=true, nullable=false)
	private int vendorTypeid;

	@Column(name="ACTIVE_SW")
	private int activeSw;

	@Column(name="CREATED_BY", length=100)
	private String createdBy;

	@Temporal(TemporalType.DATE)
	@Column(name="CREATED_DATE")
	private Date createdDate;

	@Column(name="UPDATED_BY", length=100)
	private String updatedBy;

	@Temporal(TemporalType.DATE)
	@Column(name="UPDATED_DATE")
	private Date updatedDate;

	@Column(name="VENDOR_TYPE", length=50)
	private String vendorType;

	@Column(name="VENDOR_TYPE_DESCRIPTION", length=500)
	private String vendorTypeDescription;

	//bi-directional many-to-one association to Vendor
	@OneToMany(mappedBy="vendorType")
	private List<Vendor> vendors;

	public VendorType() {
	}

	public int getVendorTypeid() {
		return this.vendorTypeid;
	}

	public void setVendorTypeid(int vendorTypeid) {
		this.vendorTypeid = vendorTypeid;
	}

	public int getActiveSw() {
		return this.activeSw;
	}

	public void setActiveSw(int activeSw) {
		this.activeSw = activeSw;
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

	public String getVendorType() {
		return this.vendorType;
	}

	public void setVendorType(String vendorType) {
		this.vendorType = vendorType;
	}

	public String getVendorTypeDescription() {
		return this.vendorTypeDescription;
	}

	public void setVendorTypeDescription(String vendorTypeDescription) {
		this.vendorTypeDescription = vendorTypeDescription;
	}

	public List<Vendor> getVendors() {
		return this.vendors;
	}

	public void setVendors(List<Vendor> vendors) {
		this.vendors = vendors;
	}

	public Vendor addVendor(Vendor vendor) {
		getVendors().add(vendor);
		vendor.setVendorType(this);

		return vendor;
	}

	public Vendor removeVendor(Vendor vendor) {
		getVendors().remove(vendor);
		vendor.setVendorType(null);

		return vendor;
	}

}