package com.pushpendra.happyhomes.data.society;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.pushpendra.happyhomes.helper.security.UserAuthentication;
import com.pushpendra.happyhomes.model.SocietyPosts.PostSociety;
import com.pushpendra.happyhomes.model.society.City;
import com.pushpendra.happyhomes.model.society.Society;
import com.pushpendra.happyhomes.model.society.State;

@Repository
public interface SocietyDetailServicesDao {

	public ArrayList<State> getAllStates();

	public ArrayList<City> getAllCities(int stateId);
	
	public Society registerNewSociety(Society society);

	public ArrayList<Society> getSocietyDetailsByName(String societyName);

	public Society getUserSocietyDetails(UserAuthentication user);

	public Society getSocietyBySocietyName(String societyName);

	public List<PostSociety> getSocietyPost(String societyId);

}
