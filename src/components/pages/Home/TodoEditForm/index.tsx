import { ChangeEventHandler, FC, FormEventHandler, useState } from 'react';
import { useMutation } from '@apollo/client';

import { Input } from '../../../../components';

import { useOutsideClick, useEscClick } from '../../../../hooks';

import { getTodosQuery, updateTodoTitleMutation } from '../../../../apollo';

import { ITodoEditFormProps } from './types.ts';

import styles from './TodoEditForm.module.scss';

const TodoEditForm: FC<ITodoEditFormProps> = ({ todo, onCancel }) => {
  const [title, setTitle] = useState<string>(todo.title);

  const [updateTodoTitle, { loading: updateTodoTitleLoading }] = useMutation(updateTodoTitleMutation, {
    refetchQueries: [
      getTodosQuery,
      'GetTodos',
    ],
    variables: {
      id: todo.id,
      title,
    },
  });

  const formRef = useOutsideClick<HTMLFormElement>(onCancel);

  useEscClick(onCancel);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    try {
      e.preventDefault();

      if (!title.trim().length || updateTodoTitleLoading) {
        return;
      }

      await updateTodoTitle();
    } catch (e) {
      console.error(e);
    } finally {
      handleCancel();
    }
  };

  const handleTitleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setTitle(e.target.value);
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <form
      ref={formRef}
      className={styles['todo-edit-form']}
      onSubmit={handleSubmit}
    >
      <Input
        value={title}
        onChange={handleTitleChange}
        autoFocus
        className={styles['todo-edit-form__input']}
      />

      <div className={styles['todo-edit-form__actions']}>
        <button
          type="button"
          aria-label="Cancel Editing Todo"
          disabled={updateTodoTitleLoading}
          className={`${styles['todo-edit-form__action']} ${styles['todo-edit-form__action--cancel']}`}
          onClick={handleCancel}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" strokeWidth="1.3">
            <path d="M17.769 16l9.016-9.016c0.226-0.226 0.366-0.539 0.366-0.884 0-0.691-0.56-1.251-1.251-1.251-0.346 0-0.658 0.14-0.885 0.367v0l-9.015 9.015-9.016-9.015c-0.226-0.226-0.539-0.366-0.884-0.366-0.69 0-1.25 0.56-1.25 1.25 0 0.345 0.14 0.658 0.366 0.884v0l9.015 9.016-9.015 9.015c-0.227 0.226-0.367 0.539-0.367 0.885 0 0.691 0.56 1.251 1.251 1.251 0.345 0 0.658-0.14 0.884-0.366v0l9.016-9.016 9.015 9.016c0.227 0.228 0.541 0.369 0.888 0.369 0.691 0 1.251-0.56 1.251-1.251 0-0.347-0.141-0.661-0.369-0.887l-0-0z"/>
          </svg>
        </button>

        <button
          type="submit"
          aria-label="Confirm Editing Todo"
          disabled={false}
          className={`${styles['todo-edit-form__action']} ${styles['todo-edit-form__action--submit']}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 492 492">
            <path d="M484.128,104.478l-16.116-16.116c-5.064-5.068-11.816-7.856-19.024-7.856c-7.208,0-13.964,2.788-19.028,7.856 L203.508,314.81L62.024,173.322c-5.064-5.06-11.82-7.852-19.028-7.852c-7.204,0-13.956,2.792-19.024,7.852l-16.12,16.112 C2.784,194.51,0,201.27,0,208.47c0,7.204,2.784,13.96,7.852,19.028l159.744,159.736c0.212,0.3,0.436,0.58,0.696,0.836 l16.12,15.852c5.064,5.048,11.82,7.572,19.084,7.572h0.084c7.212,0,13.968-2.524,19.024-7.572l16.124-15.992 c0.26-0.256,0.48-0.468,0.612-0.684l244.784-244.76C494.624,132.01,494.624,114.966,484.128,104.478z"/>
          </svg>
        </button>
      </div>
    </form>
  );
};

export default TodoEditForm;
