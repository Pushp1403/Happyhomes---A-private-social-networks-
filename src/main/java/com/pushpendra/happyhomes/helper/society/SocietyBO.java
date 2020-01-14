package com.pushpendra.happyhomes.helper.society;

import java.util.Date;

public class SocietyBO {
	private int societyId;
	private int numOfFloors;
	private int numOfWingsBlock;
	private String societyAddressLine1;
	private String societyAddressLine2;
	private LocationBO societyCity;
	private Date societyDateFormed;
	private String societyLongLat;
	private String societyName;
	private int societyRating;
	private LocationBO societyState;
	private int societyZipCode;
	private int totalMembers;
	private boolean societyRegistered;
	private String wingBlock;
	private int apartmentNumber;
	
	
	
	public int getApartmentNumber() {
		return apartmentNumber;
	}
	public void setApartmentNumber(int apartmentNumber) {
		this.apartmentNumber = apartmentNumber;
	}
	public String getWingBlock() {
		return wingBlock;
	}
	public void setWingBlock(String wingBlock) {
		this.wingBlock = wingBlock;
	}
	public boolean isSocietyRegistered() {
		return societyRegistered;
	}
	public void setSocietyRegistered(boolean societyRegistered) {
		this.societyRegistered = societyRegistered;
	}
	public int getSocietyId() {
		return societyId;
	}
	public void setSocietyId(int societyId) {
		this.societyId = societyId;
	}
	public int getNumOfFloors() {
		return numOfFloors;
	}
	public void setNumOfFloors(int numOfFloors) {
		this.numOfFloors = numOfFloors;
	}
	public int getNumOfWingsBlock() {
		return numOfWingsBlock;
	}
	public void setNumOfWingsBlock(int numOfWingsBlock) {
		this.numOfWingsBlock = numOfWingsBlock;
	}
	public String getSocietyAddressLine1() {
		return societyAddressLine1;
	}
	public void setSocietyAddressLine1(String societyAddressLine1) {
		this.societyAddressLine1 = societyAddressLine1;
	}
	public String getSocietyAddressLine2() {
		return societyAddressLine2;
	}
	public void setSocietyAddressLine2(String societyAddressLine2) {
		this.societyAddressLine2 = societyAddressLine2;
	}
	public LocationBO getSocietyCity() {
		return societyCity;
	}
	public void setSocietyCity(LocationBO societyCity) {
		this.societyCity = societyCity;
	}
	public Date getSocietyDateFormed() {
		return societyDateFormed;
	}
	public void setSocietyDateFormed(Date societyDateFormed) {
		this.societyDateFormed = societyDateFormed;
	}
	public String getSocietyLongLat() {
		return societyLongLat;
	}
	public void setSocietyLongLat(String societyLongLat) {
		this.societyLongLat = societyLongLat;
	}
	public String getSocietyName() {
		return societyName;
	}
	public void setSocietyName(String societyName) {
		this.societyName = societyName;
	}
	public int getSocietyRating() {
		return societyRating;
	}
	public void setSocietyRating(int societyRating) {
		this.societyRating = societyRating;
	}
	public LocationBO getSocietyState() {
		return societyState;
	}
	public void setSocietyState(LocationBO societyState) {
		this.societyState = societyState;
	}
	public int getSocietyZipCode() {
		return societyZipCode;
	}
	public void setSocietyZipCode(int societyZipCode) {
		this.societyZipCode = societyZipCode;
	}
	public int getTotalMembers() {
		return totalMembers;
	}
	public void setTotalMembers(int totalMembers) {
		this.totalMembers = totalMembers;
	}
	
	
}
