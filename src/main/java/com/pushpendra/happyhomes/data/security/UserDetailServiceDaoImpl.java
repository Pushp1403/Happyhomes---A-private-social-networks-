package com.pushpendra.happyhomes.data.security;

import java.util.ArrayList;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.pushpendra.happyhomes.helper.security.UserAuthentication;
import com.pushpendra.happyhomes.model.security.UserAuthenticationDetail;
import com.pushpendra.happyhomes.model.society.Society;
import com.pushpendra.happyhomes.model.user.UserPersonalDetail;

@Repository
public class UserDetailServiceDaoImpl implements UserDetailServiceDao {

	private EntityManager entityManager;
	
	@PersistenceContext
	public void setEntityManager(EntityManager em){
		this.entityManager = em.getEntityManagerFactory().createEntityManager();
	}
	
	private Session getSession(){
		return entityManager.unwrap(Session.class);
	}
	
	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public UserAuthenticationDetail findUserByUserName(String userName) {
		UserAuthenticationDetail userDetails = entityManager.find(UserAuthenticationDetail.class, userName);
		return userDetails;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public UserAuthenticationDetail saveUserAuthenticationDetails(
			UserAuthenticationDetail userAuthenticationDetail) {
		Session session = getSession();
		session.save(userAuthenticationDetail);
		session.flush();
		session.refresh(userAuthenticationDetail);
		return userAuthenticationDetail;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public UserPersonalDetail saveUserPersonalDetails(UserPersonalDetail userPersonalDetail) {
		Session session = getSession();
		session.save(userPersonalDetail);
		session.flush();
		session.refresh(userPersonalDetail);
		return userPersonalDetail;
	}

	@SuppressWarnings("unchecked")
	@Override
	public UserPersonalDetail getUserPersonalDetails(UserAuthentication user) {
		Session session = entityManager.unwrap(Session.class);
		Criteria criteria = session.createCriteria(UserPersonalDetail.class);
		criteria.add(Restrictions.eq("userName", user.getUserName()));
		ArrayList<UserPersonalDetail> userPersonalDetailsList = (ArrayList<UserPersonalDetail>) criteria.list();
		return userPersonalDetailsList.get(0);
	}

}
