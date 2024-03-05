import { useQuery } from '@apollo/client';

import Todo from '../Todo';
import { Loader, FetchError } from '../../../../components';

import { getTodosQuery, IGetTodosQueryResponse } from '../../../../apollo';

import styles from './TodoList.module.scss';

const TodoList = () => {
  const {
    data: todos,
    loading: getTodosLoading,
    error: getTodosError,
    refetch,
  } = useQuery<IGetTodosQueryResponse>(getTodosQuery);

  return (
    <div className={styles['todo-list']}>
      {getTodosLoading && (
        <Loader />
      )}

      {getTodosError && (
        <FetchError onRetry={refetch} />
      )}

      {todos && todos.allTodos && (
        todos.allTodos.map((todo) => {
          return (
            <Todo
              key={todo.id}
              todo={todo}
            />
          );
        })
      )}
    </div>
  );
};

export default TodoList;
