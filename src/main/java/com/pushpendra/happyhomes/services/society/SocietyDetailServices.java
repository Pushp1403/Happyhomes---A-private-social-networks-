package com.pushpendra.happyhomes.services.society;

import java.util.ArrayList;

import org.springframework.stereotype.Service;

import com.pushpendra.happyhomes.helper.security.Signup;
import com.pushpendra.happyhomes.helper.society.LocationBO;
import com.pushpendra.happyhomes.helper.society.SocietyBO;
import com.pushpendra.happyhomes.helper.society.SocietyPostsBO;

@Service
public interface SocietyDetailServices {

	public ArrayList<LocationBO> getAllStates();

	public ArrayList<LocationBO> getAllCities(int stateId);

	public SocietyBO registerNewSociety(SocietyBO societyBo);

	public ArrayList<Signup> getSocietyDetailByName(String societyName);

	public ArrayList<SocietyPostsBO> getSocietyPosts(String societyId);

}
