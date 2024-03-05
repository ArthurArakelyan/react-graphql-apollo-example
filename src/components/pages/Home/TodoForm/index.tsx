import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { useMutation } from '@apollo/client';

import { Button, Input } from '../../../../components';

import { createTodoMutation, getTodosQuery } from '../../../../apollo';

import styles from './TodoForm.module.scss';

const TodoForm = () => {
  const [title, setTitle] = useState<string>('');

  const [createTodo, { loading: createTodoLoading, error: createTodoError }] = useMutation(createTodoMutation, {
    refetchQueries: [
      getTodosQuery,
      'GetTodos',
    ],
    variables: {
      title,
      done: false,
    },
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!title.trim().length) {
      return;
    }

    createTodo();

    setTitle('');
  };

  const handleTitleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setTitle(e.target.value);
  };

  return (
    <div className={styles['todo-form-wrapper']}>
      <form onSubmit={handleSubmit} className={styles['todo-form']}>
        <Input
          type="text"
          placeholder="Todo Name..."
          value={title}
          onChange={handleTitleChange}
          className={styles['todo-form__input']}
        />

        <Button
          type="submit"
          loading={createTodoLoading}
        >
          Add Todo
        </Button>
      </form>

      {createTodoError && (
        <p className={styles['todo-form__error']}>Something went wrong! Please try again!</p>
      )}
    </div>
  );
};

export default TodoForm;
