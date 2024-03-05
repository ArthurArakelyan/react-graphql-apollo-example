import { FC, useState } from 'react';
import { useMutation } from '@apollo/client';

import TodoEditForm from '../TodoEditForm';
import { Checkbox } from '../../../../components';

import { getTodosQuery, removeTodoMutation, updateTodoDoneMutation } from '../../../../apollo';

import { ITodoProps } from './types.ts';

import styles from './Todo.module.scss';

const Todo: FC<ITodoProps> = ({ todo }) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const [updateTodoDone, { loading: updateTodoDoneLoading }] = useMutation(updateTodoDoneMutation, {
    refetchQueries: [
      getTodosQuery,
      'GetTodos',
    ],
    variables: {
      id: todo.id,
      done: !todo.done,
    },
  });

  const [removeTodo, { loading: removeTodoLoading }] = useMutation(removeTodoMutation, {
    refetchQueries: [
      getTodosQuery,
      'GetTodos',
    ],
    variables: {
      id: todo.id,
    },
  });

  const handleToggleDone = () => {
    if (updateTodoDoneLoading) {
      return;
    }

    updateTodoDone();
  };

  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleEditCancel = () => {
    setIsEdit(false);
  };

  const handleDelete = () => {
    removeTodo();
  };

  return (
    <div className={`${styles['todo']} ${removeTodoLoading ? styles['todo--loading'] : ''} ${todo.done ? styles['todo--done'] : ''}`}>
      {!isEdit ? (
        <>
          <Checkbox
            value={todo.done}
            onChange={handleToggleDone}
            disabled={updateTodoDoneLoading}
            className={styles['todo__checkbox']}
          />

          <span onClick={handleToggleDone} className={styles['todo__title']}>
            {todo.title}
          </span>

          <div className={styles['todo__actions']}>
            <button
              aria-label="Edit Todo"
              className={`${styles['todo__action']} ${styles['todo__action--edit']}`}
              onClick={handleEdit}
            >
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path fillRule="evenodd" clipRule="evenodd" d="M20.8477 1.87868C19.6761 0.707109 17.7766 0.707105 16.605 1.87868L2.44744 16.0363C2.02864 16.4551 1.74317 16.9885 1.62702 17.5692L1.03995 20.5046C0.760062 21.904 1.9939 23.1379 3.39334 22.858L6.32868 22.2709C6.90945 22.1548 7.44285 21.8693 7.86165 21.4505L22.0192 7.29289C23.1908 6.12132 23.1908 4.22183 22.0192 3.05025L20.8477 1.87868ZM18.0192 3.29289C18.4098 2.90237 19.0429 2.90237 19.4335 3.29289L20.605 4.46447C20.9956 4.85499 20.9956 5.48815 20.605 5.87868L17.9334 8.55027L15.3477 5.96448L18.0192 3.29289ZM13.9334 7.3787L3.86165 17.4505C3.72205 17.5901 3.6269 17.7679 3.58818 17.9615L3.00111 20.8968L5.93645 20.3097C6.13004 20.271 6.30784 20.1759 6.44744 20.0363L16.5192 9.96448L13.9334 7.3787Z" />
              </svg>
            </button>

            <button
              aria-label="Delete Todo"
              disabled={removeTodoLoading}
              className={`${styles['todo__action']} ${styles['todo__action--delete']}`}
              onClick={handleDelete}
            >
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </>
      ) : (
        <TodoEditForm
          todo={todo}
          onCancel={handleEditCancel}
        />
      )}
    </div>
  );
};

export default Todo;
