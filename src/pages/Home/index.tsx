import TodoForm from '../../components/pages/Home/TodoForm';
import TodoList from '../../components/pages/Home/TodoList';

import styles from './Home.module.scss';

const Home = () => {
  return (
    <div className={styles['home']}>
      <div className={styles['home__content']}>
        <h1 className={styles['home__title']}>
          React Apollo Todo List
        </h1>

        <TodoForm />

        <TodoList />
      </div>
    </div>
  );
};

export default Home;
