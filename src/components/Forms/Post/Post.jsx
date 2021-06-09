import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import Card from '../../dumb/Card';
import formStyles from '../form.module.css';

import { get } from '../../../utils/apiCalls';
import { POSTS_URL } from '../../../constants/api';

/**
* @TODO refactor form into separate generic component
*/

const Post = (props) => {
  const { postId, onEdit, onCreate } = props;

  const [name, setName] = useState('');
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');

  function initializeFormData() {
    get(`${POSTS_URL}/${postId}`)
      .then((res) => {
        const {
          name: _name,
          summary: _summary,
          description: _description,
        } = res.data;

        setName(_name);
        setSummary(_summary);
        setDescription(_description);
      })
      .catch((err) => toast.error(err.message));
  }

  useEffect(() => {
    if (postId) {
      initializeFormData();
    }
  }, []);

  const validateName = (e) => {
    setName(e.target.value);
  };

  const validateSummary = (e) => {
    setSummary(e.target.value);
  };

  const validateDescription = (e) => {
    setDescription(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const postData = {
      name,
      summary,
      description,
    };

    if (postId) {
      return onEdit(postData);
    }

    return onCreate(postData);
  };

  return (
    <Card>
      <form className={formStyles.form} onSubmit={submitHandler}>
        <h3 className={formStyles['form-header']}>Create Post</h3>

        <div className={formStyles['form-element']}>
          <label htmlFor="post-title" className={formStyles['form-element__label']}>Post Title</label>
          <input
            id="post-title"
            required
            onChange={validateName}
            value={name}
            type="text"
            placeholder="Enter Post Title"
            className={formStyles['form-element__input']}
          />
        </div>

        <div className={formStyles['form-element']}>
          <label htmlFor="post-summary" className={formStyles['form-element__label']}>Summary</label>
          <input
            id="post-summary"
            required
            onChange={validateSummary}
            value={summary}
            type="text"
            placeholder="Enter Summary"
            className={formStyles['form-element__input']}
          />
        </div>

        <div className={formStyles['form-element']}>
          <label htmlFor="post-description" className={formStyles['form-element__label']}>Description</label>
          <input
            id="post-description"
            required
            onChange={validateDescription}
            value={description}
            type="text"
            placeholder="Enter Description"
            className={formStyles['form-element__input']}
          />
        </div>

        <div className={formStyles['form-element']}>
          <button type="submit" className={formStyles['form-element__submit-btn']}>
            {postId ? 'Update Post' : 'Create Post'}
          </button>
        </div>

      </form>
    </Card>
  );
};

export default Post;
