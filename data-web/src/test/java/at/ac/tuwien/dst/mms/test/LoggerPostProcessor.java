package at.ac.tuwien.dst.mms.test;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.config.BeanPostProcessor;
import org.springframework.stereotype.Component;
import org.springframework.util.ReflectionUtils;

/**
 * Dependency injection for a flexible logger. To inject a logger, simply use @Autowired(required=false) annotation.
 * Defining class name for the logger is not required, as this info is injected automatically.
 */
@Component
public class LoggerPostProcessor implements BeanPostProcessor{
	@Override
	public Object postProcessBeforeInitialization(Object bean, String beanName) throws BeansException {

		Logger logger = LoggerFactory.getLogger(bean.getClass());
		ReflectionUtils.doWithFields(bean.getClass(), field -> {
			ReflectionUtils.makeAccessible(field);
			ReflectionUtils.setField(field, bean, logger);

		}, field -> field.isAnnotationPresent(Autowired.class) && Logger.class.equals(field.getType()));

		return bean;
	}

	@Override
	public Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException {
		return bean;
	}
}
