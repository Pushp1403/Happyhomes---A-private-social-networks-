package com.pushpendra.happyhomes.controller.society;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.pushpendra.happyhomes.helper.security.Signup;
import com.pushpendra.happyhomes.helper.society.LocationBO;
import com.pushpendra.happyhomes.helper.society.SocietyBO;
import com.pushpendra.happyhomes.helper.society.SocietyPostsBO;
import com.pushpendra.happyhomes.services.society.SocietyDetailServices;

@Controller
public class SocietyDetailsController {
	
	@Autowired
	private SocietyDetailServices societyDetailServices;
	
	@RequestMapping(value ="/getBySocietyName",method=RequestMethod.POST)
	@ResponseBody
	public ArrayList<Signup> getSocietyDetailsByName(@RequestBody Signup signup){
		ArrayList<Signup> societyNameList = societyDetailServices.getSocietyDetailByName(signup.getSociety().getSocietyName());
		return societyNameList;
		
	}
	
	@RequestMapping(value = "/getAllStates")
	@ResponseBody
	public ArrayList<LocationBO> getAllStates(){
		ArrayList<LocationBO> stateList = societyDetailServices.getAllStates();
		return stateList;
		
	}
	
	@RequestMapping(value = "/getAllCities")
	@ResponseBody
	public ArrayList<LocationBO> getAllCities(@RequestBody LocationBO locationBo){
		ArrayList<LocationBO> stateList = societyDetailServices.getAllCities(locationBo.getStateId());
		return stateList;
		
	}
	
	@RequestMapping(value = "/registerNewSociety")
	@ResponseBody
	public SocietyBO registerNewSociety(@RequestBody SocietyBO societyBo){
		SocietyBO returnBo = societyDetailServices.registerNewSociety(societyBo);
		if(null != returnBo){
			returnBo.setSocietyRegistered(true);
		}
		return returnBo;
	}
	
	@RequestMapping(value = "/getSocietyPosts")
	@ResponseBody
	public List<SocietyPostsBO> getSocietyPosts(@RequestBody SocietyBO society){
		List<SocietyPostsBO> societyPostList = societyDetailServices.getSocietyPosts(Integer.toString(society.getSocietyId()));
		return societyPostList;
	}
}
