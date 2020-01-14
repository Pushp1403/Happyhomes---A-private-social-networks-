package com.pushpendra.happyhomes.data.SocietyPosts;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.pushpendra.happyhomes.model.SocietyPosts.PostSociety;

@Repository
public class SocietyPostDaoImpl implements SocietyPostDao {
	
	private EntityManager entityManager;
	
	private Session getSession(){
		return entityManager.unwrap(Session.class);
	}
	
	@PersistenceContext
	public void setEntityManager(EntityManager em){
		this.entityManager = em.getEntityManagerFactory().createEntityManager();
	}
	

	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public void updateStatus(PostSociety postSociety) {
		Session session = this.getSession();
		session.saveOrUpdate(postSociety);
		session.flush();
	}

}
