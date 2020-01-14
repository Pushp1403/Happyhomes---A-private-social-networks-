package com.pushpendra.happyhomes.data.society;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.pushpendra.happyhomes.helper.security.UserAuthentication;
import com.pushpendra.happyhomes.model.SocietyPosts.PostSociety;
import com.pushpendra.happyhomes.model.society.City;
import com.pushpendra.happyhomes.model.society.Society;
import com.pushpendra.happyhomes.model.society.State;

@Repository
public class SocietyDetailServicesDaoImpl implements SocietyDetailServicesDao {

	private EntityManager entityManager;

	@PersistenceContext
	public void setEntityManager(EntityManager em) {
		this.entityManager =em.getEntityManagerFactory().createEntityManager();
	}
		
	@Override
	public ArrayList<State> getAllStates() {
		CriteriaBuilder builder = entityManager.getCriteriaBuilder();
		CriteriaQuery<State> states = builder.createQuery(State.class);
		Root<State> stateRoot = states.from(State.class);
		states.where(builder.equal(stateRoot.get("country"), 101));
		ArrayList<State> stateList = (ArrayList<State>) entityManager
				.createQuery(states).getResultList();
		return stateList;
	}

	@Override
	public ArrayList<City> getAllCities(int stateId) {
		CriteriaBuilder builder = entityManager.getCriteriaBuilder();
		CriteriaQuery<City> cities = builder.createQuery(City.class);
		Root<City> cityRoot = cities.from(City.class);
		cities.where(builder.equal(cityRoot.get("state"), stateId));
		ArrayList<City> cityList = (ArrayList<City>) entityManager.createQuery(
				cities).getResultList();
		return cityList;
	}

	@Override
	@Transactional
	public Society registerNewSociety(Society society) {
		Session session = entityManager.unwrap(Session.class);
		try {
			session.saveOrUpdate(society);
			session.flush();
		} catch (Exception e) {
			System.out.println("can not persist");
			e.printStackTrace();
		}
		
		return society;
	}

	@Override
	public ArrayList<Society> getSocietyDetailsByName(String societyName) {
		Session session = entityManager.unwrap(Session.class);
		Criteria criteria = session.createCriteria(Society.class);
		criteria.add(Restrictions.sqlRestriction("society_Name like '%"+societyName+"%'"));
		@SuppressWarnings("unchecked")
		ArrayList<Society> societyDetails = (ArrayList<Society>) criteria.list();
		return societyDetails;
	}

	@Override
	public Society getUserSocietyDetails(UserAuthentication user) {
		
		return null;
	}

	@Override
	public Society getSocietyBySocietyName(String societyName) {
		Session session = entityManager.unwrap(Session.class);
		Criteria criteria = session.createCriteria(Society.class);
		criteria.add(Restrictions.eq("societyName", societyName.trim()));
		@SuppressWarnings("unchecked")
		ArrayList<Society> societyDetails = (ArrayList<Society>) criteria.list();
		return societyDetails.get(0);
	}

	@Override
	public List<PostSociety> getSocietyPost(String societyId) {
		Society society= entityManager.find(Society.class, Integer.parseInt(societyId));
		List<PostSociety> postList = society.getPostSocieties();
		return postList;
	}

}
