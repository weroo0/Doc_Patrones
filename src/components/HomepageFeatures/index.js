import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: '?Que son los patrones?',
    Svg: require('@site/static/img/question1-svgrepo-com.svg').default,
    description: (
      <>
        Los patrones de diseño de comportamiento son soluciones estándar a problemas recurrentes relacionados con la comunicación, la asignación de responsabilidades y el comportamiento de los objetos en un sistema. Se enfocan en cómo los objetos interactúan entre sí y cómo pueden colaborar para realizar tareas específicas de manera eficiente. Estos patrones proporcionan un marco que facilita la creación de software flexible y extensible.
      </>
    ),
  },
  {
    title: 'Cuales son sus usos?',
    Svg: require('@site/static/img/help-browser-svgrepo-com.svg').default,
    description: (
      <>
        Se utilizan para simplificar el diseño de sistemas complejos, optimizar la interacción entre objetos y mejorar la reutilización del código. Ayudan a resolver problemas como el manejo de dependencias entre objetos, la coordinación de tareas entre varios componentes, y la gestión de eventos o cambios de estado, sin necesidad de reescribir soluciones cada vez que surge un problema similar.
      </>
    ),
  },
  {
    title: 'Como influyen?',
    Svg: require('@site/static/img/correct-checklist-list-document-extension-format-folder-svgrepo-com.svg').default,
    description: (
      <>
        Influyen al ofrecer soluciones bien definidas y probadas, lo que permite que los desarrolladores eviten reinventar la rueda. Esto reduce la complejidad del código, mejora su mantenimiento y aumenta la flexibilidad del sistema, permitiendo que los componentes se comuniquen de manera más eficiente y que el software se adapte más fácilmente a futuros cambios.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
