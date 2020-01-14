package com.pushpendra.happyhomes.services.society;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pushpendra.happyhomes.data.security.UserDetailServiceDao;
import com.pushpendra.happyhomes.data.society.SocietyDetailServicesDao;
import com.pushpendra.happyhomes.helper.security.Signup;
import com.pushpendra.happyhomes.helper.security.UserAuthentication;
import com.pushpendra.happyhomes.helper.society.Comments;
import com.pushpendra.happyhomes.helper.society.LocationBO;
import com.pushpendra.happyhomes.helper.society.SocietyBO;
import com.pushpendra.happyhomes.helper.society.SocietyHelper;
import com.pushpendra.happyhomes.helper.society.SocietyPostsBO;
import com.pushpendra.happyhomes.helper.user.UserDetailsHelper;
import com.pushpendra.happyhomes.model.SocietyPosts.PostComment;
import com.pushpendra.happyhomes.model.SocietyPosts.PostSociety;
import com.pushpendra.happyhomes.model.society.City;
import com.pushpendra.happyhomes.model.society.Society;
import com.pushpendra.happyhomes.model.society.State;

@Service
public class SocietyDetailServicesImpl implements SocietyDetailServices{
	
	@Autowired
	private SocietyDetailServicesDao societyDetailServicesDao;
	
	@Autowired
	private SocietyHelper societyHelper;
	
	@Autowired
	private UserDetailServiceDao userDetailServices;
	
	@Autowired
	private UserDetailsHelper userDetailsHelper;

	@Override
	public ArrayList<LocationBO> getAllStates() {
		ArrayList<LocationBO> locationList = new ArrayList<LocationBO>();
		ArrayList<State> stateList = societyDetailServicesDao.getAllStates();
		for(State state : stateList){
			LocationBO locationBo = new LocationBO();
			locationBo.setStateId(state.getId());
			locationBo.setStateName(state.getName());
			locationList.add(locationBo);
		}
		return locationList;
	}

	@Override
	public ArrayList<LocationBO> getAllCities(int stateId) {
		ArrayList<LocationBO> locationList = new ArrayList<LocationBO>();
		ArrayList<City> cityList = societyDetailServicesDao.getAllCities(stateId);
		for(City city : cityList){
			LocationBO locationBo = new LocationBO();
			locationBo.setCityId(city.getId());
			locationBo.setCityName(city.getName());
			locationList.add(locationBo);
		}
		return locationList;
	}

	@Override
	public SocietyBO registerNewSociety(SocietyBO societyBo) {
		Society society = societyHelper.mapSocietyBoTOSociety(societyBo);
		societyDetailServicesDao.registerNewSociety(society);
		if(society.getSocietyId()>0){
			societyBo.setSocietyRegistered(true);
		}
		return societyBo;
	}

	@Override
	public ArrayList<Signup> getSocietyDetailByName(String societyName) {
		ArrayList<Society> societyDetails = societyDetailServicesDao.getSocietyDetailsByName(societyName);
		ArrayList<Signup> societDetailsListToReturn = societyHelper.mapSocietyListToSignupList(societyDetails);
		return societDetailsListToReturn;
	}

	@Override
	public ArrayList<SocietyPostsBO> getSocietyPosts(String societyId) {
		List<PostSociety> postSocietyList = societyDetailServicesDao.getSocietyPost(societyId);
		ArrayList<SocietyPostsBO> finalList = new ArrayList<SocietyPostsBO>();
		UserAuthentication userAuthentication = new UserAuthentication();
		if(null != postSocietyList && postSocietyList.size()>0){
			for(PostSociety postSociety : postSocietyList){
				SocietyPostsBO societyPostsBO = new SocietyPostsBO();
				userAuthentication.setUserName(postSociety.getUserAuthenticationDetail().getUserName());
				societyPostsBO.setPost(societyHelper.getSocietyPostData(
						postSociety, userDetailServices
								.getUserPersonalDetails(userAuthentication)));
				societyPostsBO.setCommentList(societyHelper.getPostCommentData(postSociety.getPostComments()));
				finalList.add(societyPostsBO);
			}
		}
		return finalList;
	}

}
