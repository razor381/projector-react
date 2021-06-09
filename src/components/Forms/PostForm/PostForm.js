import { useState } from 'react';

import Card from '../../dumb/Card';
import formStyles from '../form.module.css';

/**
* @TODO refactor form into separate generic component
*/

const PostForm = (props) => {
  const [ name, setName ] = useState('');
  const [ summary, setSummary ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ userId, setUserId ] = useState('');

  const validateName = (e) => {
    setName(e.target.value);
  };

  const validateSummary = (e) => {
    setSummary(e.target.value);
  };

  const validateDescription = (e) => {
    setDescription(e.target.value);
  };

  const validateUserId   = (e) => {
    setUserId(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    props.createPost({
      name,
      summary,
      description,
      user_id: userId,
    });
  };

  return (

    /**
     * @TODO refactor form into separate generic component
     */

    <Card>
      <form className={formStyles.form} onSubmit={submitHandler}>
        <h3 className={formStyles['form-header']}>Post Form</h3>

        <div className={formStyles['form-element']}>
          <label className={formStyles['form-element__label']}>title</label>
          <input
            value={name}
            onChange={validateName}
            type="text"
            placeholder="Enter post title"
            className={formStyles['form-element__input']}
          />
        </div>

        <div className={formStyles['form-element']}>
          <label className={formStyles['form-element__label']}>Summary</label>
          <input
            value={summary}
            onChange={validateSummary}
            type="text"
            placeholder="Enter post summary"
            className={formStyles['form-element__input']}
          />
        </div>

        <div className={formStyles['form-element']}>
          <label className={formStyles['form-element__label']}>Description</label>
          <input
            value={description}
            onChange={validateDescription}
            type="text"
            placeholder="Enter post description"
            className={formStyles['form-element__input']}
          />
        </div>

        <div className={formStyles['form-element']}>
          <label className={formStyles['form-element__label']}>User Id</label>
          <input
            value={userId}
            onChange={validateUserId}
            type="text"
            placeholder="Enter user id"
            className={formStyles['form-element__input']}
          />
        </div>

        <div className={formStyles['form-element']}>
          <button className={formStyles['form-element__submit-btn']}>Update</button>
        </div>

      </form>
    </Card>
  );
};

export default PostForm;
